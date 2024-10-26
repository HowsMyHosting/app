<?php

use App\Models\User;

test('dashboard is displayed', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn ($assert) => $assert->component('dashboard/show'));
});
