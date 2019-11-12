<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header("Content-Type: text/html; charset=utf-8");
	// header("Content-Type:multipart/form-data");

	require 'conectar.php';
	require 'funcs/funcs.php';

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);
	
	var_dump(json_decode($JSONData));
	$errors = array();
	$mjs = "";
	
		// $nombre = utf8_decode ($dataObject-> nombre);
		$nombre = utf8_decode ($dataObject-> nombre);
		$apellido1 = utf8_decode ( $dataObject-> apellido1);
		$apellido2 = utf8_decode ( $dataObject-> apellido2);
		$usuario = utf8_decode ($dataObject-> correo);
		$tipoUsuario = utf8_decode ($dataObject-> tipoUsuario);
		$password = $dataObject-> clave;
		$con_password = $dataObject-> confirmaClave;
		$activo = 1;

		// if(isNull($nombre, $password, $con_password, $usuario))
		// {
		// 	$errors[] = "Debe llenar todos los campos";
			
		// }

 		if(!validaPassword($password, $con_password))
		{
			$errors[] = "Las contraseñas no coinciden";
			
		}

		if(usuarioExiste($usuario))
		{
			$errors[] = "El nombre de usuario $usuario ya existe";
			
		}

		if(count($errors) == 0)
		{


				$pass_hash = hashPassword($password);
				$token = generateToken();

				$registro = registraUsuario($pass_hash, $nombre, $apellido1, $apellido2, $usuario, $tipoUsuario, $activo, $token);
				if($registro > 0 )
				{

					$mjs="Felicitaciones!, su cuenta ha sido registrada";
					// echo "<br><a href='index.php' >Iniciar Sesion</a>";
					echo json_encode(array('error'=>false,'usuario'=>$usuario,'mensaje'=>$mjs));
					exit;

					} else {
						$errors[] = "Error al crear la cuenta";
						echo json_encode(array('error'=>true, 'mensaje'=>$errors ));
					}



		}

?>