import React from "react";

export default function OpcionesFin(props) {
  let opciones = props.opciones;

  return (
    <>
    <option value="">Seleccione una opción</option>
      {opciones.map((opt) => (
      <option key={"opt" + opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.text}
      </option>
    ))}
    </>
  )
}