import React, { useState, useEffect } from "react";
import "../style/TableSearch.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dfa, setDfa] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/data")
      .then((response) => response.json())
      .then((data) => setData(data.datas)) // Accede a la propiedad 'datas' del objeto de respuesta
      .catch((error) => console.error("Error:", error));
  }, []);

  {
    /* Automata que hace el metodo de busqueda y valida cada caracter sin librería */
  }

  function createDFA(searchTerm) {
    // La función createDFA crea un autómata finito determinista (DFA) para el término de búsqueda
    const states = Array.from({ length: searchTerm.length + 1 }, () => ({})); // Crea un array de objetos vacíos, uno para cada estado en el DFA
    states[0][searchTerm[0]] = 1; // El primer estado transita al segundo estado en el primer carácter del término de búsqueda
    for (let i = 1, lps = 0; i <= searchTerm.length; i++) {
      // Para cada carácter en el término de búsqueda
      for (const char of Object.keys(states[0])) {
        // Copia las transiciones desde el estado del sufijo prefijo más largo (lps)
        states[i][char] = states[lps][char];
      }
      if (i < searchTerm.length) {
        // Si no estamos en el último carácter del término de búsqueda
        states[i][searchTerm[i]] = i + 1; // El estado actual transita al siguiente estado en el carácter actual del término de búsqueda
        if (searchTerm[i] === searchTerm[lps]) {
          // Si el carácter actual del término de búsqueda es el mismo que el carácter en el índice lps
          lps++; // Incrementa el índice lps
        }
      }
    }
    return states; // Devuelve el DFA
  }

  function searchWithDFA(dfa, text) {
    // La función searchWithDFA usa el DFA para buscar el término de búsqueda en un texto dado
    let state = 0; // Comienza en el primer estado del DFA
    for (const char of text) {
      // Para cada carácter en el texto
      state = dfa[state][char] || 0; // Transita al siguiente estado basado en el carácter actual, o va al primer estado si no hay transición
      if (state === dfa.length - 1) {
        // Si estamos en el último estado del DFA, se ha encontrado el término de búsqueda
        return true;
      }
    }
    return false; // El término de búsqueda no se encontró en el texto
  }

  useEffect(() => {
    // Cuando el término de búsqueda cambia, crea un nuevo DFA para el término de búsqueda
    setDfa(createDFA(searchTerm.toLowerCase()));
  }, [searchTerm]);
  // Filtra los datos basándose en si el término de búsqueda se encuentra en los campos 'NOMBRE_DEL_ALUMNO', 'MATRICULA', o 'TIPO_DE_BUSQUEDA'
  
  
const filteredData = dfa
    ? data.filter(
            (item) =>
                (item["Clave cliente"] &&
                    searchWithDFA(
                        dfa,
                        item["Clave cliente"].toString().toLowerCase()
                    )) ||
                (typeof item["   Nombre Contacto "] === 'string' &&
                    searchWithDFA(dfa, item["   Nombre Contacto "].toLowerCase())) ||
                (typeof item["Correo "] === 'string' && searchWithDFA(dfa, item["Correo "].toLowerCase())) ||
                (item["Teléfono Contacto  "] &&
                    searchWithDFA(dfa, item["Teléfono Contacto  "].toString().toLowerCase()))
        )
    : data;


  {
    /* Metodo de busqueda y ordenación con métodos de JS */
  }

  {
    /*const filteredData = data.filter(item => 
        item.NOMBRE_DEL_ALUMNO.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.MATRICULA.toString().includes(searchTerm) ||
        item.TIPO_DE_BUSQUEDA.toLowerCase().includes(searchTerm.toLowerCase())
    );*/
  }
  return (
    <>
      <div className="contenedor">
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>
        <table className="data-table" style={{ color: 'white' }}>
          <thead>
            <tr>
              <th>CLAVE CLIENTE</th>
              <th>NOMBRE DE CONTACTO</th>
              <th>CORREO</th>
              <th>TELEFONO CONTACTO</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item["Clave cliente"]}</td>
                <td className="nombre-contacto">{item["   Nombre Contacto "]}</td>
                <td className="correo">{item["Correo "]}</td>
                <td className="telefono">{item["Teléfono Contacto  "]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
