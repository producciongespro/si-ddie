<?php
	session_start();
	require 'funcs/conexion.php';
  require_once 'funcs/funcs.php';
  
	session_start();
	if(!isset($_SESSION["id_usuario"])){ //Si no ha iniciado sesi車n redirecciona a index.php
		header("Location: index.php");
	}
	$nombreUsuario = $_SESSION['nombre'];
	$idUsuario = $_SESSION['id_usuario'];

	$sql = "SELECT id, nombre FROM usuarios WHERE id = '$idUsuario'";
	$result = $mysqli->query($sql);
	
	$row = $result->fetch_assoc();
    if($_SESSION['tipo_usuario']==1) { 
    ?>
 <html>
	<head><meta http-equiv="Content-Type" content="text/html; charset=gb18030">
		<title>Mantenimiento de Usuarios</title>
		  
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		
		<style>
			body {
			padding-top: 20px;
			padding-bottom: 20px;
			}
		</style>
	</head>
	<script>
	var recToDel = this.id;
	console.log (recToDel);
	   var formData = new FormData();
        formData.append("codigo", recToDel);   
        $.ajax({
            url: 'eliminarUsuario.php',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function(){
               console.log("En proceso");   
            }, success: function(data){
                console.log("Eliminado");   
            }, error: function(){
                console.log("problema...");   
            }
        });
        
        function confirmar(registroAborrar){
            $('#myModal').modal('show');
            var usuarioAborrar = registroAborrar;
            console.log (registroAborrar);
        }
        </script>
  <body>
	<div class="container">
			<nav class='navbar navbar-default'>
				<div class='container-fluid'>
					<div class='navbar-header'>
						<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
							<span class='sr-only'>Men&uacute;</span>
							<span class='icon-bar'></span>
							<span class='icon-bar'></span>
							<span class='icon-bar'></span>
						</button>
					</div>
					
					<div id='navbar' class='navbar-collapse collapse'>
    						<ul class='nav navbar-nav'>
    							<li class='active'><a href='welcome.php'>Inicio</a></li>			
    						</ul>
    						
    						<?php if($_SESSION['tipo_usuario']==1) { ?>
    							<ul class='nav navbar-nav'>
    								<li><a href='mantenimientoUsuarios.php'>Administrar Usuarios</a></li>
    							</ul>
    						<?php } ?>
    						<?php if($_SESSION['tipo_usuario']==2) { ?>
    							<ul class='nav navbar-nav'>
    								<li><a href='../publicar/'>Subir Recursos</a></li>
    							</ul>
    							<ul class='nav navbar-nav'>
    								<li><a href='../ver_registros.php'>Ver/editar Recursos</a></li>
    							</ul>
    														<ul class='nav navbar-nav'>
    								<li><a href='#'>Agregar enlaces</a></li>
    							</ul>
    						<?php } ?>
    						<?php if($_SESSION['tipo_usuario']==3) { ?>
    	                        <ul class='nav navbar-nav'>
    		                        <li><a href='../ver_registros.php'>Descargar Recursos</a></li>
                            	</ul>
                            	<ul class='nav navbar-nav'>
    		                        <li><a href='../videos.php'>Galer��a de V��deos</a></li>
                            	</ul>
                            	<ul class='nav navbar-nav'>
    		                        <li><a href='../ver_registros.php'>Galer��a de audios</a></li>
                            	</ul>
                            	<ul class='nav navbar-nav'>
    		                        <li><a href='#'>Enlaces recomendados</a></li>
                            	</ul>
                                <ul class='nav navbar-nav'>
                                    <li><a href='#'>Compartir recurso</a></li>
                	            </ul>
                                <ul class='nav navbar-nav'>
                                    <li><a href='#'>Contacto</a></li>
                	            </ul>
                            <?php } ?>
    						<div style= 'text-align: right;' > <?php echo 'Hola '.utf8_decode($row['nombre']); ?><br> <a href='logout.php'>Cerrar Sesi&oacute;n</a></div>
            </div>
    	</div>
    </nav>	
			
    <div class="jumbotron jumbotron-header">
        
      <h2>Mantenimiento de usuarios</h2>
              
    </div>
     <!-- Modal -->

      <div class="row">
            <div class="col-sm-10" id="usuariosRegistrados" >
      <table class="table table-hover">
          <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol</th>
        </tr>
          </thead>
          <tbody>
        <?php
            $resultado = "SELECT * FROM usuarios ORDER BY id DESC" ;
            $resUsuarios = $mysqli -> query($resultado);
            while ($registroUsuarios = $resUsuarios->fetch_array(MYSQLI_BOTH)){

                 echo '<tr>
                  <td>'.$registroUsuarios['usuario'].'</td>
                  <td>'.$registroUsuarios['nombre'].'</td>
                  <td>'.$registroUsuarios['correo'].'</td>';
                    if ($registroUsuarios['id_tipo']==1) {$tipo="Administrador";}
                     elseif ($registroUsuarios['id_tipo']==2) {$tipo="Asesor";}
                            else {$tipo="Profesor";}
                 echo '<td>'.$tipo.'</td> <td>';
                 if ($registroUsuarios['id_tipo']!=1) {echo '<a href=#>Cambiar rol</a>';}
                 echo '</td><td>';
                 if ($registroUsuarios['id_tipo']!=1) {echo '<button type="button" id='.$registroUsuarios['usuario'].' class="btn btn-info btn-sm" data-toggle="modal" onClick=confirmar('.$registroUsuarios['usuario'].')>Eliminar</button>';}
                 echo '</td> </tr>';
          }
        ?>
        </tbody>
       </table>
    </div>
   </div>


        <!-- Modal -->
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
        
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Eliminar usuario</h4>
              </div>
              <div class="modal-body">
                <p>�0�7Est�� seguro que desea eliminar al usuario?</p>
              </div>
              <div class="modal-footer">
                 <form action="" method="POST" role="form" class="form-horizontal"> 
                    <button id='' type="submit" class="btn btn-default">SI</button>
                </form>
                <button  type="button" class="btn btn-default" data-dismiss="modal">NO</button>
              </div>
            </div>
        
          </div>
        </div>
    
  </div>
  </body>
</html>
    
    
 <?php       
    }
    else{
        header("Location: login/index.php");
        }
?>