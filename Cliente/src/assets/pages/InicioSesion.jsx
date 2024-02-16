import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../style/InicioSesion.css";

function InicioSesion() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', { // Cambia '/api/user' a '/api/auth/login'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo,
                    password
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            navigate('/tableSearch');
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <>
            <div id="form-ui">
                <form onSubmit={handleSubmit} id="form">
                    <div id="form-body">
                        <div id="welcome-lines">
                            <div id="welcome-line-1">Automatitas</div>
                            <div id="welcome-line-2">221245+213021</div>
                        </div>
                        <div id="input-area">
                            <div className="form-inp">
                                <input placeholder="Correo Électronico" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                            </div>
                            <div className="form-inp">
                                <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div id="submit-button-cvr">
                            <button id="submit-button" type="submit">Enviar</button>
                        </div>
                        <div id="forgot-pass">
                            <Link to="/registro">Registro</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
     );
}

export default InicioSesion;


//221245@ids.upchiapas.edu.mx
//Nanioelcacas13@