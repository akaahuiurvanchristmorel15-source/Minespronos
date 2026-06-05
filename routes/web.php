<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Welcome page (public)
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function (Illuminate\Http\Request $request) {
        return view('dashboard', [
            'predictions' => $request->user()->predictions()->orderBy('created_at', 'desc')->take(5)->get()
        ]);
    })->name('dashboard');
    
    // Pricing page
    Route::get('/pricing', function () {
        return view('pricing');
    })->name('pricing');

    // Admin routes
    Route::middleware(\App\Http\Middleware\AdminMiddleware::class)->prefix('admin')->group(function () {
        Route::get('/', [\App\Http\Controllers\AdminController::class, 'index'])->name('admin.index');
        Route::post('/users', [\App\Http\Controllers\AdminController::class, 'createUser'])->name('admin.createUser');
        Route::put('/users/{id}', [\App\Http\Controllers\AdminController::class, 'updateUser'])->name('admin.updateUser');
        Route::delete('/users/{id}', [\App\Http\Controllers\AdminController::class, 'deleteUser'])->name('admin.deleteUser');
        Route::post('/users/{id}/toggle-admin', [\App\Http\Controllers\AdminController::class, 'toggleAdmin'])->name('admin.toggleAdmin');
        Route::post('/users/{id}/toggle-active', [\App\Http\Controllers\AdminController::class, 'toggleActive'])->name('admin.toggleActive');
    });
});

// API routes (throttled)
Route::middleware(['auth', 'verified', 'throttle:10,1'])->group(function () {
    Route::post('/api/predict', [\App\Http\Controllers\Api\PredictionController::class, 'predict']);
    Route::post('/api/payments/initiate', [\App\Http\Controllers\Api\PaymentController::class, 'initiate']);
    Route::post('/api/user/link-1win', [\App\Http\Controllers\Api\UserController::class, 'linkOneWin']);
});

// Webhook (no CSRF)
Route::post('/api/webhooks/payment', [\App\Http\Controllers\Api\PaymentController::class, 'webhook'])->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

require __DIR__.'/settings.php';
