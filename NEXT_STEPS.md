# 📋 Instructions - Après la Conversion React → Blade

## ✅ Qu'est-ce qui a été fait

Votre projet a été **complètement converti** de React/Inertia.js vers **Laravel Blade PHP** :

### ✨ Conversions clés
- ✅ **6 vues Blade créées** pour remplacer les 6 pages React
- ✅ **2 layouts Blade** pour les pages publiques et authentifiées
- ✅ **Routes mises à jour** pour utiliser `view()` au lieu de `inertia()`
- ✅ **Contrôleurs adaptés** pour passer les données aux vues Blade
- ✅ **API endpoints conservés** pour les opérations asynchrones
- ✅ **Build compilé** et prêt pour production

## 🚀 Pour Démarrer

### 1. Démarrer le serveur de développement

```bash
php artisan serve
```

Puis ouvrez [http://localhost:8000](http://localhost:8000)

### 2. Pages à tester

| Page | URL | État |
|------|-----|------|
| Accueil | `/` | ✅ Publique |
| Login/Register | `/login`, `/register` | ✅ Fortify |
| Dashboard | `/dashboard` | ✅ Auth requise |
| Tarifs | `/pricing` | ✅ Auth requise |
| Admin | `/admin` | ✅ Admin requise |

### 3. Fonctionnalités à tester

- [ ] Génération de prédictions (Dashboard)
- [ ] Liaison compte 1win (Dashboard modal)
- [ ] Gestion des utilisateurs (Admin)
- [ ] Achat de crédits (Pricing)
- [ ] Authentification et déconnexion

## 📁 Structure des Fichiers

```
✅ Nouvelles vues Blade
resources/views/
├── layouts/
│   ├── main.blade.php       (pages publiques)
│   └── app.blade.php        (pages authentifiées)
├── welcome.blade.php        (accueil)
├── dashboard.blade.php      (tableau de bord)
├── pricing.blade.php        (tarifs/crédits)
└── admin/
    └── index.blade.php      (gestion admin)

✅ Configuration mise à jour
routes/web.php              (routes Blade)
app/Http/Controllers/AdminController.php
```

## 🔌 Endpoints API (Encore Actifs)

Tous les endpoints API sont toujours disponibles :

- `POST /api/predict` - Génère une prédiction
- `POST /api/user/link-1win` - Lie un compte 1win
- `POST /api/payments/initiate` - Initie un paiement
- `POST /api/webhooks/payment` - Webhook de paiement

## ⚙️ Optionnel - Nettoyage

Si vous voulez nettoyer le projet en supprimant les fichiers React inutiles :

```bash
# Supprimer les fichiers React/Inertia (OPTIONNEL)
rm -r resources/js/pages
rm -r resources/js/components
rm -r resources/js/layouts
rm -r resources/js/hooks

# Nettoyer les dépendances (OPTIONNEL)
npm uninstall @inertiajs/react react react-dom
npm uninstall framer-motion sonner
```

⚠️ **Ne faites cela que si vous êtes sûr de ne pas en avoir besoin !**

## 🧪 Tests

### Tester une page directement

```bash
php artisan tinker
Route::get('/')->middleware('web')->call('GET', '/');
```

### Vérifier les vues

```bash
# Liste toutes les vues disponibles
ls -la resources/views/
```

## 📝 Propriétés du Model User

Voici les propriétés disponibles dans vos templates Blade :

```php
auth()->user()->name           // Nom de l'utilisateur
auth()->user()->email          // Email
auth()->user()->credits        // Nombre de crédits
auth()->user()->is_admin       // Est administrateur
auth()->user()->is_active      // Est actif
auth()->user()->onewin_id      // ID 1win (nullable)
auth()->user()->vip_expires_at // Expiration VIP (nullable)
```

## 🎨 Styling

Le projet utilise **Tailwind CSS** pour le styling. Les classes CSS sont directement dans les vues Blade.

### Pour modifier les styles
- Éditez les fichiers `.blade.php` directement
- Modifiez les classes Tailwind
- Utilisez `npm run build` pour compiler

## 🐛 Dépannage

### Le projet ne démarre pas
```bash
php artisan config:cache    # Clear cache
php artisan migrate --force # Run migrations
npm run build              # Rebuild assets
```

### Les modales ne fonctionnent pas
- Vérifiez le support du navigateur pour `<dialog>` (Chrome 88+, Firefox 98+, Safari 17.2+)
- Fallback: Utilisez un polyfill si nécessaire

### Les API ne répondent pas
- Vérifiez que le token CSRF est présent dans les meta tags
- Vérifie la console du navigateur pour les erreurs
- Testez avec `curl -X POST http://localhost:8000/api/predict`

## 📞 Support

Pour plus d'aide :
1. Vérifiez le fichier `CONVERSION_SUMMARY.md`
2. Consultez la documentation Laravel Blade : https://laravel.com/docs/blade
3. Consultez Tailwind CSS : https://tailwindcss.com

---

**Conversion terminée le** 5 juin 2026 ✅
