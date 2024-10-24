<?php

use App\Http\Controllers\BulkCloudwaysAppController;
use App\Http\Controllers\BulkCloudwaysAppReportingDataController;
use App\Http\Controllers\BulkEmailReportController;
use App\Http\Controllers\CloudwaysAppController;
use App\Http\Controllers\CloudwaysAppReportingDataController;
use App\Http\Controllers\CloudwaysIntegrationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureAuthUserHasCloudwaysIntegration;
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

    Route::middleware(EnsureAuthUserHasCloudwaysIntegration::class)->group(function () {
        Route::controller(CloudwaysAppController::class)->group(function () {
            Route::get('cloudways/app/view/{cloudwaysApp:uuid}', 'show')->name('cloudwaysApp.show');
            Route::get('cloudways/app/create', 'create')->name('cloudwaysApp.create');
            Route::delete('cloudways/app/{cloudwaysApp:uuid}', 'destroy')->name('cloudwaysApp.destroy');
        });

        Route::controller(BulkCloudwaysAppController::class)->group(function () {
            Route::post('cloudways/apps/bulk', 'store')->name('cloudwaysApp.store.bulk');
            Route::delete('cloudways/apps/bulk', 'destroy')->name('cloudwaysApp.destroy.bulk');
        });

        Route::controller(CloudwaysAppReportingDataController::class)->group(function () {
            Route::post('cloudways/app/{cloudwaysApp:uuid}/reporting-data', 'store')->name('cloudwaysAppReportingData.store');
        });

        Route::controller(BulkCloudwaysAppReportingDataController::class)->group(function () {
            Route::get('cloudways/app/reporting-data/bulk', 'create')->name('cloudwaysAppReportingData.create.bulk');
            Route::post('cloudways/app/reporting-data/bulk', 'store')->name('cloudwaysAppReportingData.store.bulk');
        });

        Route::controller(EmailReportController::class)->group(function () {
            Route::post('cloudways/app/{cloudwaysApp:uuid}/reporting-email', 'store')->name('emailReport.store');
        });

        Route::controller(BulkEmailReportController::class)->group(function () {
            Route::get('cloudways/app/email-report/bulk', 'create')->name('emailReport.create.bulk');
            Route::post('cloudways/app/email-report/bulk', 'store')->name('emailReport.store.bulk');
        });
    });
});

require __DIR__.'/auth.php';
