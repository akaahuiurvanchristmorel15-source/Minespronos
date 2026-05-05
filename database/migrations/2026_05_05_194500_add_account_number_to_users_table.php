<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Ajouter le numéro de compte 12 chiffres unique
            $table->string('account_number', 12)->unique()->nullable()->after('id');
            // Rendre email nullable (il ne sera plus utilisé pour la connexion)
            $table->string('email')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('account_number');
            $table->string('email')->nullable(false)->change();
        });
    }
};
