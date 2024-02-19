import React, { useState, useEffect } from 'react';
import "../style/TableSearch.css";

export default function App() {

    const [searchTerm, setSearchTerm] = useState('');
    const [dfa, setDfa] = useState(null);

    const data = [
        { MATRICULA: 203452, NOMBRE_DEL_ALUMNO: 'Aguilar Pérez Héctor Uriel', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 221187, NOMBRE_DEL_ALUMNO: 'Arredondo Juárez Jorge Alexis', TIPO_DE_BUSQUEDA: 'correo' },
        { MATRICULA: 221188, NOMBRE_DEL_ALUMNO: 'Barriga Aguilar Carlos Enrique', TIPO_DE_BUSQUEDA: 'telefono contacto' },
        { MATRICULA: 203460, NOMBRE_DEL_ALUMNO: 'Ceja Sanchez Omar', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 213452, NOMBRE_DEL_ALUMNO: 'Cruz Aguilar Yael', TIPO_DE_BUSQUEDA: 'correo' },
        { MATRICULA: 221191, NOMBRE_DEL_ALUMNO: 'Diaz Coutiño Alan Emmanuel', TIPO_DE_BUSQUEDA: 'telefono contacto' },
        { MATRICULA: 221193, NOMBRE_DEL_ALUMNO: 'Escobar Gutiérrez Francisco De Jesús', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 203422, NOMBRE_DEL_ALUMNO: 'Gomez Vazquez Alan Manuel', TIPO_DE_BUSQUEDA: 'correo' },
        { MATRICULA: 221198, NOMBRE_DEL_ALUMNO: 'Guillen Luna Jesús Alejandro', TIPO_DE_BUSQUEDA: 'telefono contacto' },
        { MATRICULA: 221199, NOMBRE_DEL_ALUMNO: 'Gumeta Navarro Carlos Eduardo', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 221245, NOMBRE_DEL_ALUMNO: 'Gutiérrez Álvarez Darío Antonio', TIPO_DE_BUSQUEDA: 'antoniodario10@hotmail.com' },
        { MATRICULA: 221200, NOMBRE_DEL_ALUMNO: 'Gutiérrez Martínez Yahir Alexander', TIPO_DE_BUSQUEDA: 'telefono contacto' },
        { MATRICULA: 221201, NOMBRE_DEL_ALUMNO: 'Jimenez Escobar Nancy Guadalupe', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 221202, NOMBRE_DEL_ALUMNO: 'Lievano Ovando Carlos Raúl', TIPO_DE_BUSQUEDA: 'correo' },
        { MATRICULA: 221204, NOMBRE_DEL_ALUMNO: 'López Ruíz Joel De Jesús', TIPO_DE_BUSQUEDA: '9661130883' },
        { MATRICULA: 211234, NOMBRE_DEL_ALUMNO: 'Martínez Castillejos César Josué', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 213021, NOMBRE_DEL_ALUMNO: 'Martinez Montoya Luis Alejandro', TIPO_DE_BUSQUEDA: 'correo' },
        { MATRICULA: 203457, NOMBRE_DEL_ALUMNO: 'Morales León Rodrigo', TIPO_DE_BUSQUEDA: 'telefono contacto' },
        { MATRICULA: 211225, NOMBRE_DEL_ALUMNO: 'Morales Mendoza Yumari Teresa', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 221213, NOMBRE_DEL_ALUMNO: 'Ortiz Diaz Marco Darinel', TIPO_DE_BUSQUEDA: 'correo' },
        { MATRICULA: 221215, NOMBRE_DEL_ALUMNO: 'Pérez Mejía Jonathan Jair', TIPO_DE_BUSQUEDA: 'telefono contacto' },
        { MATRICULA: 221216, NOMBRE_DEL_ALUMNO: 'Plata Rojas Isaura Valeria', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 221217, NOMBRE_DEL_ALUMNO: 'Portillo Rodriguez Pedro', TIPO_DE_BUSQUEDA: 'correo' },
        { MATRICULA: 221218, NOMBRE_DEL_ALUMNO: 'Pozo Gomez Luis Adrian', TIPO_DE_BUSQUEDA: 'telefono contacto' },
        { MATRICULA: 221219, NOMBRE_DEL_ALUMNO: 'Rodríguez Moto Noé Alejandro', TIPO_DE_BUSQUEDA: 'nombre' },
        { MATRICULA: 213377, NOMBRE_DEL_ALUMNO: 'Vázquez Huerta Eduardo', TIPO_DE_BUSQUEDA: 'correo' },
        { MATRICULA: 221224, NOMBRE_DEL_ALUMNO: 'Velasco Jimenez Veronica', TIPO_DE_BUSQUEDA: 'telefono contacto' },
        { MATRICULA: 221225, NOMBRE_DEL_ALUMNO: 'Velazquez Hernandez Jesus Ignacio', TIPO_DE_BUSQUEDA: 'correo' },
    ];

    {/* Automata que hace el metodo de busqueda y valida cada caracter sin librería */}

    function createDFA(searchTerm) {   // La función createDFA crea un autómata finito determinista (DFA) para el término de búsqueda
        const states = Array.from({ length: searchTerm.length + 1 }, () => ({}));   // Crea un array de objetos vacíos, uno para cada estado en el DFA
        states[0][searchTerm[0]] = 1;   // El primer estado transita al segundo estado en el primer carácter del término de búsqueda
        for (let i = 1, lps = 0; i <= searchTerm.length; i++) { // Para cada carácter en el término de búsqueda
            for (const char of Object.keys(states[0])) {    // Copia las transiciones desde el estado del sufijo prefijo más largo (lps)
                states[i][char] = states[lps][char];
            }
            if (i < searchTerm.length) {    // Si no estamos en el último carácter del término de búsqueda
                states[i][searchTerm[i]] = i + 1;   // El estado actual transita al siguiente estado en el carácter actual del término de búsqueda
                if (searchTerm[i] === searchTerm[lps]) {    // Si el carácter actual del término de búsqueda es el mismo que el carácter en el índice lps
                    lps++;  // Incrementa el índice lps
                }
            }
        }
        return states;  // Devuelve el DFA
    }

    function searchWithDFA(dfa, text) { // La función searchWithDFA usa el DFA para buscar el término de búsqueda en un texto dado
        let state = 0;  // Comienza en el primer estado del DFA
        for (const char of text) {  // Para cada carácter en el texto
            state = dfa[state][char] || 0;  // Transita al siguiente estado basado en el carácter actual, o va al primer estado si no hay transición
            if (state === dfa.length - 1) { // Si estamos en el último estado del DFA, se ha encontrado el término de búsqueda
                return true;
            }
        }
        return false;   // El término de búsqueda no se encontró en el texto
    }

    useEffect(() => {   // Cuando el término de búsqueda cambia, crea un nuevo DFA para el término de búsqueda
        setDfa(createDFA(searchTerm.toLowerCase()));
    }, [searchTerm]);
    // Filtra los datos basándose en si el término de búsqueda se encuentra en los campos 'NOMBRE_DEL_ALUMNO', 'MATRICULA', o 'TIPO_DE_BUSQUEDA'
    const filteredData = dfa ? data.filter(item =>
        searchWithDFA(dfa, item.NOMBRE_DEL_ALUMNO.toLowerCase()) ||
        searchWithDFA(dfa, item.MATRICULA.toString().toLowerCase()) ||
        searchWithDFA(dfa, item.TIPO_DE_BUSQUEDA.toLowerCase())
    ) : data;

    {/* Metodo de busqueda y ordenación con métodos de JS */}

    {/*const filteredData = data.filter(item => 
        item.NOMBRE_DEL_ALUMNO.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.MATRICULA.toString().includes(searchTerm) ||
        item.TIPO_DE_BUSQUEDA.toLowerCase().includes(searchTerm.toLowerCase())
    );*/}
    return (
        <>
            <div className='contenedor'>
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
                        onChange={e => setSearchTerm(e.target.value)} 
                        className="input"
                    />
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>MATRICULA</th>
                            <th>NOMBRE DEL ALUMNO</th>
                            <th>TIPO DE BUSQUEDA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.MATRICULA}>
                                <td>{item.MATRICULA}</td>
                                <td className='nombre-alumno'>{item.NOMBRE_DEL_ALUMNO}</td>
                                <td className='tipo-busqueda'>{item.TIPO_DE_BUSQUEDA}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}