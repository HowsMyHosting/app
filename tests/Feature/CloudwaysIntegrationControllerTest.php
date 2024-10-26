<?php

use App\Models\CloudwaysIntegration;
use App\Models\User;
use App\Services\CloudwaysApiService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->integration = null;
});

test('cloudways integration can be stored', function () {
    $fakePayload = [
        'email' => 'test@example.com',
        'api_key' => 'valid_api_key',
    ];

    Mockery::mock('alias:'.CloudwaysApiService::class)
        ->shouldReceive('createConnection')
        ->once()
        ->with($fakePayload['email'], $fakePayload['api_key'])
        ->andReturn($this->integration = CloudwaysIntegration::factory()->create([
            'user_id' => $this->user->id,
            'email' => $fakePayload['email'],
            'api_key' => $fakePayload['api_key'],
        ]));

    $response = $this->actingAs($this->user)
        ->post(route('cloudways-integration.store'), $fakePayload);

    $response->assertRedirect();
    $response->assertSessionHas('toast');

    $this->assertDatabaseHas('cloudways_integrations', [
        'user_id' => $this->user->id,
        'email' => $fakePayload['email'],
    ]);
});

afterEach(function () {
    Mockery::close();
});
