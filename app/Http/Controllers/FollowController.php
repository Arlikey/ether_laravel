<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FollowController extends Controller
{
    public function index()
    {
        $follows = Auth::user()->followings()->with('profile')->get();
        return Inertia::render('Follows/Follows', [
            'follows' => $follows
        ]);
    }
}
