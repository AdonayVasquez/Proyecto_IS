<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    public function index()
    {

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es Tegucigalpa
        $tegus = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='tegucigalpa' order by rutaviajes.horasalida");

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es San Pedro Sula
        $sps = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='san pedro sula' order by rutaviajes.horasalida");

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es La ceiba
        $ceiba = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='ceiba' order by rutaviajes.horasalida");

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es Siguatepeque
        $siguatepeque = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='siguatepeque' order by rutaviajes.horasalida");

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es Catacamas
        $catacamas = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='catacamas' order by rutaviajes.horasalida");

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es Choluteca
        $choluteca = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='choluteca' order by rutaviajes.horasalida");

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es Lago De Yojoa
        $lago = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='lago de yojoa' order by rutaviajes.horasalida");

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es Trujillo
        $trujillo = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='trujillo' order by rutaviajes.horasalida");

        //Esta variable contiene una consulta la cual muestra todas los destinos tarifas y horarios cuya salida es Danli
        $danli = DB::SELECT("SELECT lr1.nombre salida,lr2.nombre destino, rutas.precio tarifa, rutaviajes.horasalida hora from rutaviajes inner JOIN
                                rutas on rutas.idruta=rutaviajes.ruta_idruta inner join
                                lugarrutas lr1 on lr1.idlugar=rutas.lugarInicio inner JOIN
                                lugarrutas lr2 on lr2.idlugar=rutas.lugarFin
                                where lr1.nombre='danli' order by rutaviajes.horasalida");

        return view('index', ['tegus' => $tegus, 'sps' => $sps, 'ceiba' => $ceiba, 'siguatepeque' => $siguatepeque, 'catacamas' => $catacamas, 'choluteca' => $choluteca, 'lago' => $lago, 'trujillo' => $trujillo, 'danli' => $danli]);

    }
}
