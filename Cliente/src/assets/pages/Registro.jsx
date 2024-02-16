import { useState } from 'react';
import { Link } from 'react-router-dom';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8080/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                correo,
                password
            })
        });

        const data = await response.json();
        console.log(data);
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
                                <input placeholder="Nombre De Usuario" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                            </div>
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
                            <Link to="/">Iniciar sesión</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
     );
}

export default Registro;