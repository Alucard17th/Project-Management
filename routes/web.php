<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\SubtaskController;
use App\Http\Controllers\ChecklistController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

// Route::middleware('auth:sanctum')->group(function() {
//     Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
// });

// USERS edituser
Route::patch('/edituser/{id}', [LoginController::class, 'updateUser'])->name('user.update');

// TEAMS
Route::get('/allteams', [LoginController::class, 'teams'])->name('teams.read');
Route::get('/getmembers/{id}', [LoginController::class, 'getTeamMembers'])->name('teams.members');
Route::post('/addteam', [LoginController::class, 'storeteam'])->name('teams.create');
Route::patch('/editeam/{id}', [LoginController::class, 'updateteam'])->name('teams.update');
Route::delete('/deleteteam/{id}', [LoginController::class, 'destroyteam'])->name('teams.delete');

// SPACES
Route::get('/spaceslist', [SpaceController::class, 'index'])->name('stages.read');
Route::get('/myspaceslist', [SpaceController::class, 'indexme'])->name('stages.read.me');
Route::post('/addspace', [SpaceController::class, 'store'])->name('stages.create');
Route::patch('/editspace/{id}', [SpaceController::class, 'update'])->name('stages.update');
Route::delete('/deletespace/{id}', [SpaceController::class, 'destroy'])->name('stages.delete');

// PROJECTS
Route::get('/projectslist/{id}', [ProjectsController::class, 'index'])->name('projects');
Route::get('/project/{id}', [ProjectsController::class, 'indexSingle'])->name('project');
Route::get('/currentproject/{id}', [ProjectsController::class, 'indexCurrentSingle'])->name('project');
Route::get('/projectstages/{id}', [ProjectsController::class, 'stages'])->name('projects.stages');
Route::post('addproject', [ProjectsController::class, 'store'])->name('add.projects');
Route::post('addstage', [ProjectsController::class, 'stage'])->name('add.projects.stages');
Route::patch('/editproject/{id}', [ProjectsController::class, 'update'])->name('edit.subtasks');
Route::delete('/deleteproject/{id}', [ProjectsController::class, 'destroy'])->name('delete.project');

// STAGES
Route::post('/statusorder', [StageController::class, 'update'])->name('ordered.stages');
Route::get('/ganttdata/{id}', [StageController::class, 'ganttindex'])->name('tasks');

// TASKS
Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
Route::post('addtask', [TaskController::class, 'store'])->name('add.tasks');
Route::put('/edittask', [TaskController::class, 'update'])->name('update.tasks');
Route::delete('/deletetask/{id}', [TaskController::class, 'destroy'])->name('delete.tasks');

// FILES & DOCUMENTS
Route::post('addfile', [FileController::class, 'store'])->name('add.file');
Route::get('/documents', [DocumentController::class, 'index'])->name('documents');
Route::post('adddocument', [DocumentController::class, 'store'])->name('add.documents');

// SUBTASKS 
Route::post('addsubtask', [SubtaskController::class, 'store'])->name('add.subtasks');
Route::patch('/editsubtask/{id}', [SubtaskController::class, 'update'])->name('edit.subtasks');
Route::delete('/deletesubtask/{id}', [SubtaskController::class, 'destroy'])->name('delete.stages');

// CHECKLISTS 
Route::post('addchecklist', [ChecklistController::class, 'store'])->name('add.checklists');
Route::patch('/editchecklist/{id}', [ChecklistController::class, 'update'])->name('edit.checklists');
Route::delete('/deletechecklist/{id}', [ChecklistController::class, 'destroy'])->name('delete.checklist');

Route::get ('/assign', [LoginController::class, 'assignTeam'])->name('add.checklists');


