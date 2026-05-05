<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PredictionController extends Controller
{
    public function predict(Request $request)
    {
        $request->validate([
            'mines_count' => 'required|integer|min:2|max:7',
            'bet_amount' => 'nullable|numeric|min:0',
        ]);

        $user = $request->user();
        $isVip = $user->isVip() || $user->is_admin;
        $isOneWinLinked = !empty($user->onewin_id);

        if (!$isVip && $user->credits < 1) {
            return response()->json(['error' => 'Crédits insuffisants. Veuillez recharger.'], 402);
        }

        $minesCount = $request->mines_count;
        $betAmount = $request->bet_amount ?? 0;
        $totalCells = 25;
        
        // 1. Générer les emplacements des mines avec un algorithme pondéré
        $mineSpots = $this->generateMinePositions($minesCount, $totalCells, $user, $betAmount);

        // 2. Trouver toutes les cases sûres
        $availableSafeSpots = [];
        for ($i = 0; $i < $totalCells; $i++) {
            if (!in_array($i, $mineSpots)) {
                $availableSafeSpots[] = $i;
            }
        }
        
        // 3. Choisir le nombre d'étoiles en fonction du contexte
        $maxSafeSpots = count($availableSafeSpots);

        if ($isOneWinLinked) {
            // Algorithme avancé pour les utilisateurs 1win
            $targetCount = $this->calculateOptimalStars($minesCount, $betAmount, $user);
        } else {
            $targetCount = rand(2, 3);
        }

        $targetCount = min($targetCount, $maxSafeSpots);
        $targetCount = max(1, $targetCount);
        
        // 4. Sélection intelligente des cases sûres
        if ($isOneWinLinked) {
            $safeSpots = $this->intelligentSelection($availableSafeSpots, $targetCount, $minesCount);
        } else {
            shuffle($availableSafeSpots);
            $safeSpots = array_slice($availableSafeSpots, 0, $targetCount);
        }

        // 5. Calculer le score de confiance
        $confidence = $this->calculateConfidence($minesCount, count($safeSpots), $isOneWinLinked, $betAmount);

        // 6. Analyse des zones (uniquement pour 1win)
        $zoneAnalysis = $isOneWinLinked ? $this->analyzeZones($mineSpots, $safeSpots) : null;

        // Déduire le crédit
        if (!$isVip) {
            $user->decrement('credits');
        }

        // Sauvegarder la prédiction
        $prediction = $user->predictions()->create([
            'mines_count' => $request->mines_count,
            'pattern_result' => $safeSpots,
            'bet_amount' => $betAmount,
            'confidence' => $confidence,
        ]);

        return response()->json([
            'success' => true,
            'pattern' => $safeSpots,
            'mines' => $mineSpots,
            'credits' => $user->credits,
            'is_vip' => $isVip,
            'prediction' => $prediction,
            'confidence' => $confidence,
            'zone_analysis' => $zoneAnalysis,
            'bet_amount' => $betAmount,
            'potential_gain' => $this->calculatePotentialGain($betAmount, $minesCount, count($safeSpots)),
        ]);
    }

    /**
     * Génère les positions des mines avec pondération
     */
    private function generateMinePositions(int $minesCount, int $totalCells, $user, float $betAmount): array
    {
        $mineSpots = [];
        
        // Créer une grille de probabilités pondérées
        $weights = array_fill(0, $totalCells, 1.0);
        
        // Pondération basée sur les zones (centre vs bords)
        $centerCells = [6, 7, 8, 11, 12, 13, 16, 17, 18];
        $cornerCells = [0, 4, 20, 24];
        $edgeCells = [1, 2, 3, 5, 9, 10, 14, 15, 19, 21, 22, 23];
        
        // Les mines ont tendance à être placées différemment selon le nombre
        if ($minesCount <= 3) {
            // Peu de mines = tendance à les disperser
            foreach ($centerCells as $c) $weights[$c] *= 0.8;
            foreach ($cornerCells as $c) $weights[$c] *= 1.3;
        } else {
            // Beaucoup de mines = distribution plus uniforme avec légère préférence pour les bords
            foreach ($edgeCells as $c) $weights[$c] *= 1.1;
        }

        // Historique utilisateur (variation basée sur la seed du user)
        $userSeed = crc32($user->id . date('Y-m-d-H'));
        mt_srand($userSeed);
        
        while (count($mineSpots) < $minesCount) {
            // Sélection pondérée
            $totalWeight = array_sum($weights);
            $rand = mt_rand(0, (int)($totalWeight * 1000)) / 1000;
            $cumulative = 0;
            
            for ($i = 0; $i < $totalCells; $i++) {
                if (in_array($i, $mineSpots)) continue;
                $cumulative += $weights[$i];
                if ($cumulative >= $rand) {
                    $mineSpots[] = $i;
                    $weights[$i] = 0; // Retirer du pool
                    // Réduire la probabilité des cases adjacentes
                    foreach ($this->getAdjacentCells($i) as $adj) {
                        if (!in_array($adj, $mineSpots)) {
                            $weights[$adj] *= 0.7;
                        }
                    }
                    break;
                }
            }
            
            // Fallback si la sélection pondérée échoue
            if (count($mineSpots) < $minesCount && $cumulative < $rand) {
                $remaining = array_diff(range(0, $totalCells - 1), $mineSpots);
                $mineSpots[] = $remaining[array_rand($remaining)];
            }
        }
        
        // Réinitialiser le générateur
        mt_srand();
        
        return $mineSpots;
    }

    /**
     * Calcule le nombre optimal d'étoiles à recommander
     */
    private function calculateOptimalStars(int $minesCount, float $betAmount, $user): int
    {
        // Plus il y a de mines, moins on recommande de clics (plus prudent)
        $safeRatio = (25 - $minesCount) / 25;
        
        // Calcul basé sur le ratio de sécurité
        if ($minesCount <= 2) {
            $base = rand(4, 6); // Beaucoup de cases sûres → recommander plus
        } elseif ($minesCount <= 3) {
            $base = rand(3, 5);
        } elseif ($minesCount <= 5) {
            $base = rand(2, 4);
        } else {
            $base = rand(2, 3); // Très risqué → recommander peu
        }
        
        // Ajustement selon la mise
        if ($betAmount > 0) {
            if ($betAmount >= 5000) {
                // Mise élevée → plus prudent, recommander moins
                $base = max(2, $base - 1);
            } elseif ($betAmount <= 500) {
                // Petite mise → peut se permettre plus de risque
                $base = min(7, $base + 1);
            }
        }

        return $base;
    }

    /**
     * Sélection intelligente des cases sûres avec clustering
     */
    private function intelligentSelection(array $availableSafeSpots, int $targetCount, int $minesCount): array
    {
        // Stratégie: préférer les cases qui forment des patterns cohérents
        $selected = [];
        $candidates = $availableSafeSpots;
        shuffle($candidates);
        
        // Commencer par une case aléatoire
        $first = array_shift($candidates);
        $selected[] = $first;
        
        // Essayer de construire un pattern connecté/logique
        while (count($selected) < $targetCount && !empty($candidates)) {
            $bestCandidate = null;
            $bestScore = -1;
            
            foreach ($candidates as $key => $candidate) {
                $score = 0;
                
                // Score basé sur la proximité avec les cases déjà sélectionnées
                foreach ($selected as $sel) {
                    $dist = $this->cellDistance($candidate, $sel);
                    if ($dist <= 1) $score += 3; // Adjacent: bonus élevé
                    elseif ($dist <= 2) $score += 1; // Proche: petit bonus
                }
                
                // Bonus pour les cases centrales (plus stratégiques)
                $row = intdiv($candidate, 5);
                $col = $candidate % 5;
                if ($row >= 1 && $row <= 3 && $col >= 1 && $col <= 3) {
                    $score += 1;
                }
                
                // Ajouter un peu de randomness pour varier
                $score += mt_rand(0, 2);
                
                if ($score > $bestScore) {
                    $bestScore = $score;
                    $bestCandidate = $key;
                }
            }
            
            if ($bestCandidate !== null) {
                $selected[] = $candidates[$bestCandidate];
                unset($candidates[$bestCandidate]);
            } else {
                break;
            }
        }
        
        return $selected;
    }

    /**
     * Calcule le score de confiance de la prédiction
     */
    private function calculateConfidence(int $minesCount, int $starsCount, bool $isOneWinLinked, float $betAmount): int
    {
        // Base de confiance
        $confidence = 70;
        
        // Bonus pour liaison 1win
        if ($isOneWinLinked) $confidence += 12;
        
        // Ajustement selon le nombre de mines (plus de mines = moins confiant)
        $confidence -= ($minesCount - 2) * 4;
        
        // Ajustement selon le nombre d'étoiles recommandées (moins = plus confiant)
        if ($starsCount <= 2) $confidence += 8;
        elseif ($starsCount <= 3) $confidence += 4;
        elseif ($starsCount >= 6) $confidence -= 6;
        
        // Variation aléatoire légère
        $confidence += rand(-3, 5);
        
        // Bornes
        return max(45, min(96, $confidence));
    }

    /**
     * Analyse les zones de la grille
     */
    private function analyzeZones(array $mineSpots, array $safeSpots): array
    {
        $zones = [
            'top_left' => ['cells' => [0, 1, 5, 6], 'safe' => 0, 'danger' => 0],
            'top_right' => ['cells' => [3, 4, 8, 9], 'safe' => 0, 'danger' => 0],
            'center' => ['cells' => [6, 7, 8, 11, 12, 13, 16, 17, 18], 'safe' => 0, 'danger' => 0],
            'bottom_left' => ['cells' => [15, 16, 20, 21], 'safe' => 0, 'danger' => 0],
            'bottom_right' => ['cells' => [18, 19, 23, 24], 'safe' => 0, 'danger' => 0],
        ];

        foreach ($zones as $name => &$zone) {
            foreach ($zone['cells'] as $cell) {
                if (in_array($cell, $mineSpots)) $zone['danger']++;
                if (in_array($cell, $safeSpots)) $zone['safe']++;
            }
            $zone['risk_level'] = $zone['danger'] > 0 ? 
                ($zone['danger'] >= 2 ? 'high' : 'medium') : 'low';
        }

        return $zones;
    }

    /**
     * Calcule le gain potentiel
     */
    private function calculatePotentialGain(float $betAmount, int $minesCount, int $starsFound): float
    {
        if ($betAmount <= 0) return 0;
        
        // Multiplicateur approximatif du jeu Mines 1win
        $multiplier = 1.0;
        for ($i = 0; $i < $starsFound; $i++) {
            $remaining = 25 - $minesCount - $i;
            $safe = $remaining - $minesCount; // Simplification
            if ($remaining > 0) {
                $multiplier *= (25 - $i) / max(1, (25 - $minesCount - $i));
            }
        }
        
        // Simplification du calcul (multiplicateur progressif)
        $baseMultipliers = [
            2 => [1.09, 1.20, 1.32, 1.46, 1.62, 1.80, 2.0],
            3 => [1.14, 1.30, 1.50, 1.74, 2.02, 2.37, 2.79],
            5 => [1.25, 1.56, 1.97, 2.52, 3.27, 4.32, 5.79],
            7 => [1.39, 1.96, 2.79, 4.07, 6.09, 9.39, 14.95],
        ];
        
        $closestKey = 2;
        foreach (array_keys($baseMultipliers) as $key) {
            if ($key <= $minesCount) $closestKey = $key;
        }
        
        $multIndex = min($starsFound - 1, count($baseMultipliers[$closestKey]) - 1);
        $multIndex = max(0, $multIndex);
        $mult = $baseMultipliers[$closestKey][$multIndex] ?? 1.0;
        
        return round($betAmount * $mult, 0);
    }

    /**
     * Retourne les cellules adjacentes (diagonales incluses)
     */
    private function getAdjacentCells(int $cell): array
    {
        $row = intdiv($cell, 5);
        $col = $cell % 5;
        $adjacent = [];
        
        for ($r = max(0, $row - 1); $r <= min(4, $row + 1); $r++) {
            for ($c = max(0, $col - 1); $c <= min(4, $col + 1); $c++) {
                $idx = $r * 5 + $c;
                if ($idx !== $cell) $adjacent[] = $idx;
            }
        }
        
        return $adjacent;
    }

    /**
     * Distance de Manhattan entre deux cellules
     */
    private function cellDistance(int $a, int $b): int
    {
        $rowA = intdiv($a, 5); $colA = $a % 5;
        $rowB = intdiv($b, 5); $colB = $b % 5;
        return abs($rowA - $rowB) + abs($colA - $colB);
    }
}
