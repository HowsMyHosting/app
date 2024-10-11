<?php

use App\Models\CloudwaysApp;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cloudways_apps', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignId('user_id');
            $table->foreignId('cloudways_integration_id');
            $table->string('app_id');
            $table->string('label');
            $table->string('status')->default(CloudwaysApp::PENDING);
            $table->timestamps();

            $table->unique(['app_id', 'cloudways_integration_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cloudways_apps');
    }
};
