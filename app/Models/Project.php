<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'color', 'avatar', 'privacy', 'user_id', 'space_id'];

    // public function owner()
    // {
    //     return $this->belongsTo('App\Models\User');
    // }

    public function user()
    {
        return $this->belongsToMany('App\Models\User');
    }

    // public function space()
    // {
    //     return $this->belongsTo('App\Models\Space');
    // }

    public function stages()
    {
        return $this->hasMany('App\Models\Stage')->orderBy('order', 'asc');
    }

    
}
