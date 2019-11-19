<?php
require 'funcs/conexion.php';
require_once 'funcs/funcs.php';

$errors = array();

// verifica si la peticiòn es de tipo AJAX
  if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])== 'xmlhttprequest'    ) {
    // $mysqli = conectarDB();
    //creaciòn de la sesiòn:
    session_start();

    // Especifica que tipo de carcateres va a escapar
    $mysqli->set_charset('utf8');

    //real escape es para filtrar los caracteres que van a etrar a la consulta SQL para evita SQL inyection
    $correo_reg = $mysqli->real_escape_string( $_POST['correoU']);    
    $password = $mysqli->real_escape_string( $_POST['passwordU']);
    $errors= login($correo_reg, $password);

    if (empty($errors)) {
       $tipo_u = getTipo($correo_reg); 
      echo json_encode(array('error'=>false, 'dato'=>$tipo_u));
    }
    else {
        echo json_encode(array('error'=>true, 'dato'=>$errors));
    }
  }
  $mysqli->close();

?>