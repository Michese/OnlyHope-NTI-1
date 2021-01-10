<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index']);
Route::get('/clear', [\App\Http\Controllers\HomeController::class, 'clear']);
Route::post('/add', [\App\Http\Controllers\HomeController::class, 'add']);
Route::post('/deleteRedRows', [\App\Http\Controllers\HomeController::class, 'deleteRedRows']);
Route::post('/allUsers', [\App\Http\Controllers\HomeController::class, 'allUsers']);
