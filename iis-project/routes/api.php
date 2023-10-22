<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['web'])->group(function () {
    Route::post('/login', [AuthController::class,'login']);
    Route::post('/signin', [AuthController::class,'register']);
    Route::post('/logout', [AuthController::class,'logout']);
    Route::post('/auth', [AuthController::class,'auth']);
});

Route::middleware(['auth'])->group(function () {
});

Route::middleware('auth:sanctum')->get('/check-auth', function (Request $request) {
    return response()->json(['authenticated' => true]);
});


//TODO check whether user has a valid session
Route::post('/checksession' , [AuthController::class, 'checkSession']);
