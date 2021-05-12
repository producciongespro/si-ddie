import React, { useState, useEffect } from "react";

export default function OpcionesFin(props) {
  let ofi = props.inicio;

  return (
    <>
    <option value="">Seleccione una opción</option>
      {ofi.map((opt) => (
      <option key={"opt" + opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.text}
      </option>
    ))}
    </>
  )
}