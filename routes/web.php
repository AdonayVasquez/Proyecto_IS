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

Route::get('/', function () {
    return view('index');
});

Route::get('/welcome', function () {
    return view('welcome');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/ventas', 'HomeController@ventas');
Route::get('/viajes', 'HomeController@viajes');
Route::get('/rutas', 'HomeController@rutas');
Route::get('/empleados', 'HomeController@empleados');
Route::post('/empleados', 'HomeController@empleados_buscar');
Route::post('/empleados-registro', 'HomeController@empleados_registro');
Route::post('/empleados-registrado', 'HomeController@empleados_registrado');


Route::view('/index', 'index')->name('index');
Route::post('index', 'MailController@store');

//Route::get('/perfil', 'HomeController@perfil')->name('perfil');

Route::resource('/perfil', 'PersonaController');

//Inicio de rutas para CRUD Lugares
//Leer e insertar
route::get('/rutas','lugarRutasController@read');
route::get('/createLugar','LugarRutasController@show');
route::post('/createLugar','LugarRutasController@create');
//Eliminar
route::get('eliminarLugar/{id}/destroy',['uses'=> 'LugarRutasController@destroy','as' => 'eliminarLugar.destroy']);
//Editar
route::get('editarLugar/{id}/edit',['uses'=> 'LugarRutasController@edit','as' => 'editarLugar']);
route::post('editarLugar/{id}/edit','lugarRutasController@update' );
//Fin de rutasdel CRUD Lugares

//Rutas para el envio de formulario de contacto

//Route::resource('/viajes', 'ViajesController');


// Inicio de rutas para CRUD de buses perteneciente al módulo de Viajes.
Route::get('/viajes', 'busesController@index');
Route::post('/create', 'busesController@store');
Route::get('/editar/{id}/',['uses'=>'busesController@edit', 'as' => 'editar']);
Route::post('/update/{id}', 'busesController@update');
Route::get('/eliminarBus/{id}',['uses'=>'busesController@destroy', 'as' => 'eliminarBus']);

// Inicio de rutas para CRUD de Viajes perteneciente al módulo de Viajes.
Route::get('/viajes', 'ViajesController@index');
Route::post('/create', 'ViajesController@create');
Route::get('/editar/{id}/',['uses'=>'ViajesController@edit', 'as' => 'editar']);
Route::post('/update/{id}', 'ViajesController@update');
Route::get('/eliminarViaje/{id}',['uses'=>'ViajesController@destroy', 'as' => 'eliminarViaje']);

