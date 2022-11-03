<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:api')->get('/athenticated', function () {
//     return true;
// });

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/authenticated', function () {return true; });
 });


Route::post('/loginacc', [LoginController::class, 'login'])->name('loginAcc');

Route::get('/ganttdata/{id}', [StageController::class, 'getGanttStages'])->name('ganttStages');