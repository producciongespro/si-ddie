<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header("Content-Type: text/html; charset=utf-8");
    // require 'funcs/conexion.php';
    // require 'funcs/funcs.php';
    require 'conectar.php';
    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);

    $errors = array();
    $mjs = "";
  
        $usuario = $dataObject-> usuario;
        $intervencion = $dataObject-> intervencion;
        $solicitante = $dataObject-> solicitante;
        $solicitud = $dataObject-> solicitud;
        $fecha_solicitud = $dataObject-> fecha_solicitud;
        $tema = $dataObject-> tema;
        $respuesta = $dataObject-> respuesta;
        $fecha_respuesta = $dataObject-> fecha_respuesta;
        $mysqli = conectarDB();
        //echo $respuesta;
        $registro = mysqli_query($mysqli,"INSERT INTO consultas (id_usuario, id_intervencion, id_solicitante, id_solicitud, id_respuesta, tema, fecha_solicitud, fecha_respuesta) 
                                                          VALUES( '$usuario', '$intervencion', '$solicitante',  '$solicitud', '$respuesta', '$tema', '$fecha_solicitud', '$fecha_respuesta')") or die ("Problemas al insertar registro".mysqli_error($mysqli));
                if($registro > 0 )
                {

                    $mjs="Registro exitoso";
                    // echo "<br><a href='index.php' >Iniciar Sesion</a>";
                    echo json_encode(array('error'=>false,'usuario'=>$usuario,'mensaje'=>$mjs));
                    exit;

                    } else {
                        $errors[] = "Error al registrar";
                        echo json_encode(array('error'=>true, 'mensaje'=>$errors ));
                    }       
?>
