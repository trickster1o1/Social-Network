<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('signup',[App\Http\Controllers\UserController::class,'signUp']);
Route::post('login',[App\Http\Controllers\UserController::class,'login']);
Route::get('feeds',[App\Http\Controllers\UserController::class,'newsFeed']);
Route::get('u/{user}',[App\Http\Controllers\UserController::class,'profileView']);

Route::get('p/{user}',[App\Http\Controllers\ProfileController::class,'getProfile']);
Route::post('{user}/set',[App\Http\Controllers\ProfileController::class,'setProfile']);
Route::post('{user}/update',[App\Http\Controllers\ProfileController::class,'updateProfile']);


Route::get('post/{post}',[App\Http\Controllers\PostController::class,'getPost']);
Route::post('addpost/{user}',[App\Http\Controllers\PostController::class,'createPost']);
Route::post('likepost/{user}/{post}',[App\Http\Controllers\PostController::class,'likePost']);
