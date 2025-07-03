<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserProfileResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Log;

class ProfileController extends Controller
{
    /**
     * Display the user's profile.
     */

    public function index(Request $request)
    {
        $authUser = auth()->user();

        $user = User::query()
            ->with(['user_posts.user'])
            ->with([
                'user_posts' => function ($query) use ($authUser) {
                    $query->with(['post_media'])
                        ->withCount('likes')
                        ->when(
                            $authUser,
                            fn($q) =>
                            $q->withExists(['likes as is_liked_by' => fn($q2) => $q2->where('user_id', $authUser->id)])
                        )
                        ->orderBy('created_at', 'desc');
                }
            ])
            ->withCount(['followers', 'followings', 'user_posts'])
            ->where('slug', '=', $request->slug)
            ->firstOrFail();

        return Inertia::render('Profile/Profile', [
            'user' => UserProfileResource::make($user)->resolve()
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        Log::info('Profile update data', $request->all());
        $data = $request->validate([
            'fullname' => 'nullable|string|max:32',
            'bio' => 'nullable|string|max:64',
            'avatar' => 'nullable|image|max:2048',
        ]);


        $user = auth()->user();
        $user->profile->update($data);

        if ($request->hasFile('avatar')) {
            $user->profile->update([
                'avatar' => $request->file('avatar')->store('avatars', 'public'),
            ]);
        }

        return response()->json([
            'profile' => $user->profile,
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
