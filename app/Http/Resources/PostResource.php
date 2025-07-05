<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'user' => $this->user,
            'created_at' => $this->created_at,
            'likesCount' => $this->likes_count,
            'isLikedBy' => (bool) $this->is_liked_by,
            'isSavedBy' => (bool) $this->is_saved_by,
            'media' => MediaResource::collection($this->post_media)->resolve(),
            'commentsCount' => $this->comments_count,
            'comments' => PostCommentResource::collection($this->whenLoaded('comments'))->resolve(),
        ];
    }
}
