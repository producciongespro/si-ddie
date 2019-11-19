<?php
//Inicia una nueva sesi��n o reanuda la existente 
    session_start(); 
//Destruye toda la informaci��n registrada de una sesi��n
    session_destroy(); 
	
//Redirecciona a la p��gina de login
    header('location: ../../../index.php'); 
?>