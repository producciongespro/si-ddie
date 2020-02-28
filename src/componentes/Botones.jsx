import React, {Component} from 'react';

class Botones extends Component {
   
     render() { 
    return ( 
        
        <React.Fragment>
            <button onClick = {this.props.handlerCargarVistas} id={this.props.id} className="btn-main btn-lg btn-block">{this.props.etiqueta}</button>
        </React.Fragment>
    );
    }
}

export default Botones;