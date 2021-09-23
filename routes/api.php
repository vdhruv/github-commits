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

Route::post('repositories/sync', [\App\Http\Controllers\Api\RepositoryController::class, 'syncCommits'])->name('');

Route::apiResource('repositories', \App\Http\Controllers\Api\RepositoryController::class)
    ->only('index', 'store', 'show');
