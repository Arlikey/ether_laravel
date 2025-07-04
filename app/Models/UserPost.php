<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPost extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'user_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post_media()
    {
        return $this->hasMany(PostMedia::class, 'post_id');
    }

    public function likes()
    {
        return $this->hasMany(PostLike::class, 'post_id');
    }

    public function isLikedBy($user)
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }

    public function saved_by_users()
    {
        return $this->belongsToMany(User::class, 'post_savings', 'post_id', 'user_id')->withTimestamps();
    }


    public function isSavedBy($user)
    {
        return $this->saved_by_users()->where('user_id', $user->id)->exists();
    }
}

