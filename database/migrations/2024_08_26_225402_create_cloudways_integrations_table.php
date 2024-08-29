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
        Schema::create('cloudways_integrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('access_token');
            $table->string('token_type')->default('Bearer');
            $table->integer('expires_in')->default(3600);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cloudways_integrations');
    }
};
