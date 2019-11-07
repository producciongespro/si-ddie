<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header("Content-Type: text/html; charset=utf-8");
	require 'funcs/conexion.php';
	require 'funcs/funcs.php';
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);

	$errors = array();
	$mjs = "";
	
		$nombre = utf8_decode ($dataObject-> nombre);
		$apellido1 = utf8_decode ( $dataObject-> apellido1);
		$apellido2 = utf8_decode ( $dataObject-> apellido2);
		$usuario = utf8_decode ($dataObject-> usuario);
		$pais = utf8_decode ($dataObject-> pais);
		$provincia = utf8_decode ($dataObject-> provincia);
		$sexo = $dataObject-> sexo;
		$fechaNacimiento = $dataObject-> fechaNacimiento;
		$password = $dataObject-> clave;
		$con_password = $dataObject-> confirmaClave;
		$activo = 1;
		$tipoUsuario = 4;
		if(isNull($nombre, $usuario, $password, $con_password))
		{
			$errors[] = "Debe llenar todos los campos";
			
		}

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

				$registro = registraUsuario($usuario, $pass_hash, $nombre, $apellido1, $apellido2, $pais, $provincia, $fechaNacimiento, $sexo, $token, $tipoUsuario, $activo);

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

	// }

	function calculaedad($fechanacimiento){
	  list($ano,$mes,$dia) = explode("-",$fechanacimiento);
	  $ano_diferencia  = date("Y") - $ano;
	  $mes_diferencia = date("m") - $mes;
	  $dia_diferencia   = date("d") - $dia;
	  if ($dia_diferencia < 0 || $mes_diferencia < 0)
	    $ano_diferencia--;
	  return $ano_diferencia;
	}

?>