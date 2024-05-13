// MiApi.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MiApi.css"; // Importación de estilos
import Buscador from "./Buscador";

function IndicatorCard({ nombre, valor }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">Valor: {valor}</p>
      </div>
    </div>
  );
}

function App1() {
  const [indicadores, setIndicadores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    consultarApi();
  }, []);

  const consultarApi = async () => {
    const url = "https://mindicador.cl/api";
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Filtrar las claves no deseadas
      const filteredIndicadores = Object.keys(data).filter(
        (key) => key !== "version" && key !== "autor" && key !== "fecha"
      );
      // Crear un objeto solo con las claves deseadas
      const filteredData = filteredIndicadores.reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
      // Ordenar las claves alfabéticamente
      const sortedIndicadores = Object.keys(filteredData).sort();
      // Crear un objeto con las claves ordenadas
      const sortedData = sortedIndicadores.reduce((obj, key) => {
        obj[key] = filteredData[key];
        return obj;
      }, {});
      setIndicadores(sortedData);
    } catch (error) {
      console.error("Error al consultar la API:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="header">
        <h2>Indicadores Económicos</h2>
      </div>
      <div className="buscador">
        <Buscador handleSearch={handleSearch} />
      </div>

      <div className="card-container">
        {Object.keys(indicadores)
          .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
          .map((key) => (
            <IndicatorCard
              key={key}
              nombre={key}
              valor={indicadores[key].valor}
            />
          ))}
      </div>
    </>
  );
}

export default App1;
