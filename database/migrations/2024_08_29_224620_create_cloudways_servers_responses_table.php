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
        Schema::create('cloudways_servers_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('cloudways_integration_id');
            $table->json('servers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cloudways_servers_responses');
    }
};
