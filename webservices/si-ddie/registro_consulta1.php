<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header("Content-Type: text/html; charset=utf-8");
  
  include "conectar.php";

  
	$JSONData = file_get_contents("php://input");
  $dataObject = json_decode($JSONData);

  // $dataObject = json_decode(file_get_contents("php://input"), true);
  // $dataObject= ["usuario": "1", "intervencion": "2", "solicitante": "5", "solicitud": "5", "fecha_solicitud": "2019-09-24", tema: "Los astronautas", respuesta: "4", fecha_respuesta: "2019-09-23" ];
    
    // $id_usuario =  (int) $dataObject['usuario'];
		// $id_intervencion = (int) $dataObject['intervencion'];
		// $id_solicitante = (int) $dataObject['solicitante'];
		// $id_solicitud = (int) $dataObject['solicitud'];
    // $tema =  $dataObject['tema'];
		// $id_respuesta = (int) $dataObject['respuesta'];
    // $fecha_respuesta = $dataObject['fecha_respuesta'];
    // $fecha_solicitud = $dataObject['fecha_solicitud'];
    // $fecha_respuesta= date('y-m-d:H:i', strtotime($fecha_respuesta));
    // $fecha_solicitud= date('Y-m-d H:i', strtotime($fecha_solicitud));

    // $task = $dataObject[''];
    // print_r($_POST);

    // $id_usuario = 1;
    // $id_intervencion = 2;
    // $id_solicitante = 2;
    // $id_solicitud = 1;
    // $id_respuesta = 3;
    // $tema = "Prueba";
    // $fecha_solicitud = "2019-03-11";
    // $fecha_respuesta = "2019-03-12";
    // $data = json_decode(file_get_contents("php://input"), true);
    // $task = $data['text'];
    //  echo "<script>console.log("task",$task)</script>";
    //  echo "<script>console.log('Debug Objects: " . $task . "' );</script>";


    sleep(1);
    $mysqli = conectarDB();

    // mysqli_query($mysqli,"INSERT INTO consultas (id_usuario,id_intervencion,id_solicitante,id_solicitud,id_respuesta,tema,fecha_solicitud,fecha_respuesta) VALUES                                                  ('$id_usuario','$id_intervencion','$id_solicitante','$id_solicitud','$id_respuesta','$tema','$fecha_solicitud','$fecha_respuesta')") or die ("Problemas al agregar elementos a la BD: ".mysqli_error($mysqli));


// $mysqli = conectarDB();
// mysqli_query(																																													
//   $mysqli,"INSERT INTO usuarios (usuario, claveEncriptada, nombre, apellido1, apellido2, pais, provincia, fechaNacimiento,  sexo, token, tipoUsuario, activo) VALUES( '$usuario', '$claveEncriptada', '$nombre',  '$apellido1', '$apellido2', '$pais', '$provincia', '$fechaNacimiento', '$sexo', '$token', '$tipoUsuario', '$activo')") or die ("Problemas al insertar registro".mysqli_error($mysqli));

  mysqli_close($mysqli);