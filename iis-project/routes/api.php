<?php

use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['web'])->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/signin', [AuthController::class, 'register']);
    Route::post('/auth', [AuthController::class, 'auth']);
    Route::get('/user', [UserController::class, 'getUser']);

    Route::get('/events', [EventController::class, 'index']);
    Route::get('/myevents', [EventController::class, 'index_created_events']);
    Route::get('/event/{id}', [EventController::class, 'show']);
    Route::get('/locations', [LocationController::class, 'index']);

});

Route::middleware(['web', 'auth'])->group(function () {
    Route::post('/createevent', [EventController::class, 'create']);
    Route::post('/createlocation', [LocationController::class, 'create']);
    Route::post('/createcategory', [CategoryController::class, 'create']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/event/{id}/join', [EventController::class, 'joinEvent']);
    Route::post('/event/{id}/has_joined', [EventController::class, 'has_joined']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['web', 'auth', 'role:admin'])->group(function () {
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::get('/unconfirmed_events', [EventController::class, 'getUnConfirmed']);
});

Route::middleware('auth:sanctum')->get('/check-auth', function (Request $request) {
    return response()->json(['authenticated' => true]);
});

//TODO check whether user has a valid session
Route::post('/checksession', [AuthController::class, 'checkSession']);
