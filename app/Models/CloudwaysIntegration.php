<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CloudwaysIntegration extends Model
{
    use HasFactory;

    // ----------------------------------- attributes

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'email',
        'api_key',
        'access_token',
        'token_type',
        'expires_in',
    ];

    // ----------------------------------- relations

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function apps(): HasMany
    {
        return $this->hasMany(CloudwaysApp::class);
    }

    public function serversResponse(): HasOne
    {
        return $this->hasOne(CloudwaysServersResponse::class);
    }

    // ----------------------------------- helpers

    /**
     * return if the access token for this cloudways
     * oauth integration has already expired.
     */
    public function accessTokenIsExpired(): bool
    {
        return Carbon::now()->greaterThan(
            // refresh it 30 seconds before it actually expires
            $this->updated_at->addSeconds($this->expires_in - 30)
        );
    }

    /**
     * return if this integration has a servers
     * response associated to it.
     */
    public function hasServersResponse(): bool
    {
        return $this->serversResponse()->exists();
    }
}
