<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function liveSearch(Request $request)
    {
        $authUser = auth()->user();
        $users = User::where('username', 'like', "%{$request->q}%")
            ->where('id', '!=', $authUser->id)
            ->with('profile')
            ->get()
            ->map(function ($user) use ($authUser) {
                return [
                    'id' => $user->id,
                    'username' => $user->username,
                    'profile' => $user->profile,
                    'isFollowing' => $authUser->isFollowing($user->id),
                ];
            });

        return response()->json($users);
    }
}
