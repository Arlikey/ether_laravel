<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function liveSearch(Request $request)
    {
        $authUser = auth()->user();

        $users = User::where('username', 'like', "%{$request->q}%")
            ->when($authUser, fn($q) => $q->where('id', '!=', $authUser->id))
            ->with('profile')
            ->get();

        return UserResource::collection($users)->resolve();
    }

}
