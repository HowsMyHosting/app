<?php

use App\Http\Controllers\CloudwaysAppController;
use App\Http\Controllers\CloudwaysIntegrationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    Route::controller(CloudwaysIntegrationController::class)->group(function () {
        Route::post('cloudways-integration', 'store')->name('cloudwaysIntegration.store');
        Route::get('cloudways-integration/refresh-servers-list', 'refreshServersList')->name('cloudwaysIntegration.refreshServersList');
    });

    Route::controller(CloudwaysAppController::class)->group(function () {
        Route::get('cloudways/app/{cloudwaysApp:uuid}', 'show')->name('cloudwaysApp.show');
        Route::post('cloudways/app', 'store')->name('cloudwaysApp.store');
        Route::delete('cloudways/app/{cloudwaysApp:uuid}', 'destroy')->name('cloudwaysApp.destroy');
    });
});

require __DIR__.'/auth.php';
