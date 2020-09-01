import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
// import {faPlus,faEye,faCaretDown} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Tabla(props) {
let indice = props.currentPage*10-10;
    return (
        <table id="tblVer" className={props.clase}>
            <thead>
                <tr>
                    <th  scope="col">#</th>
                    <th  scope="col">{props.contenidos[0].nombre}</th>
                    <th  scope="col">{props.contenidos[1].nombre}</th>                                                 
                    <th  scope="col">{props.contenidos[2].nombre}</th>  
                    <th  scope="col">{props.contenidos[3].nombre}</th>  
                    <th  scope="col">{props.contenidos[4].nombre}</th>  
                </tr>
            </thead>
            <tbody>
                {
                    props.array !== null &&
                    (
                        props.array.map((item, i) => (
                            <tr key={"item" + i}>
                                 <th scope="row">{((i + 1+ indice)) }</th>
                                {/* <th scope="row">{item[props.contenidos[0].campo]}</th>  */}
                                <td  >{ moment.utc(item[props.contenidos[0].campo]).format('L')}</td>
                                <td  >{item[props.contenidos[1].campo]}</td>
                                <td  >{item[props.contenidos[2].campo]}</td>
                                <td  >{item[props.contenidos[3].campo]}</td>
                                <td  >{item[props.contenidos[4].campo]}</td>
                            </tr>
                        ))
                    )
                }

            </tbody>
        </table>
        )
}
export default Tabla;