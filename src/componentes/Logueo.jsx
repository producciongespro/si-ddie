import React from 'react';
import Ingreso from './Ingreso';
import Slider from './Slider/Slider';
import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];


var user, password;

const getUser = (e) => {
    user = e.target.value;
    //console.log(user);
}
const getPassword = (e) => {
    password = e.target.value;
    //console.log(password);
}


const Logueo = (props) => {

    //Limpia las variables:
    user = "";
    password = "";
    const j = props.mostrarModal("ingreso");

    return (
        <React.Fragment>
           {j}
           {/* <button className="btn btn-warning btn-block " onClick={props.mostrarModal} data-tipo="registro" > Registro </button> */}

            {/* <div className="row posit_img_portada ">
                <Slider referencias={referencias} />
            </div>




            <div className="row">
                <div className="col-12 pie_portada">
                    <p> <strong>MEP-GESPRO</strong></p>
                    <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/cr/">
                        <img className="img-fluid icono-creative" src={referencias.img + "logo-creative.png"} alt="Logo creative" /></a>
                </div>
            </div> */}


        </React.Fragment>
    );
}

export default Logueo;