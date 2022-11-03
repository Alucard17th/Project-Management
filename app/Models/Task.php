<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'stage_id', 'order', 'done', 'priority'];
    protected $primaryKey = 'ID';
    
    public function user()
    {
        return $this->belongsToMany('App\Models\User');
    }

    // public function project()
    // {
    //     return $this->belongsTo('App\Models\Project');
    // }

    public function stage()
    {
        return $this->belongsTo('App\Models\Stage');
    }

    public function subtask()
    {
        return $this->hasMany('App\Models\Subtask','task_id', 'id');
    }

    public function checklist()
    {
        return $this->hasMany('App\Models\Checklist','task_id', 'id');
    }

    public function files()
    {
        return $this->hasMany('App\Models\File','task_id', 'id');
    }
}
