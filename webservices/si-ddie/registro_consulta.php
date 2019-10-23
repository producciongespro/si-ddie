<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header("Content-Type: text/html; charset=utf-8");
    sleep(1);
    require 'conectar.php';
    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);
   
    $lista_campos = "";
    $lista_valores  = "";
    $errors = array();
    $mjs = "";
    $comando = "insert into ".$_GET['tabla_destino']." (";
    foreach ($dataObject as $campo => $valor){
        $lista_campos .= "$campo,";
        $lista_valores  .= "'$valor',";
    }
    $lista_campos = substr($lista_campos,0,-1);
    $lista_valores = substr($lista_valores,0,-1);
    $comando .= $lista_campos.") values (".$lista_valores.")";
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