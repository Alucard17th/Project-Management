<?php 

namespace App\Models;

use Mpociot\Teamwork\TeamworkTeam;

class Team extends TeamworkTeam
{

    public function spaces()
    {
        return $this->hasMany('App\Models\Space');
    }

}