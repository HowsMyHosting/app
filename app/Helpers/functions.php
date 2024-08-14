<?php

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

/**
 * Return a redirect response with a flash message.
 */
function toastResponse(
    RedirectResponse|string $redirect,
    string $message,
    string $type = 'success'
): RedirectResponse {
    if (is_string($redirect)) {
        $redirect = redirect($redirect);
    }

    return $redirect
        ->with('toast.type', $type)
        ->with('toast.message', $message)
        ->with('toast.id', Str::random(40));
}
