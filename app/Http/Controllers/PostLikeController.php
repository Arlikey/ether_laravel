<?php

namespace App\Http\Controllers;

use App\Models\PostLike;
use App\Models\UserPost;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    public function store(UserPost $post)
    {
        $user = auth()->user();

        if (!$post->isLikedBy($user)) {
            PostLike::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
            ]);
        }

        return 'ok';
    }

    public function destroy(UserPost $post)
    {
        $user = auth()->user();

        $post->likes()->where('user_id', $user->id)->delete();

        return 'ok';
    }
}
