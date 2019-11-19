<?php
require 'funcs/conexion.php';
require_once 'funcs/funcs.php';

$user_id = $mysqli->real_escape_string($_POST['user_id']);
$token = $mysqli->real_escape_string($_POST['token']);
$password = $mysqli->real_escape_string($_POST['password']);
$con_password = $mysqli->real_escape_string($_POST['con_password']);

if(!validaPassword($password, $con_password)) {
  $id2 = $user_id;
  $val2 = $token;
  $msj = "Contraseñas no coinciden!!!";
  $url = "cambia_pass.php?id=$id2&val=$val2&msj=$msj";
  header("Location: ".$url);
}
?>
<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="utf-8">

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="../../../vendor/bootstrap-4.1.3/css/bootstrap.min.css">
  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.5.0/css/all.css' integrity='sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU' crossorigin='anonymous'>
	<!-- <link rel="stylesheet" href="../vendor/alertify/css/alertify.min.css">
	<link rel="stylesheet" href="../vendor/alertify/css/themes/default.css"> -->
  <link rel="stylesheet" href="../../../css/default.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js" charset="utf-8"></script>
  <script src="../../../vendor/jquery-3.3.1/jquery-3.3.1.min.js" charset="utf-8"></script>
  <script src="../../../vendor/bootstrap-4.1.3/js/bootstrap.min.js" charset="utf-8"></script>
	<!-- <script src="../vendor/alertify/alertify.min.js"></script> -->
  <title>Guardar password</title>
</head>
  <body>

	<?php

		if(validaPassword($password, $con_password))
		{

			$pass_hash = hashPassword($password);

			if(cambiaPassword($pass_hash, $user_id, $token))
			{
	?>
				<div class="container">
					<div class="row" id="encForm">
						<div class="col-sm-12">
							<div class="jumbotron jumbo-header">
								<h1>SI-DDIE</h1>
							</div>
						</div>
					</div>
					<hr>
					<div class="row">
						<div class="col-sm-12">
							<!-- <h4>Para ingresar al sistema, presione clic en el botón. <a href='../../../index.php'><button id="btn-inicio" type="button" class="btn btn-md btn-blue btn-form"><i class="fas fa-sign-in-alt"></i> Ingreso</button></a></h4> -->
							<h4>La contraseña ha sido modificada!</h4>
							
						</div>
					</div>
					<hr>
					<div class="row">
						<div class="container col-sm-12">
							<footer class="py-3 bg-footer">
								<div class="col-sm-12 text-right col-sm-offset-1 jumbotron jumbo-header">
									<!-- <span class="creditos-footer" id="text-footer">©2019 Ministerio de Educacion Pública de Costa Rica. Todos los derechos reservados<br>Desarrollado por DRTE-GESPRO</span> -->
								</div>
							</footer>
						</div>
					</div>
					<!-- Footer -->
				</div>

	<?php
			} else {
	?>
		<div class="container">
			<div class="row" id="encForm">
				<div class="col-sm-12">
					<div class="jumbotron jumbo-header">
						<div class="d-flex flex-row">
							<div class="p-2 border-logo">
								<img class ="logo-mep" src="../img/logo-mep.png" alt="logo del mep">
							</div>
							<div class="p-2 align-self-center">
								<span class="tit-header-opt">Contraseña</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr>
			<div class="row">
				<div class="col-sm-12">
					<p>Error al modificar la contraseña, por favor contactar con el administrador.</p>
					 <a href='../../../index.php'><button id="btn-inicio" type="button" class="btn btn-md btn-blue btn-form"><i class="fas fa-sign-in-alt"></i> Ingreso</button></a>
				</div>
			</div>
			<hr>
			<footer class="py-3 bg-footer">
				<div class="container col-sm-12">
					<div class="row">
						<div class="col-sm-12 text-right col-sm-offset-1 jumbotron jumbo-header">
							<span class="creditos-footer" id="text-footer">©2019 Ministerio de Educacion Pública de Costa Rica. Todos los derechos reservados<br>Desarrollado por DRTE-GESPRO</span>
						</div>
					</div>
				</div>
			</footer> <!-- Footer -->
		</div>
<?php	}
	}
?>
</body>
</html>