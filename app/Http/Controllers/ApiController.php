<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserPost;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function liveSearch(Request $request)
    {
        $authUser = auth()->user();

        $users = User::where('username', 'like', "%{$request->q}%")
            ->when($authUser, fn($q) => $q->where('id', '!=', $authUser->id))
            ->with('profile')
            ->withCount(['followings', 'followers'])
            ->get();

        return UserResource::collection($users)->resolve();
    }

    public function getPosts(Request $request)
    {
        $authUser = auth()->user();

        $posts = UserPost::query()
            ->with(['post_media', 'user.profile', 'comments.user.profile'])
            ->withCount(['likes', 'comments'])
            ->when($authUser, function ($query) use ($authUser) {
                $query->withExists([
                    'likes as is_liked_by' => function ($q) use ($authUser) {
                        $q->where('user_id', $authUser->id);
                    },
                    'saved_by_users as is_saved_by' => function ($q) use ($authUser) {
                        $q->where('user_id', $authUser->id);
                    }
                ]);
            })
            ->latest()
            ->get();

        return PostResource::collection($posts)->resolve();
    }
}
