<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        // //
        $folders = [];
        $user = Auth::user();
        $user_tasks = $user->UserTasksIds();
        if($request->userOnly){
            $folders = $user->projects()
            ->where('space_id', $id)
            ->with('stages', function($query) use($user_tasks) {
                $query->with('task', function($sub_query) use($user_tasks) {
                    $sub_query->whereIn('id', $user_tasks);
                });
            })
            ->get();
        }
        else{
            $folders = Project::with('stages.task', 'stages.task.subtask','stages.task.checklist', 'stages.task.files')
            ->where('space_id', $id)->get();
        }

        $user_tasks_array = $user_tasks->get()->pluck('task_id')->toArray();

        foreach($folders as $folder){

            if ($folder->user_id == $user->id) {
                $folder->{"can_edit"} = true;
            }
            else{
                $folder->{"can_edit"} = false;
            }

            foreach($folder->stages as $stage){
                foreach($stage->task as $task){
                    // $hasPivot = Auth::user()->whereHas('tasks', function ($q) use ($task) {
                    //     $q->where('task_id', $task->id);
                    // })
                    // ->exists();
                    if (in_array($task->id, $user_tasks_array)) {
                        $task->{"can_edit"} = true;
                    }
                    else{
                        $task->{"can_edit"} = false;
                    }
                   
                }
            }
        }

        return response()->json($folders);
    }

    public function indexSingle($id)
    {
        $t = Project::with('stages.task.subtask','stages.task.checklist', 'stages.task.files')
        ->where('id', $id)
        ->where('user_id', Auth::id())->get();
        
        return response()->json($t);
    }

    public function stages($id)
    {
        $pstages = Project::where('id', '=', $id)->with('stages')->get();
        return response()->json($pstages);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $project = Project::create([
            'name' => $request->name,
            'description' => $request->desc,
            'color' => $request->color,
            'user_id' => Auth::id(),
            'space_id' => $request->space,
        ]);
        
        return response()->json($project);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
        // $request->validate([
        //     'email' => ['required', 'email'],
        //     'password' => ['required']
        // ]);
        $project = Project::where('ID', '=', $request->id)->update(array(
            'name' => $request->name,
            'description' => $request->description,
            'color' => $request->color,
        ));

        $currentProject = Project::where('id', '=', $request->id)->with('stages')->get();
        return response()->json($currentProject);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project, $id)
    {
        $model = Project::where('id',$id)->delete();
        return response()->json($model);
    }

    /**
     * Add New Stage for the project.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function stage(Request $request, Project $project)
    {
        $maxOrder =  Stage::where(['project_id'=>$request->project])->max('order');
        $stage = new Stage(['name' => $request->name, 'order' => $maxOrder]);
        $project = Project::find($request->project);
        $project->stages()->save($stage);
        return response()->json($maxOrder);
    }  

    public function indexCurrentSingle($id)
    {
        $currentProject = Project::where('id', '=', $request->id)->with('stages')->get();
        return response()->json($currentProject);
    } 

}
