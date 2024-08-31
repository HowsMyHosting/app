<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CloudwaysServerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $server = $this;

        if (is_array($server->resource)) {
            $server = (object) $server->resource;
        }

        return [
           'id' => $server->id,
           'label' => $server->label,
           'apps' => CloudwaysAppResource::collection($server->apps),
        ];
    }
}
