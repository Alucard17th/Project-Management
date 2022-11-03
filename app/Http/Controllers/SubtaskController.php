<?php

namespace App\Http\Controllers;

use App\Models\Subtask;
use Illuminate\Http\Request;

class SubtaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $subtask = Subtask::create([
            'name' => $request->name,
            'description' => $request->description,
            'task_done' => $request->done,
            'task_id' => $request->task,
        ]);

        return response()->json($subtask);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Subtask  $subtask
     * @return \Illuminate\Http\Response
     */
    public function show(Subtask $subtask)
    {
        //
        $subtask = Subtask::create([
            'name' => $request->name,
            'description' => $request->description,
            'task_done' => $request->done,
            'task_id' => $request->task,
        ]);

        return response()->json($subtask);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Subtask  $subtask
     * @return \Illuminate\Http\Response
     */
    public function edit(Subtask $subtask)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subtask  $subtask
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subtask $subtask, $id)
    {
        if($request->doneAction){
            $sbtask = Subtask::where('ID', '=', $id)->update(array('task_done' => $request->done));
        }elseif($request->nameAction){
            $sbtask = Subtask::where('ID', '=', $id)->update(array('name' => $request->name));
        }

        return response()->json($sbtask);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subtask  $subtask
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subtask $subtask, $id)
    {
        //
        $model = Subtask::where('id',$id)->delete();

        return response()->json($model);

    }
}
