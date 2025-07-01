<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $authUser = auth()->user();

        return [
            'id' => $this->id,
            'username' => $this->username,
            'profile' => $this->profile,
            'isFollowing' => $authUser ? $authUser->isFollowing($this->id) : false,
            'followersCount' => $this->followers_count,
            'followingCount' => $this->followings_count,
            'followingSince' => $authUser && $authUser->isFollowing($this->id)
                ? optional($authUser->followings()->where('followed_id', $this->id)->first())->pivot->created_at
                : null,
        ];
    }
}
