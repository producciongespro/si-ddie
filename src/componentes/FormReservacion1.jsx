import Form from "./Form/Form";
// import controles from "./data/controles.json";
// import chekboxes from "./data/chekboxes.json";
// import estudianteForm from "./data/estudianteForm.json";
// import inputs from "./Form/data/inputs-actualiza1.json";
import inputs from "./Form/data/inputs-actualiza.json";

// var  registro{inicio:registro.inicio, fin:registro.fin, fecha: registro.fecha}

const getDataForm = (data) => {
  console.log("Datos a enviar al servidor", data);
};

var arrayInputs = [];
/* 
-Tipos de imputs testeados:
 *input types: text, password, date, number, email,  range, url, file
 
 -Tipos de contorles admitidos:
  *control: input, textarea, select, chekbox
 */
{/* <FormReservacion registro= {registro} getDataForm={getDataForm} />        */ }
const FormReservacion = (props) => {
  let selectInicio = props.selectInicio,
      selectFin = props.selectFin,
      valoresDefault = props.valoresDefault;
  
      arrayInputs = inputs;
      arrayInputs[1].opts = selectInicio;
      arrayInputs[2].opts = selectFin;

    
    
  return <Form getDataForm={getDataForm} array={arrayInputs} valoresDefault={valoresDefault} />  
};

export default FormReservacion;