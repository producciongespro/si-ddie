<?php

	require 'funcs/conexion.php';
	require_once 'funcs/funcs.php';

	$errors = array();
	$msj = array();

	if(!empty($_POST))
	{
		$nombre = $mysqli->real_escape_string($_POST['signup_nombre']);
		$cedula = $mysqli->real_escape_string($_POST['signup_cedula']);
		$id_tipo = $mysqli->real_escape_string($_POST['signup_id_tipo']);
		$email = $mysqli->real_escape_string($_POST['signup_email']);
		$password = $mysqli->real_escape_string($_POST['signup_password']);
		$con_password = $mysqli->real_escape_string($_POST['signup_password_2']);
		$sexo = $mysqli->real_escape_string($_POST['signup_sexo']);

		$activo = 0;

		switch ($id_tipo) {
			case '1';
			case '6';
			case '7';
				$telefono_movil ='no se registra';
				$telefono_fijo ='no se registra';
				$estado_nombramiento = 'no se registra';
				$circuito = 0;
				$especialidad ='no aplica';
				$id_CE = 0;
			break;
			case '2': 
			# director
				$telefono_movil =  $mysqli->real_escape_string($_POST['signup_telefono_movil']);
				$telefono_fijo =  $mysqli->real_escape_string($_POST['signup_telefono_fijo']);
				$estado_nombramiento = $mysqli->real_escape_string($_POST['signup_estado_nombramiento']);
				// $circuito = $mysqli->real_escape_string($_POST['signup_circuito']);
				$circuito = 0;
				$id_CE =  $mysqli->real_escape_string($_POST['signup_id_centro']);
				$especialidad ='no aplica';
				
			break;
			default:
				# code...
				break;
		}

		 if(isNull($nombre, $password, $con_password, $email))
		 {
		 	$errors[] = "Debe llenar todos los campos";
		 }

 		if(!isMepEmail ($email))
		{
			$errors[] = "Debe ser un correo del MEP";

		}

		if(!isEmail($email))
		{
			$errors[] = "Dirección de correo inválida";

		}

		if(!validaPassword($password, $con_password))
		{
			$errors[] = "Las contraseñas no coinciden";

		}

			if(emailExiste($email))
		{
			$errors[] = "El correo electronico $email ya existe";

		}
	        $totalErrores = count($errors);

		if(count($errors) == 0)
		{


				$pass_hash = hashPassword($password);
				$token = generateToken();

				$registro = registraUsuarioAsesor($pass_hash, utf8_decode($nombre), $email, $cedula, $id_tipo, $sexo, $telefono_movil, $telefono_fijo, $estado_nombramiento, $circuito, utf8_decode($especialidad), $id_CE, $activo, $token);
				// echo "<script>console.log('Registro correo a: ', $registro)</script>";
           if($registro > 0 )
				{

					$url = 'http://'.$_SERVER["SERVER_NAME"].'/SI-Tecnoaprender/main_app/server/login/activar.php?id='.$registro.'&val='.$token;
					
					$asunto = 'Activar Cuenta - Sistema de Usuarios';
					$cuerpo = "Hola ".utf8_decode($nombre).": <br /><br />Para continuar con el proceso de registro, es indispensable que d&#233; clic en el siguiente enlace: <a href='$url'>activar cuenta</a>";

					if(enviarEmail($email, $nombre, $asunto, $cuerpo)){
						$mjs[]="Para terminar el proceso de registro siga las instrucciones que le hemos enviado a la direccion de correo electronico: ".$email;
				   	echo json_encode(array('error'=>false,'msj'=>$mjs));
					exit;

					} else {
						$errors[] = "Error al enviar correo electrónico";
						echo json_encode(array('error'=>true, 'msj'=>$errors ));
					}

					} else {
					  $errors[] = "Error al Registrar";
						echo json_encode(array('error'=>true, 'msj'=>$errors ));
				}



		}
		else {
			echo json_encode(array('error'=>true, 'msj'=>$errors ));
		}
	}
	
 ?>
