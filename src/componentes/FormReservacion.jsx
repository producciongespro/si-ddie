import Form from "./Form/Form";
// import controles from "./data/controles.json";
// import chekboxes from "./data/chekboxes.json";
// import estudianteForm from "./data/estudianteForm.json";
import inputs from "./Form/data/inputs-actualiza.json";

// var  registro{inicio:registro.inicio, fin:registro.fin, fecha: registro.fecha}

const getDataForm =  (data) => {
  console.log("Datos a enviar al servidor", data); 
};

/* 
-Tipos de imputs testeados:
 *input types: text, password, date, number, email,  range, url, file
 
 -Tipos de contorles admitidos:
  *control: input, textarea, select, chekbox
 */
{/* <FormReservacion registro= {registro} getDataForm={getDataForm} />        */}
const FormReservacion = (props) => {
  let valoresDefault = props.valoresDefault;
  return <Form getDataForm={getDataForm} array={inputs} valoresDefault= {valoresDefault}/>;
};

export default FormReservacion;