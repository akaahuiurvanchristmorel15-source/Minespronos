<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prediction extends Model
{
    protected $fillable = ['user_id', 'mines_count', 'pattern_result', 'bet_amount', 'confidence'];

    protected function casts(): array
    {
        return [
            'pattern_result' => 'array',
            'bet_amount' => 'float',
            'confidence' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
