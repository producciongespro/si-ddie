import React, {Component} from 'react';

class Botones extends Component {
   
     render() { 
        var componenteActivo = this.props.activo.toLowerCase();

        console.log("props activo", componenteActivo);
        var componenteClase = '';
        if (componenteActivo === this.props.id.toLowerCase()) {
            componenteClase = "btn-main btn-lg btn-block btn disabled inactivo";
        }
        else {
            componenteClase = "btn-main btn-lg btn-block";
        }
    return ( 
        
        <React.Fragment>
            <button onClick = {this.props.handlerCargarVistas} id={this.props.id} className={componenteClase}>{this.props.etiqueta}</button>
        </React.Fragment>
    );
    }
}

export default Botones;