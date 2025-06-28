<?php

namespace App\Http\Controllers;

use App\Models\PostMedia;
use App\Models\UserPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'media.*' => 'file|mimes:jpg,jpeg,png,mp4|max:20480',
        ]);

        if (!$request->title && !$request->description && !$request->hasFile('media')) {
            return back()->withErrors(['title' => 'Post must contain at least title, description or media.']);
        }

        $user = auth()->user();

        $post = UserPost::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => $user->id,
        ]);

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $index => $file) {
                $path = $file->store('posts/media', options: 'public');

                $mime = $file->getMimeType();
                $type = str_starts_with($mime, 'video') ? 'video' : 'image';

                $post->post_media()->create([
                    'url' => $path,
                    'type' => $type,
                    'order' => $index,
                ]);
            }
        }

        return Redirect::route('profile.index', $user->username)
            ->with('status', 'Post created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
