<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\UserPost;
use Exception;
use File;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;
use Redirect;
use Str;

class PostController extends Controller
{
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
            'media.*' => 'file|mimes:jpg,jpeg,png,webp,mp4|max:20480',
        ]);

        if (
            !$request->title &&
            !$request->description &&
            !$request->hasFile('media')
        ) {
            return back()->withErrors([
                'message' => 'You must provide a title, description, or media.',
            ]);
        }

        $user = auth()->user();

        $post = UserPost::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => $user->id,
        ]);

        $files = $request->file('media');
        if ($files && !is_array($files)) {
            $files = [$files];
        }

        if ($files) {
            foreach ($files as $index => $file) {
                $mime = $file->getMimeType();
                $type = str_starts_with($mime, 'video') ? 'video' : 'image';

                $extension = $file->getClientOriginalExtension();
                $filename = Str::uuid() . '.' . $extension;

                $originalPath = $file->storeAs('posts/media/originals', $filename, 'public');

                if ($type === 'image') {
                    try {
                        File::ensureDirectoryExists(storage_path('app/public/posts/media/medium'));
                        File::ensureDirectoryExists(storage_path('app/public/posts/media/thumbs'));

                        $mediumPath = storage_path("app/public/posts/media/medium/{$filename}");
                        $thumbPath = storage_path("app/public/posts/media/thumbs/{$filename}");

                        Image::read($file)->cover(640, 960)->save($mediumPath);
                        Image::read($file)->cover(320, 480)->save($thumbPath);

                    } catch (Exception $e) {
                        $post->delete();
                        return back()->withErrors([
                            'message' => 'Image processing failed: ' . $e->getMessage(),
                        ]);
                    }
                }

                $post->post_media()->create([
                    'url' => $filename,
                    'type' => $type,
                    'order' => $index,
                ]);
            }
        }

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Post created successfully!',
                'post_id' => $post->id,
            ]);
        }

        return Redirect::route('profile.index', $user->slug)
            ->with('status', 'Post created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPost $post)
    {
        $authUser = auth()->user();

        $post->load(['post_media', 'user.profile'])
            ->loadCount('likes');

        if ($authUser) {
            $post->loadExists([
                'likes as is_liked_by' => fn($q) => $q->where('user_id', $authUser->id),
                'saved_by_users as is_saved_by' => fn($q) => $q->where('user_id', $authUser->id),
            ]);
        }

        return Inertia::render('Posts/Reel', [
            'post' => PostResource::make($post)->resolve()
        ]);
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
