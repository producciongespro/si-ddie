<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header("Content-Type: text/html; charset=utf-8");

	require 'conectar.php';
	require 'funcs/funcs.php';

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);
	
	$email = utf8_decode ($dataObject-> correo);
	// $email = $dataObject-> correo;
	// $email = "ana.araya.salazar@mep.go.cr";
	// var_dump($email);
    $errors = array();
	$mensaje = "";
	if(!empty($email))
	{
		if(!isEmail($email))
		{
			$errors[] = "Debe ingresar un correo electrónico válido";
		}
			
		if(emailExiste($email))
		{
			$user_id = getValor('idUsuario', 'correo', $email);
			$nombre = getValor('nombre', 'correo', $email);
			$token = generaTokenPass($user_id);

			$url = 'http://'.$_SERVER["SERVER_NAME"].'/si-ddie/webservices/si-ddie/cambia_pass.php?id='.$user_id.'&val='.$token;
			$txtasunto = 'Recuperar contraseña - Sistema de Usuarios';
			$asunto = utf8_decode($txtasunto);
			$cuerpo = "Hola ".utf8_decode($nombre).": <br /><br />Se ha solicitado un reinicio de contrase&ntilde;a. <br/><br/>Para restaurar la contrase&ntilde;a, d&#233; clic en el siguiente enlace: <a href='$url'>Recuperar contrase&ntilde;a</a>";
			
			// if(enviarCorreo($email, $asunto, $cuerpo)){
			if(enviarEmail($email, $nombre, $asunto, $cuerpo)){
				$mensaje[]= 'Se ha enviado un correo electrónico a la dirección '.$email.'. Para restablecer su contraseña siga las instrucciones que ahí se le indican';
				echo json_encode(array('error'=>false,'msj'=>$mensaje));
				exit;
			}
		} 
		else {
			$errors[] = "La dirección de correo electrónico no existe";
			echo json_encode(array('error'=>true, 'msj'=>$errors ));

		}
	}
?>