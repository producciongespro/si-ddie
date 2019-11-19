<?php

	require 'funcs/conexion.php';
	require_once 'funcs/funcs.php';

	if(isset($_GET["id"]) AND isset($_GET['val']))
	{

		$idUsuario = $_GET['id'];
		$token = $_GET['val'];

		$mensaje = validaIdToken($idUsuario, $token);
	}
?>

<html>
	<head>
		<meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">

	    <link rel="stylesheet" href="../../../vendor/bootstrap-4.1.3/css/bootstrap.min.css">
	    <link rel="stylesheet" href="../../../css/default.css">

	    <script src="../../../vendor/jquery-3.3.1/jquery-3.3.1.min.js" charset="utf-8"></script>
			<script src="../../../vendor/bootstrap-4.1.3/js/bootstrap.min.js" charset="utf-8"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
	    <title>Registro</title>
	</head>

	<body>
		<div class="container">
      <div class="row" id="encForm">
         <div class="col-sm-6">
						<div class="card">
							<!-- <img class="card-img-top" src="../../../images/logo-tecnoaprender.png" alt="logo"> -->
							<div class="card-img-overlay">
								<h4 class="card-title"><?php echo $mensaje; ?></h4>
								<!-- <p class="card-text">Puede acceder al Sistema Tecnoaprender e ingresar sus credenciales</p>
								<a href="../../../index.php" class="btn btn-back">Ir al sistema</a> -->
							</div>
						</div>
					</div>
				</div>
  </div>
	</body>
</html>
