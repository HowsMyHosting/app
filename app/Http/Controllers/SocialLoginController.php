<?php

namespace App\Http\Controllers;

use App\Services\SocialLoginService as ServicesSocialLoginService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function toProvider(string $driver): RedirectResponse
    {
        return Socialite::driver($driver)->stateless()->redirect();
    }

    public function handleCallback(string $driver)
    {
        $user = (new ServicesSocialLoginService)->authenticateFor($driver);

        Auth::login($user);

        return toastResponse(
            redirect: redirect('/dashboard'),
            message: __('auth.success'),
        );
    }
}
