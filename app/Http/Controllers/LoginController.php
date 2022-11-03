<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Team;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($request->only('email', 'password'))){
            return response()->json(Auth::user(), 200);
        }
        throw ValidationException::withMessages([
            'errorMessage' =>['The provided credentials are incorect.']
        ]);
    }
    
    public function updateUser(Request $request){

        $name = '';

        // if($request->file('image')){
        //     $imgpath = public_path('images');
        //     $fileName = $request->file('image')->getClientOriginalName();
        //     $newName = time() . '_'.$fileName.'.' . $request->file('image')->getClientOriginalExtension();
        //     $request->file('image')->move($imgpath, $newName);
        //     $imageName = $fileName;
        // } 

        if($request->avatar){

            $name = time().'.' . explode('/', explode(':', substr($request->avatar, 0, strpos($request->avatar, ';')))[1])[1];
            \Image::make($request->avatar)->save(public_path('images/profile/').$name);
            $request->merge(['avatar' => $name]);
           
        }

        $project = User::where('ID', '=', $request->id)->update(array(
            'name' => $request->name,
            'email' => $request->email,
            // 'password' => $request->password,
            'avatar' => $name
        ));

        return response()->json($request);
    }

    public function logout()
    {
        Auth::logout();
    }

    // TEAMS
    public function teams()
    {
        // $team    = new Team();
        // $team->owner_id = User::where('name', '=', 'Nordin')->first()->getKey();
        // $team->name = 'My awesome team';
        // $team->save();

        // $myOtherCompany = new Team();
        // $myOtherCompany->owner_id = User::where('name', '=', 'Nordin')->first()->getKey();
        // $myOtherCompany->name = 'My other awesome team';
        // $myOtherCompany->save();

        $user = User::where('id', '=', 12)->first();
        $team = Auth::user()->ownedTeams;
        $teams = Team::all();
        return response()->json($teams);
        // team attach alias
        // $user->attachTeam(1); // First parameter can be a Team object, array, or id

        // or eloquent's original technique
        // $user->teams()->attach(1); // id only
    }

    public function storeteam(Request $request)
    {
        $team = new Team();
        $team->owner_id = Auth::user()->first()->getKey();
        $team->name = $request->name;
        $team->save();
    } 
    
    public function updateteam()
    {

    } 

    public function getTeamMembers($id)
    {
        $members = Auth::user()->currentTeam->users;
        $team = Team::where('id', '=', $id)->first();
        return response()->json($team->users);
    } 

    public function assignTeam(){
        $user = User::where('id', '=', '13')->first();

        // team attach alias
        $user->attachTeam(5); // First parameter can be a Team object, array, or id

        // $user->teams()->attach(1); // id only

    }
    
    public function destroyteam()
    {

    }


}