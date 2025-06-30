<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'posts' => auth()->user()?->user_posts()->with('post_media')->get()
    ]);
})->name('/');

Route::get('/api/search-users', [ApiController::class, 'liveSearch']);

Route::get('/profile/{user}', [ProfileController::class, 'index'])->name('profile.index');
Route::get('/my-profile', function () {
    if (!auth()->check()) {
        return redirect()->route('login');
    }
    return redirect()->route('profile.index', auth()->user()->username);
})->name('profile.self');

Route::middleware('auth')->group(function () {
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::prefix('follows')->group(function () {
        Route::get('/', [FollowController::class, 'index'])->name('follows.index');
        Route::patch('/follow/{id}', [FollowController::class, 'follow'])->name('follows.follow');
        Route::patch('/unfollow/{id}', [FollowController::class, 'unfollow'])->name('follows.unfollow');
    });
    Route::get('/post', [PostController::class, 'create'])->name('posts.create');
    Route::post('/post', [PostController::class, 'store'])->name('posts.store');
});

require __DIR__ . '/auth.php';
