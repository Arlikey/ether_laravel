<?php

namespace App\Http\Controllers;

use App\Models\UserPost;
use Illuminate\Http\Request;

class PostSavingController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(UserPost $post)
    {
        $user = auth()->user();

        if (!$post->isSavedBy($user)) {
            $user->saved_posts()->syncWithoutDetaching($post->id);
        }

        return 'ok';
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPost $post)
    {
        $user = auth()->user();

        $user->saved_posts()->detach($post->id);

        return 'ok';
    }
}
