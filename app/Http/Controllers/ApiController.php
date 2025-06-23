<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function liveSearch(Request $request)
    {
        $query = $request->input('q');

        $users = User::where('username', 'like', "%{$query}%")
            ->with('profile')
            ->get();

        return response()->json($users);
    }
}
