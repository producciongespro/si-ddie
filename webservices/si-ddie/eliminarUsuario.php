        <?php


        $servidor = "localhost";
        $usuario = "prueba_gespro";
        $password = "Hola123Gespro";
        $bd = "prueba_ddie";
				    $mysqli = new mysqli($servidor, $usuario, $password,$bd);
                if (mysqli_connect_errno()) {
                        printf("Fall車 la conexi車n: %s\n", mysqli_connect_error());
                        exit();
                    }
            else{

                $usuarioBD = $_POST["name"];
                echo "Codigo cliqueado".$codigo;
                $sentencia = $mysqli->prepare("DELETE FROM usuarios WHERE usuario=$usuarioBD");
                $sentencia->execute();
            }
        ?>
