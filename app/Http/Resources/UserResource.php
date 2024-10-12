<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'finished_initial_setup' => $this->finished_initial_setup,
            'initial_setup_step' => $this->initial_setup_step,
            'hasCloudwaysIntegration' => $this->hasCloudwaysIntegration(),
            'addedFirstApp' => $this->cloudwaysApps()->exists() && ! $this->finished_initial_setup,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
