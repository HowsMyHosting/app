<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CloudwaysAppResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $app = $this;

        if (is_array($app->resource)) {
            $app = (object) $app->resource;
        }

        return [
            'id' => $app->id,
            'label' => $app->label,
        ];
    }
}
