<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/** @mixin Builder */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    // ----------------------------------- attributes

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'google_id',
        'google_token',
        'google_refresh_token',
        'finished_initial_setup',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // ----------------------------------- relationships

    public function cloudwaysIntegration(): HasOne
    {
        return $this->hasOne(CloudwaysIntegration::class);
    }

    public function cloudwaysApps(): HasMany
    {
        return $this->hasMany(CloudwaysApp::class);
    }

    public function integrations(): BelongsToMany
    {
        return $this->belongsToMany(Integration::class)->withTimestamps();
    }

    // ----------------------------------- helpers

    public function hasCloudwaysIntegration(): bool
    {
        return $this->cloudwaysIntegration()->exists();
    }
}
