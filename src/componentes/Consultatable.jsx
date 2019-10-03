import React from 'react';


class Consultatable extends React.Component {
    constructor() {
        super();
    }

    render () {
        // <select sefaultValue={'DEFAULT'}  className="form-control"  name="consultas">              
        // <option  disabled value="DEFAULT">Seleccione la opción</option>
        let datosConsulta = this.props.estado;
        let optionItems = datosConsulta.map((item) => {
                if (item.id == 23) {
                return <option  selected key={item.id} value={item.id}>{item.id} - {item.tema}   </option> 
            }
                 return <option key={item.id} value={item.id}>{item.id} - {item.tema}   </option>;
          });

         return (
         <div>
             <select>
                <option disabled value="0">Seleccione la opción</option>
                {optionItems}
             </select>
         </div>
        )
   }
}

export default Consultatable;