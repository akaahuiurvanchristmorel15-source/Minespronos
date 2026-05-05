<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('predictions', function (Blueprint $table) {
            $table->decimal('bet_amount', 10, 2)->default(0)->after('pattern_result');
            $table->unsignedTinyInteger('confidence')->default(70)->after('bet_amount');
        });
    }

    public function down(): void
    {
        Schema::table('predictions', function (Blueprint $table) {
            $table->dropColumn(['bet_amount', 'confidence']);
        });
    }
};
