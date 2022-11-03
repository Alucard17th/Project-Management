<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Inertia::render('Project/AllProjects');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        $maxorder= Task::max('order');
        $task = Task::create([
            'name' => $request->name,
            'description' => '',
            // 'user_id' => Auth::id(),
            'stage_id' => $request->stage,
            'order' => $maxorder + 1,
            'priority' => 0
        ]);

        $user = Auth::user();

        $user->tasks()->attach($task);

        return response()->json($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $tasks = [];
        $action = "";

        if($request->action == "taskOrder")
        {
            // UPDATE TASK ORDER IN SAME STAGE/STATU
            foreach($request->tasks as $key => $value) {
                // $stages[] =  $key + 1;
                $tasks[] = Task::where('id', $value['id'] )->update(['order'=>$key + 1]);
                $tasks[] = $task;
            }

            $action = "TASK ORDER";
        }
        else if($request->action == "taskStage")
        {
            // UPDATE TASK FROM STAGE TO STAGE (+NEW TASK ORDERS IN THE TASK NEW TARGET STAGE)
            foreach($request->tasks as $key => $value) 
            {
                // $stages[] =  $key + 1;
                $tasks[] = Task::where('id', $value['id'] )->update(['order'=>$key + 1, 'stage_id'=>$request->newStageID]);
                $tasks[] = $task;
            }
            $action = "TASK STAGE";

        }
        else if($request->action == "task")
        {
            $tasks = Task::where('id', $request->task )->update(['description'=>$request->description]);
            $action = "TASK";
        }

        return response()->json($action);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task, $id)
    {
        //
        $model = Task::where('id',$id)->delete();
        return response()->json(['success' => 'success'], 200);
        // return response()->json($model);
    }

    public function projects()
    {
        //
        return response()->json([
            'name' => 'Abigail',
            'state' => 'CA',
        ]);
    }
}
