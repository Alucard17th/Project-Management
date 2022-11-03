<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtask extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'task_done', 'task_id'];
    protected $primaryKey = 'ID';
    
    public function task()
    {
        return $this->belongsTo('App\Models\Task');
    }
}
