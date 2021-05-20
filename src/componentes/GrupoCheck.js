import React from 'react';

function GrupoCheck(props) {
  // console.log("************Props de Grupocheck Lista de poblaciones", props.listaPoblacion);
  // console.log("*********** Props de GrupoCheck data poblaciones", props.poblacion);


  var poblacion = JSON.parse(props.poblacion),
    listaPoblacion = props.listaPoblacion,
    handleGetCheck = props.handleGetCheck;
  if (poblacion) {
    if (poblacion.length > 0) {
      for (let index = 0; index < listaPoblacion.length; index++) {
        for (let i = 0; i < poblacion.length; i++) {
          const elementP = poblacion[i].id;
          if (listaPoblacion[index].id === elementP) {
            listaPoblacion[index].valor = true;
            break;
          }
          else {
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
            <div className="custom-control custom-checkbox" key={"chk" + i} >
              <div className="pretty p-switch p-fill p-smooth">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={item.id}
                  name={props.nombre}
                  defaultChecked={item.valor}
                  onClick={handleGetCheck}
                />
                <div className="state p-success">
                  <label className="custom-control-label"> {item.nombre} </label>
                </div>
              </div>
            </div>
          ))

        }
      </div>
    </div>

  )
};

export default GrupoCheck;