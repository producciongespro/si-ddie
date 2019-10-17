<?PHP
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        header("Content-Type: text/html; charset=utf-8");
    sleep(1);
     //Se invoca el archivo php que tiene las funciones de conexion y desconexion a la base de datos
     require 'conectar.php';

    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);
   
    //Se crea una variable en la que se guardarán los nombres de los campos
    $lista_campos = "";
    //Se crea arreglo para almacenar posibles errores
    $errors = array();
    //Se crea una variable en la que se guarda mensaje en caso se que sea exitosa la inserción
    $mjs = "";

//Creación de la primera parte de la consulta que inserta los valores en la tabla, la cual ingresa vía POST
$comando = "UPDATE ".$_GET['tabla_destino']." SET ";

foreach ($dataObject as $campo => $valor){
    //Se agrega un string con los nombres de los campos y valores de la tabla que se van a actualizar
     $lista_campos .= "`".$campo."`='".$valor."',"; 
}

$lista_campos = substr($lista_campos,0,-1);// Elimina la última coma

//Completa la consulta con los datos de los campos y la evaluación del id
$comando .= $lista_campos." WHERE `id`=".$_GET['id']."";

//Se carga en una variable la conexión a la base de datos

$mysqli = conectarDB();
mysqli_set_charset($mysqli, "utf8"); //formato de datos utf8

//Se ejecuta la consulta usando la conexión y el comando creado
$actualizacion = mysqli_query($mysqli,$comando) or die ("Problemas al actualizar registro".mysqli_error($mysqli));
//Se evalúa la actualización se realizó
    if($actualizacion)
    {
        $msj = "Actualización realizada correctamente";
        echo json_encode(array('error'=>false, 'mensaje'=>$msj ));
        mysqli_close($mysqli);
    } else {
        //Se guarda un mensaje de error en el array de los errores
        $errors[] = "Error al actualizar";
        //Se devuelve mensaje al cliente indicando que no fue exitoso el registro
        echo json_encode(array('error'=>true, 'mensaje'=>$errors ));
       
    } 
?>