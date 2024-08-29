<?php

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

/**
 * Simple function to neatly and quickly retrieve
 * the authenticated user.
 *
 * @return User|null
 */
function user(): ?User
{
    if (Auth::check()) {
        return Auth::user();
    }

    return null;
}

/**
 * Return a redirect response with a flash message.
 */
function toastResponse(
    RedirectResponse|string $redirect,
    string $message,
    string $description,
    string $type = 'success'
): RedirectResponse {
    if (is_string($redirect)) {
        $redirect = redirect($redirect);
    }

    return $redirect
        ->with('toast.type', $type)
        ->with('toast.message', $message)
        ->with('toast.description', $description)
        ->with('toast.id', Str::random(40));
}
