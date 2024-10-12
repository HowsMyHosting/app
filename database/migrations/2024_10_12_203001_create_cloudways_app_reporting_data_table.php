<?php

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
        Schema::create('cloudways_app_reporting_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cloudways_app_id')->constrained()->onDelete('cascade');
            $table->foreignId('reporting_data_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['cloudways_app_id', 'reporting_data_id'], 'cloudways_app_reporting_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cloudways_app_reporting_data');
    }
};
