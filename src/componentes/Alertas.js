import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';

const mostrarAlerta = (props) => {
    return (  
        alert(props.titulo, props.mensaje)
    );
}

export default mostrarAlerta;

