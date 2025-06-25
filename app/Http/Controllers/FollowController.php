<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FollowController extends Controller
{
    public function index()
    {
        $authUser = auth()->user();
        $follows = $authUser->followings()->with('profile')->get()->map(function ($user) use ($authUser) {
            return [
                'id' => $user->id,
                'username' => $user->username,
                'profile' => $user->profile,
                'isFollowing' => $authUser->isFollowing($user->id),
            ];
        });
        ;
        return Inertia::render('Follows/Follows', [
            'follows' => $follows
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
