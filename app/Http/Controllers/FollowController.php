<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FollowController extends Controller
{
    public function index()
    {
        $authUser = auth()->user();

        $followings = $authUser
            ->followings()
            ->with('profile')
            ->withCount(['followings', 'followers'])
            ->get();

        $followers = $authUser
            ->followers()
            ->with('profile')
            ->withCount(['followings', 'followers'])
            ->get();

        $followings = UserResource::collection($followings)->resolve();
        $followers = UserResource::collection($followers)->resolve();

        return Inertia::render('Follows/Follows', [
            'followings' => $followings,
            'followers' => $followers,
        ]);

    }
    public function follow(Request $request)
    {
        auth()->user()->followings()->syncWithoutDetaching($request->id);
    }

    public function unfollow(Request $request)
    {
        auth()->user()->followings()->detach($request->id);
    }

    public function isFollowing(string $id): bool
    {
        return auth()->user()->isFollowing($id);
    }
}
