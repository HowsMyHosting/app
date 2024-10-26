<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CloudwaysIntegration>
 */
class CloudwaysIntegrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->create()->id,
            'email' => fake()->email(),
            'api_key' => 'valid_api_key',
            'access_token' => 'valid_access_token',
            'expires_in' => 3600,
            'token_type' => 'Bearer',
        ];
    }
}
