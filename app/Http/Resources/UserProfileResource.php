<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
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
            'slug' => $this->slug,
            'profile' => $this->profile,
            'posts' => PostPreviewResource::collection($this->whenLoaded('user_posts'))->resolve(),
            'likedPosts' => PostPreviewResource::collection($this->whenLoaded('liked_posts'))->resolve(),
            'savedPosts' => PostPreviewResource::collection($this->whenLoaded('saved_posts'))->resolve(),
            'isFollowing' => $authUser ? $authUser->isFollowing($this->id) : false,
            'followersCount' => $this->followers_count,
            'followingCount' => $this->followings_count,
            'postsCount' => $this->user_posts_count,
            'followingSince' => $authUser && $authUser->isFollowing($this->id)
                ? optional($authUser->followings()->where('followed_id', $this->id)->first())->pivot->created_at
                : null,
        ];
    }
}
