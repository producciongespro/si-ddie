<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header("Content-Type: text/html; charset=utf-8");

	require 'conectar.php';
	require 'funcs/funcs.php';

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);
	
	$errors = array();
	$mjs = "";
		
	$nombre = utf8_decode ($dataObject-> nombre);
	$apellido1 = utf8_decode ( $dataObject-> apellido1);
	$apellido2 = utf8_decode ( $dataObject-> apellido2);
	$usuario = utf8_decode ($dataObject-> correo);
	$tipoUsuario = utf8_decode ($dataObject-> tipoUsuario);
	$password = $dataObject-> clave;
	$con_password = $dataObject-> confirmaClave;
	
	$email = $usuario;
	
		$activo = 0;

 	 if(isNull($nombre, $password, $con_password, $email))
		 {
		 	$errors[] = "Debe llenar todos los campos";
		 }

 		if(!isMepEmail ($usuario))
		{
			$errors[] = "Debe ser un correo del MEP";

		}

		if(!isEmail($usuario))
		{
			$errors[] = "Dirección de correo inválida";

		}

		if(!validaPassword($password, $con_password))
		{
			$errors[] = "Las contraseñas no coinciden";

		}

			if(emailExiste($usuario))
		{
			$errors[] = "El correo electronico $usuario ya existe";

		}
    
    $totalErrores = count($errors);

		if(count($errors) == 0)
		{

			$pass_hash = hashPassword($password);
			$token = generateToken();

			$registro = registraUsuario($usuario, $pass_hash, $nombre, $apellido1, $apellido2, $token, $tipoUsuario, $activo);
		
			if($registro > 0 )
			{

				$url = 'http://'.$_SERVER["SERVER_NAME"].'/si-ddie/webservices/si-ddie/activar.php?id='.$registro.'&val='.$token;
				
				$asunto = 'Activar Cuenta - Sistema de Usuarios';
				$cuerpo = "Hola ".utf8_decode($nombre).": <br /><br />Para continuar con el proceso de registro, es indispensable que d&#233; clic en el siguiente enlace: <a href='$url'>activar cuenta</a>";

				if(enviarEmail($email, $nombre, $asunto, $cuerpo)){
					$mjs[]="Para terminar el proceso de registro siga las instrucciones que le hemos enviado a la direccion de correo electronico: ".$email;
          		echo json_encode(array('error'=>false,'msj'=>$mjs));
          		exit;

				}
				else {
							$errors[] = "Error al enviar correo electrónico";
							echo json_encode(array('error'=>true, 'msj'=>$errors ));
						}

      		}
			else {
						$errors[] = "Error al Registrar";
						echo json_encode(array('error'=>true, 'msj'=>$errors ));
					}
		}
		else {
			echo json_encode(array('error'=>true, 'msj'=>$errors ));
		}
 ?>
