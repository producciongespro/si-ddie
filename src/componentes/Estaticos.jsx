import React from 'react';
import referenciasJSON from '../data/referencias.json';
const referencias = referenciasJSON[0];

export const Portada = (props) => {
    return ( 
        <div className="row">
            <div className="col-12 text-center animated jackInTheBox">
                <img className="log-inicial" src={referencias.img+"icono-logo.png"}  alt="imagen de portada"/>
            </div>
        </div>
     );
}



export const Inicio = ( props ) => { 
    
    return ( 
        <React.Fragment>

        <div className ="row" id="cont-niveles" >

            <div className="col-2"></div>

            <div className="col-2 col-niveles ">
                <img className="img-fluid img-niveles nivel-inicial animated"   data-nivel="inicial"   onClick={props.handlerMostrarCanciones}  src={referencias.img+"img-inicial.png"} alt="inicial"/>
            <p className="text-niveles">{props.texto}</p>
            </div>



            <div className="col-2 col-niveles">
                <img className="img-fluid img-niveles animated"   data-nivel="intermedio"   onClick={props.handlerMostrarCanciones}    src={referencias.img+"img-intermedio.png"} alt="intermedio"/>
            <p className="text-niveles">{props.texto}</p>
            </div>


            <div className="col-2 col-niveles">
            <img className="img-fluid img-niveles animated"  data-nivel="avanzado"   onClick={props.handlerMostrarCanciones} src={referencias.img+"img-avanzado.png"}  alt="avanzado"/>
            <p className="text-niveles">{props.texto}</p>
             </div>


            <div className="col-2 " id="experto-niveles">
            <img className="img-fluid img-niveles animated"  data-nivel="experto"   onClick={props.handlerMostrarCanciones} src={referencias.img+"img-experto.png"} alt="experto"/>
            <p className="text-niveles">{props.texto}</p>
            </div>
        
            <div className="col-2"></div>
 
        
        </div>
    
    
    </React.Fragment>
     );
}


export const Encabezado = (props) => {
    //Obtiene el objeto usuario para que se pueda usar su informción
        const usuario = JSON.parse(sessionStorage.getItem("usuario"));
        const imgAvatar = referencias.img + "avatar/" + usuario.avatar + ".png";
        console.log("usuario de encabezados", usuario.avatar );    
    
        return ( 
        <React.Fragment>
            <div className="row encabezado">
                    <div className="col-4">
                        <img className="img-fluid img-logo" src={referencias.img+"icono-logo.png"}  alt="logo flautaoke"/>
                    </div>

                    <div className="col-4 text-center">                        
                            <h4 className="pt-4 "> {props.nombreCancion}  </h4>                   
                    </div>                   
                  
                    <div  className="col-4 text-left">
                            <img   onClick={props.handlerMostrarModal} data-tipo="perfil"  className="logo-avatar img-fluid"  src={imgAvatar } alt="logo avatar"/>
                            <button className="btn btn-success" onClick={props.handlerMenuGeneral} >
                                    opciones
                            </button>
                    </div>
            </div>                
        </React.Fragment>
        );
}





export const Historia = (props) => {
    return ( 
        <React.Fragment>
        <h1>Historia</h1>
        <p>Esta es la  historia... </p>
        <p>{props.texto}  </p>
        </React.Fragment>
     );
}

export const Mantenimiento = (props) => {
    return ( 
        <React.Fragment>
        <h1>Mantenimiento</h1>        
        </React.Fragment>
     );

}

export const Tecnicas = (props) => {
    return ( 
        <React.Fragment>
        <h1>Técnicas</h1>
        
        </React.Fragment>
     );
}

export const Digitacion = (props) => {
    return ( 
        <React.Fragment>
        <h1>Digitación</h1>       
        
        </React.Fragment>
     );
}

export const Simbologia = (props) => {
    return ( 
        <React.Fragment>
        <h1>Simbología</h1>        
        </React.Fragment>
     );
}


export const AcercaDe = (props) => {
    return ( 
        <React.Fragment>
        <h1>Acerca de</h1>        
        ilustrador, aseosres de contenido, desarolladores
        </React.Fragment>
     );
}

export const Preguntas = (props) => {
    return ( 
        <React.Fragment>
        <h1>Preguntas</h1>        
        Aquí hay muchas pregutnas.....
        </React.Fragment>
     );
}

export const Ayuda = (props) => {
    return ( 
        <React.Fragment>
        <h1>Ayuda</h1>        
        Ayuda Ayuda Ayuda Ayuda  Ayuda <br/>
        Ayuda Ayuda Ayuda Ayuda  Ayuda <br/>
        Ayuda Ayuda Ayuda Ayuda  Ayuda <br/>
        </React.Fragment>
     );
}

export const Creditos = (props) => {
    return ( 
        <React.Fragment>
        <h1>Créditos</h1>        
        Muchos créditos
        </React.Fragment>
     );
}



export const Footer = ( ) => {
    return (
        <React.Fragment>
             <div className="row">
                     <div className="col-12 footer ">
                     <p> <strong>MEP-GESPRO</strong></p>
                     <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/cr/">
                     <img className="img-fluid icono-creative"  src={referencias.img+"logo-creative.png"}  alt="Logo creative"/></a>
                     </div>
                 </div> 

                 <div className="row">
                     <div className="col-12 icono-mep">
                     <img className="img-fluid" src={referencias.img+"logo-mep.png"}  alt="Logo mep"/>
                     </div>
                 </div>
        </React.Fragment>
    )
}




 
export default {Portada, Inicio, Historia, Mantenimiento, Tecnicas, Digitacion, Simbologia, AcercaDe, Preguntas, Ayuda, Creditos, Encabezado, Footer };