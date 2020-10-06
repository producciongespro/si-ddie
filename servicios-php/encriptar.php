<?php

	$clave = 'hola123*';

	function hashPassword($password)
	{
		$hash = password_hash($password, PASSWORD_DEFAULT);
		return $hash;
	}
	
	$hash= hashPassword($clave);
	echo $hash;	
	echo "</br>";
	echo password_verify($clave, $hash);
	
?>

