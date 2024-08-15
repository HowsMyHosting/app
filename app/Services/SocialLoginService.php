<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginService
{
    protected object $driverUser;

    public static $availableProviders = 'google';

    public function authenticateFor(string $driver): User
    {
        $this->driverUser = Socialite::driver($driver)->stateless()->user();

        $user = match ($driver) {
            'google' => $this->authenticateForGoogle(),
        };

        return $user;
    }

    protected function authenticateForGoogle(): User
    {
        $isNew = User::where('google_id', $this->driverUser->id)->doesntExist();

        $user = User::updateOrCreate([
            'google_id' => $this->driverUser->id,
        ], [
            'email' => $this->driverUser->email,
            'google_token' => $this->driverUser->token,
            'google_refresh_token' => $this->driverUser->refreshToken,
        ]);

        if ($isNew) {
            event(new Registered($user));
        }

        return $user;
    }
}
