<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'account_number', 'email', 'password', 'plain_password', 'credits', 'is_active', 'is_admin', 'vip_expires_at', 'onewin_id'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'vip_expires_at' => 'datetime',
        ];
    }

    public function isVip(): bool
    {
        return $this->vip_expires_at && $this->vip_expires_at->isFuture();
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function predictions()
    {
        return $this->hasMany(Prediction::class);
    }

    /**
     * Génère un numéro de compte unique à 12 chiffres
     */
    public static function generateAccountNumber(): string
    {
        do {
            // Format : 100000000000 à 999999999999 (12 chiffres, jamais 0 en premier)
            $number = (string) random_int(100000000000, 999999999999);
        } while (self::where('account_number', $number)->exists());

        return $number;
    }
}
