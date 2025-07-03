<?php

namespace App\Http\Controllers;

use App\Models\PostMedia;
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
            return back()->withErrors(['message' => 'You must provide a title, description, or media.']);
        }

        $user = auth()->user();

        $post = UserPost::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => $user->id,
        ]);

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $index => $file) {
                $mime = $file->getMimeType();
                $type = str_starts_with($mime, 'video') ? 'video' : 'image';

                $extension = $file->getClientOriginalExtension();
                $filename = Str::uuid() . '.' . $extension;

                $originalPath = $file->storeAs('posts/media/originals', $filename, 'public');

                if ($type === 'image') {
                    File::ensureDirectoryExists(storage_path('app/public/posts/media/medium'));
                    File::ensureDirectoryExists(storage_path('app/public/posts/media/thumbs'));

                    $mediumPath = storage_path("app/public/posts/media/medium/{$filename}");
                    Image::read($file)->cover(640, 960)->save($mediumPath);

                    $thumbPath = storage_path("app/public/posts/media/thumbs/{$filename}");
                    Image::read($file)->cover(320, 480)->save($thumbPath);
                }

                $post->post_media()->create([
                    'url' => $filename,
                    'type' => $type,
                    'order' => $index,
                ]);
            }
        }

        return Redirect::route('profile.index', $user->slug)
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
