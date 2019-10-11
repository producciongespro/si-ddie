import React from 'react';
import alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.min.css";


const Alerta = (props) => {
    render() { 
        return (  
            <React.Fragment>
                alertify.alert("This is an alert dialog."+props.error, function(){
                alertify.message('OK');
                });
            </React.Fragment>    
        );
    }
};

export default Alerta;
