import React from 'react';

function GrupoCheck(props) {
    // console.log("************Props de Grupocheck Lista de poblaciones", props.listaPoblacion);
    // console.log("*********** Props de GrupoCheck data poblaciones", props.poblacion);
 
    
    var poblacion = JSON.parse(props.poblacion),
        listaPoblacion =  props.listaPoblacion;
    if(poblacion.length>0){
      for (let index = 0; index < listaPoblacion.length; index++) {
        for (let i = 0; i < poblacion.length; i++) {
          const elementP = poblacion[i].id;               
          if(listaPoblacion[index].id === elementP){
            listaPoblacion[index].valor = true;
            break;
          }
          else
          {
            listaPoblacion[index].valor = false;
          }
        }
      }      
    }
    else {
      for (let index = 0; index < listaPoblacion.length; index++) {
            listaPoblacion[index].valor = false;
          }
    }

  return (
    
    <div className="row my-2">
      <div className="col-12">
      {
        listaPoblacion.map((item, i) => (
          <div key={"poblacion"+i} className="pretty p-default">
             {
             (item.id==='12')
              ?
              (<>
              <input  
                      className="custom-control-input"
                      type="checkbox" 
                      id={(i+1)+"_checkbox"}
                      value={item.nombre}  
                      name={props.nombre} 
                      defaultChecked={item.valor}     
                      ref={props.registro}
                      onChange= {props.handleChange}
                    />    
                    <div className="state p-primary">
                    <label>{item.nombre}</label>
                  </div>
              </>)
              :
              (<>
              <input  
                      className="custom-control-input"
                      type="checkbox" 
                      id={(i+1)+"_checkbox"}
                      value={item.nombre}  
                      name={props.nombre} 
                      defaultChecked={item.valor}     
                      ref={props.registro}
                    />    
              <div className="state p-primary">
                <label>{item.nombre}</label>
              </div>
              </>)
            }
          </div>
        ))
    
      }
      </div>
    </div>

  )
};
export default GrupoCheck;