<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header("Content-Type: text/html; charset=utf-8");
	
  require 'conexion.php';
  
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);
	
    $errors = array();
    
		$id_usuario =  $dataObject-> usuario;
		$id_intervencion =  $dataObject-> intervencion;
		$id_solicitante = $dataObject-> solictante;
		$id_solicitud = $dataObject-> solicitud;
		$tema = $dataObject-> tema;
		$id_respuesta = $dataObject-> respuesta;
		$fecha_respuesta = $dataObject-> fecha_respuesta;
		$fecha_solicitud = $dataObject-> fecha_solicitud;
		


    sleep(1);
    $mysqli = conectarDB();

    mysqli_query($mysqli,"INSERT INTO consultas (id_usuario,id_intervencion,id_solicitante,id_solicitud,id_respuesta,tema,fecha_solicitud,fecha_respuesta) VALUES
                                              ('$id_usuario','$id_intervencion','$id_solicitante','$id_solicitud','$id_respuesta','$tema','$fecha_solicitud','$fecha_respuesta')") or die ("Problemas al a���adir elementos a la BD".mysqli_error($mysqli));

    // $rs = mysqli_query($mysqli,"SELECT id_consulta, id_usuario from consultas ORDER BY id_consulta DESC LIMIT 1");
    //     if ($row = mysqli_fetch_row($rs)) {
    //     $id_ultimo = trim($row[0]);
    //     $usuario = trim($row[1]);
    //     }

mysqli_close($mysqli);