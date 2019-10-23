<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header("Content-Type: text/html; charset=utf-8");

    require 'conectar.php';
    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);
 
    $errors = array();
    $mjs = "";
    $id = $dataObject-> id;
    $respuesta = $dataObject-> respuesta;
    $fecha_respuesta = $dataObject-> fecha_respuesta;

    $comando = "UPDATE ".$_GET['tabla_destino']." SET `id_respuesta`='$respuesta', `fecha_respuesta`='$fecha_respuesta' WHERE `id`= '$id'";

    $mysqli = conectarDB();
    mysqli_set_charset($mysqli, "utf8"); //formato de datos utf8
    $registro = mysqli_query($mysqli,$comando) or die ("Problemas al insertar registro".mysqli_error($mysqli));
    if($registro > 0 )
    {
        $mjs="Registro exitoso";
        echo json_encode(array('error'=>false, 'mensaje'=>$mjs));
        exit;
    } else {
            $errors[] = "Error al registrar";
            echo json_encode(array('error'=>true, 'mensaje'=>$errors ));
        } 
?>