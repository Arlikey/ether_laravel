<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\FollowController;
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
    ]);
})->name('/');

// Route::get('/friends', function () {
//     return Inertia::render('Friends/Friends', [
//         'friends' => auth()->user()->followings()->with('profile')->get()
//     ]);
// })->middleware(['auth', 'verified'])->name('friends');

Route::get('/api/search-users', [ApiController::class, 'liveSearch']);

Route::get('/profile/{user}', [ProfileController::class, 'index'])->name('profile.index');
Route::get('/my-profile', function () {
    if (!auth()->check()) {
        return redirect()->route('login');
    }
    return redirect()->route('profile.index', auth()->user()->username);
})->name('profile.self');

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::prefix('follows')->group(function () {
        Route::get('/', [FollowController::class, 'index'])->name('follows.index');
        Route::patch('/follow/{id}', [FollowController::class, 'follow'])->name('follows.follow');
        Route::patch('/unfollow/{id}', [FollowController::class, 'unfollow'])->name('follows.unfollow');
    });
});

require __DIR__ . '/auth.php';
