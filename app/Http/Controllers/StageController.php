<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\Stage;
use App\Models\Project;


class StageController extends Controller
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
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {   
        $stages = [];
        //
        // foreach($request as $statu)
        // foreach($request->status as $key => $value) {
        // {
        //     // $stages[] = Stage::where('id', $statu['id'] )->update(['order'=>$statu['order']]);
        //     $stages[] =  $statu;
        // }
        foreach($request->status as $key => $value) {
            // $stages[] =  $key + 1;
            $stages[] = Stage::where('id', $value['id'] )->update(['order'=>$key + 1]);
        }

        // dd ($request);
        return response()->json($stages);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function ganttindex(Request $request, $id)
    {
        //
        $gstages = Project::where('id', '=', $id)->with('stages.task')->get();
        return response()->json($gstages);
    }

    public function getGanttStages($id){
        $gstages = Project::where('id', '=', $id)->with('stages.task')->get();
       
        // return response()->json([
        //     "data" => $gstages->all(),
        //     "links" => $gstages->all()
        // ]);
        $pStages = [];
        $myStages = [];
        foreach ($gstages as $key => $value){
            //commandes
            $pStages[] = ['id'=>$value['id'], 'text'=>$value['name'], 'start_date'=>$value['start_date'], 
            'duration'=>$value['duration'], 'progress'=>$value['progress'], 'parent'=>0];
        }

        foreach ($gstages[0]->stages as $stage){
            //commandes
            $myStages[] = ['id'=>$stage['id'] .'pmgId', 'text'=>$stage['name'], 'start_date'=>$stage['start_date'], 
            'duration'=>$stage['duration'], 'progress'=>$stage['progress'], 'parent'=>0];

            foreach($stage->task as $task){
                $progress = $task['percent'] / 100;
                $myStages[] = ['id'=>$task['id'], 'text'=>$task['name'], 'start_date'=>$task['start_date'], 
            'duration'=>$task['duration'], 'progress'=>$progress , 'parent'=>$stage['id'] .'pmgId'];
            }
        }

        $stages = [
            ['id'=>1, 'text'=>'Project #1', 'start_date'=>'2017-04-01 00:00:00', 
                'duration'=>5, 'progress'=>0.8, 'parent'=>0],
            ['id'=>2, 'text'=>'Task #1', 'start_date'=>'2017-04-06 00:00:00', 
                'duration'=>4, 'progress'=>0.5, 'parent'=>1],
            ['id'=>3, 'text'=>'Task #2', 'start_date'=>'2017-04-05 00:00:00', 
                'duration'=>6, 'progress'=>0.7, 'parent'=>1],
            ['id'=>4, 'text'=>'Task #3', 'start_date'=>'2017-04-07 00:00:00', 
                'duration'=>2, 'progress'=>0, 'parent'=>1],
            ['id'=>5, 'text'=>'Task #1.1', 'start_date'=>'2017-04-05 00:00:00', 
                'duration'=>5, 'progress'=>0.34, 'parent'=>2],
            ['id'=>6, 'text'=>'Task #1.2', 'start_date'=>'2017-04-11 00:00:00', 
                'duration'=>4, 'progress'=>0.5, 'parent'=>2],
            ['id'=>7, 'text'=>'Task #2.1', 'start_date'=>'2017-04-07 00:00:00', 
                'duration'=>5, 'progress'=>0.2, 'parent'=>3],
            ['id'=>8, 'text'=>'Task #2.2', 'start_date'=>'2017-04-06 00:00:00', 
                'duration'=>4, 'progress'=>0.9, 'parent'=>3]
        ];

        return response()->json([
            "data" => $myStages,
            "links" => $pStages,
            "stages" => $gstages
        ]);
    }
}
