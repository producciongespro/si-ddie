<?php
	header("Content-type:text/html;charset=\"utf-8\"");
	require 'funcs/conexion.php';
	require_once 'funcs/funcs.php';

	if(empty($_GET['msj'])){
		$temp3 = "";
	} else {
		$temp3 = $_GET['msj'];
	}
	if(empty($_GET['id'])){
		header('Location: ../../../index.php');
	}
	if(empty($_GET['val'])){
		header('Location: ../../../index.php');
	}
	if(isset($_GET["id"]) AND isset($_GET['val']))
	{
		$user_id = $_GET['id'];
		$token = $_GET['val'];
		if(!verificaTokenPass($user_id, $token))
			{
				echo 'No se pudo verificar los Datos. Presione <a href="../../../index.php">clic aquí </a>para regresar.';
				exit;
			}
	}
	else {
		header('Location: ../../../index.php');
	}
?>

<html>
	<head>
		<title>Cambiar Contraseña</title>
		<link rel="stylesheet" href="../../../vendor/bootstrap-4.1.3/css/bootstrap.min.css" >
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
		<link rel="stylesheet" href="../../../css/default.css">

		<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js" charset="utf-8"></script>
  	<script src="../../../vendor/jquery-3.3.1/jquery-3.3.1.min.js" charset="utf-8"></script>
  	<script src="../../../vendor/bootstrap-4.1.3/js/bootstrap.min.js" charset="utf-8"></script>
	</head>

	<body>
		<!-- <div class="container"> -->
			<div class="row" id="encForm">
				<div class="col-sm-12">
					<div class="jumbotron jumbo-header">
						<h1>Cambiar contraseña</h1>
					</div>
				</div>
			</div>
		<!-- </div> -->
		<hr>
		<form id="loginform"  role="form" action="guarda_pass.php" method="POST" autocomplete="off">
			<input type="hidden" id="user_id" name="user_id" value ="<?php echo $user_id; ?>" />
			<input type="hidden" id="token" name="token" value ="<?php echo $token; ?>" />
			<div class="row">
				<div class="col-sm-12 form-group">
					<label class="let-larga" for="correo">Nueva contraseña:</label>
					<input type="password" class="form-control" name="password" placeholder="Password" required>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 form-group">
					<label class="let-larga" for="code">Confirmar contraseña:</label>
					<input type="password" class="form-control" name="con_password" placeholder="Confirmar Password" required>
				</div>
			 </div>
			 <div class="row">
	 			<div id="msjError" class="col-sm-12">
	 				 <p id="error"><?php echo $temp3 ?> </p> 
	 			</div>
	 		 </div>
			<hr>
			<button id="btn-login" type="submit" class="btn btn-md btn-blue btn-form" name="btnEnviar">Modificar</button>
		</form>
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
	</body>
</html>	
	