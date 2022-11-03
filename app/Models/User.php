<?php

namespace App\Models;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Mpociot\Teamwork\Traits\UserHasTeams;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // MY Functions

    public function spaces()
    {
        return $this->hasMany('App\Models\Space');
    }

    public function projects()
    {
        return $this->belongsToMany('App\Models\Project');
    }

    public function tasks()
    {
        return $this->belongsToMany('App\Models\Task', 'user_task');
    }

    public function UserTasksIds()
    {
        return $this->belongsToMany('App\Models\Task', 'user_task')->select(['task_id']);
    }

    use UserHasTeams;
}
