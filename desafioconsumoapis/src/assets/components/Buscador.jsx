// Buscador.jsx
import React from "react";

const Buscador = ({ handleSearch }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Buscar indicador económico"
        onChange={handleSearch}
        className="inputsearch"
      />
    </div>
  );
};

export default Buscador;
