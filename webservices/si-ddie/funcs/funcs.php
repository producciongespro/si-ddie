<?php

	// function isNull($nombre, $pass, $pass_con, $email){
	// 	if(strlen(trim($nombre)) < 1 || strlen(trim($pass)) < 1 || strlen(trim($pass_con)) < 1 || strlen(trim($email)) < 1)
	// 	{
	// 		return true;
	// 		} else {
	// 		return false;
	// 	}
	// }

	function isEmail($email)
	{
		if (filter_var($email, FILTER_VALIDATE_EMAIL)){
			return true;
			} else {
			return false;
		}
	}


	function isMepEmail ($email)
	{
		$cadena_de_texto = $email;
		$cadena_buscada   = 'mep.go.cr';
		$posicion_coincidencia = strpos($cadena_de_texto, $cadena_buscada);
		return $posicion_coincidencia;
	}

	function validaPassword($var1, $var2)
	{
		if (strcmp($var1, $var2) !== 0){
			return false;
			} else {
			return true;
		}
	}

	function minMax($min, $max, $valor){
		if(strlen(trim($valor)) < $min)
		{
			return true;
		}
		else if(strlen(trim($valor)) > $max)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function usuarioExiste($usuario)
	{
		global $mysqli;
        echo "$usuario";
		$stmt = $mysqli->prepare("SELECT id FROM usuarios WHERE usuario = ? LIMIT 1");
		$stmt->bind_param("s", $usuario);
		$stmt->execute();
		$stmt->store_result();
		$num = $stmt->num_rows;
		$stmt->close();

		if ($num > 0){
		    echo "usuario no válido";
			return true;
			} else {
			     echo "usuario válido";
			return false;
		}
	}

	function emailExiste($email)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT id FROM usuarios WHERE correo = ? LIMIT 1");
		$stmt->bind_param("s", $email);
		$stmt->execute();
		$stmt->store_result();
		$num = $stmt->num_rows;
		$stmt->close();

		if ($num > 0){
			return true;
			} else {
			return false;
		}
	}

	function generateToken()
	{
		$gen = md5(uniqid(mt_rand(), false));
		return $gen;
	}

	function hashPassword($password)
	{
		$hash = password_hash($password, PASSWORD_DEFAULT);
		return $hash;
	}

	function resultBlock($errors){
		if(count($errors) > 0)
		{
			echo "<div id='error' >

			<ul>";
			foreach($errors as $error)
			{
				echo "<li>".$error."</li>";
			}
			echo "</ul>";
			echo "</div>";
		}
	}

	// function registraUsuario($pass_hash, $nombre, $email, $cedula, $id_tipo, $sexo, $telefono_movil, $telefono_fijo, $estado_nombramiento, $circuito, $especialidad, $id_CE, $activo, $token){
		function registraUsuario($pass_hash, $nombre, $apellido1, $apellido2, $usuario, $tipoUsuario, $activo, $token){
		global $mysqli;

		$stmt = $mysqli->prepare("INSERT INTO usuarios (password, nombre, apellido1, apellido2, correo, tipoUsuario, activacion, token) VALUES(?,?,?,?,?,?,?,?)");
		$stmt->bind_param('ssssssis', $pass_hash, $nombre, $apellido1, $apellido2, $usuario, $tipoUsuario, $activo, $token);
		if ($stmt->execute()){
			return $mysqli->insert_id;
			} else {
			return 0;
		}
	}

	// function enviarCorreo($email, $asunto, $cuerpo, $headers){
	function enviarCorreo($email, $asunto, $cuerpo){
		// $email_origen = "usuariogespro@gmail.com";
		$nombre_origen = "Sistema de Usuarios";
         $headers  = "From: $nombre_origen \r\n";
        //  $headers .= "Return-Path: <$email_origen> \r\n";
        // $headers .= "Reply-To: $email_origen \r\n";
        
        
        //  $headers .= "X-Sender: $email_origen \r\n";
        
        $headers .= "X-Priority: 3 \r\n";
        $headers .= "MIME-Version: 1.0 \r\n";
        $headers .= "Content-Transfer-Encoding: 7bit \r\n";
        
        //*****************************************************************//
         $formato= "html";
        if($formato == "html")
         { $headers .= "Content-Type: text/html; charset=iso-8859-1 \r\n";  }
           else
            { $headers .= "Content-Type: text/plain; charset=iso-8859-1 \r\n";  } 
        $cuerpo =utf8_decode($cuerpo);
            if(@mail($email, $asunto, $cuerpo, $headers))
                return true;
            else
                return false;
        
  }


	function enviarEmail($email, $nombre, $asunto, $cuerpo){

		require_once '../login/PHPMailer/PHPMailerAutoload.php';

		$mail = new PHPMailer();
		$mail->isSMTP();
		$mail->SMTPAuth = true;
    	$mail->SMTPSecure = 'tls';
    	$mail->Host = 'smtp.gmail.com';
    	$mail->Port = 587;

		$mail->Username = 'usuariogespro@gmail.com';
		$mail->Password = 'gesprohola456*';

		$mail->setFrom('usuariogespro@gmail.com', 'Sistema de Usuarios');
		$mail->addAddress($email, $nombre);

		$mail->Subject = $asunto;
		$mail->Body    = $cuerpo;
		$mail->IsHTML(true);

		if($mail->send())
		return true;
		else
		return false;
	}

	function validaIdToken($id, $token){
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT activacion FROM usuarios WHERE id = ? AND token = ? LIMIT 1");
		$stmt->bind_param("is", $id, $token);
		$stmt->execute();
		$stmt->store_result();
		$rows = $stmt->num_rows;

		if($rows > 0) {
			$stmt->bind_result($activacion);
			$stmt->fetch();

			if($activacion == 1){
				$msg = "La cuenta ya se activó anteriormente.";
				} else {
				if(activarUsuario($id)){
					$msg = 'Cuenta activada.';
					} else {
					$msg = 'Error al Activar Cuenta';
				}
			}
			} else {
			$msg = 'No existe el registro para activar.';
		}
		return $msg;
	}

	function activarUsuario($id)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("UPDATE usuarios SET activacion=1 WHERE id = ?");
		$stmt->bind_param('s', $id);
		$result = $stmt->execute();
		$stmt->close();
		return $result;
	}

	function isNullLogin($usuario, $password){
		if(strlen(trim($usuario)) < 1 || strlen(trim($password)) < 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function login($usuario, $password)
	{
		global $mysqli;
        $errors = array();
		$stmt = $mysqli->prepare("SELECT id, id_tipo, password, correo, id_CE FROM usuarios WHERE  correo = ? LIMIT 1");
		$stmt->bind_param("s", $usuario);
		$stmt->execute();
		$stmt->store_result();
		$rows = $stmt->num_rows;

		if($rows > 0) {

			if(isActivo($usuario)){

				$stmt->bind_result($id, $id_tipo, $passwd, $correo_u, $id_CE);
				$stmt->fetch();

				$validaPassw = password_verify($password, $passwd);

				if($validaPassw){

					lastSession($id);
					$_SESSION['usuario'] = $id;
					$_SESSION['tipo_usuario'] = $id_tipo;
					$_SESSION['correo_usuario'] = $correo_u;
					$_SESSION['id_CE'] = $id_CE;
					// header("location: index.html");
					} else {

					$errors = "La contraseña es incorrecta";
				}
				} else {
				$errors = 'El usuario no esta activo';
			}
			} else {
			$errors = "El correo electr&oacute;nico no existe";
		}
		return $errors;
	}

	function getTipo($id){
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT id_tipo FROM usuarios WHERE correo = ? LIMIT 1");
		$stmt->bind_param("s", $id);
		$stmt->execute();
		$stmt->store_result();
		$rows = $stmt->num_rows;

		if($rows > 0) {
			$stmt->bind_result($tipoUsuario);
			$stmt->fetch();
      return $tipoUsuario;
			// if($tipoUsuario == 'admin'){
			// 	return 0;
			// 	} else {
			// 	return 1;
			// 	}
		}
		// return $msg;
	}

	function lastSession($id)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("UPDATE usuarios SET last_session=NOW(), token_password='', password_request=1 WHERE id = ?");
		$stmt->bind_param('s', $id);
		$stmt->execute();
		$stmt->close();
	}

	function isActivo($usuario)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT activacion FROM usuarios WHERE correo = ? LIMIT 1");
		$stmt->bind_param('s', $usuario);
		$stmt->execute();
		$stmt->bind_result($activacion);
		$stmt->fetch();

		if ($activacion == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function generaTokenPass($user_id)
	{
		global $mysqli;

		$token = generateToken();

		$stmt = $mysqli->prepare("UPDATE usuarios SET token_password=?, password_request=1 WHERE id = ?");
		$stmt->bind_param('ss', $token, $user_id);
		$stmt->execute();
		$stmt->close();

		return $token;
	}

	function getValor($campo, $campoWhere, $valor)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT $campo FROM usuarios WHERE $campoWhere = ? LIMIT 1");
		$stmt->bind_param('s', $valor);
		$stmt->execute();
		$stmt->store_result();
		$num = $stmt->num_rows;

		if ($num > 0)
		{
			$stmt->bind_result($_campo);
			$stmt->fetch();
			return $_campo;
		}
		else
		{
			return null;
		}
	}

	function getPasswordRequest($id)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT password_request FROM usuarios WHERE id = ?");
		$stmt->bind_param('i', $id);
		$stmt->execute();
		$stmt->bind_result($_id);
		$stmt->fetch();

		if ($_id == 1)
		{
			return true;
		}
		else
		{
			return null;
		}
	}

	function verificaTokenPass($user_id, $token){

		global $mysqli;

		$stmt = $mysqli->prepare("SELECT activacion FROM usuarios WHERE id = ? AND token_password = ? AND password_request = 1 LIMIT 1");
		$stmt->bind_param('is', $user_id, $token);
		$stmt->execute();
		$stmt->store_result();
		$num = $stmt->num_rows;

		if ($num > 0)
		{
			$stmt->bind_result($activacion);
			$stmt->fetch();
			if($activacion == 1)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	function cambiaPassword($password, $user_id, $token){

		global $mysqli;

		$stmt = $mysqli->prepare("UPDATE usuarios SET password = ?, token_password='', password_request=0 WHERE id = ? AND token_password = ?");
		$stmt->bind_param('sis', $password, $user_id, $token);

		if($stmt->execute()){
			return true;
			} else {
			return false;
		}
	}
