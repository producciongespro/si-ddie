import React, {useContext, Fragment} from 'react';
import MyContext from '../modulos/MyContext';

const Logueo = () => {
            // var correo = "margarita.salazar.vindas@mep.go.cr";
            var nuevosDatos = {
                correo: "margarita.salazar.vindas@mep.go.cr",
                idUsuario: "10",
                tipoUsuario: "jefe"};

        const { usuario, setUsuario } = useContext(MyContext);
        console.log("usuario LOGUEO", usuario);
        console.log("usuario nuevo", nuevosDatos);
        
        
        return (
            <Fragment>
                <button onClick={() => setUsuario(nuevosDatos)}>
                    Cambiar el usuario (Current: {usuario['correo']})
                </button>
            </Fragment>
        );
}

export default Logueo;

// import React, { useContext } from "react";

// import LanguageContext from "./language-context";

// const LanguageSwitcher = () => {
//   const { language, setLanguage } = useContext(LanguageContext);
//   return (
//     <button onClick={() => setLanguage("jp")}>
//       Switch Language (Current: {language})
//     </button>
//   );
// };

// export default LanguageSwitcher;