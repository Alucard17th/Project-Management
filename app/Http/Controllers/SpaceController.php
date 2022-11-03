<?php

namespace App\Http\Controllers;

use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SpaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $allSpaces = Space::with('folders')->where('user_id', Auth::id())->get();
        // return response()->json($allSpaces);
        
        // GET ALL CURRENT USER TEAMS
        $myTeams = Auth::user()->teams;
        $teamsID = [];

        // GET ALL THE CURRENT USER TEAMS IDS
        foreach ($myTeams as $team){
            array_push($teamsID, $team->id);
        }

        // GET ALL SPACES THAT ARE ASSIGNER TO CURRENT USER'S TEAMS
        $allSpaces = Space::whereIn('team_id', $teamsID)->with('folders')->get(); 

        foreach($allSpaces as $space){
            if ($space->user_id == Auth::user()->id) {
                $space->{"can_edit"} = true;
            }
            else{
                $space->{"can_edit"} = false;
            }
        }

        return response()->json($allSpaces);
    }

    public function indexme()
    {
        // GET ALL CURRENT USER TEAMS
        $myTeams = Auth::user()->teams;
        $teamsID = [];

        // GET ALL THE CURRENT USER TEAMS IDS
        foreach ($myTeams as $team){
            array_push($teamsID, $team->id);
        }

        // GET ALL SPACES THAT ARE ASSIGNER TO CURRENT USER'S TEAMS
        $allMySpaces = Space::whereIn('team_id', $teamsID)->get(); 

        return response()->json($allMySpaces);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $space = Space::create([
            'name' => $request->name,
            'description' => $request->desc,
            'user_id' => Auth::user()->id,
        ]);
        
        return response()->json(Auth::user()->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Space  $space
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Space $space)
    {
        //
        // $request->validate([
        //     'email' => ['required', 'email'],
        //     'password' => ['required']
        // ]);
        $space = Space::where('ID', '=', $request->id)->update(array(
            'name' => $request->name,
            'description' => $request->description,
            'privacy' => $request->privacy
        ));

        $currentSpace = Space::where('id', '=', $request->id)->get();
        return response()->json($currentSpace);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Space $space, $id)
    {
        //
        $space = Space::where('id',$id)->delete();

        return response()->json($space);
    }

}
