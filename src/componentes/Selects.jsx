import React, { useState, useEffect } from "react";
 import { useForm } from "react-hook-form";

export default function Selects(props) {
  let ofi = props.inicio,

  return (
    <>
    <option value="">Seleccione una opción</option>
      {ofi.map((opt) => (
      <option key={"opt" + opt.value} value={opt.value} disabled={opt.disabled} >
        {opt.text}
      </option>
    ))}
    </>
  )
}