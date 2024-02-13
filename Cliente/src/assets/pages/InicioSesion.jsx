import { Link } from 'react-router-dom';
import "../style/InicioSesion.css";

function Form() {
    return ( 
        <>
            <div id="form-ui">
                <form action="" method="post" id="form">
                    <div id="form-body">
                        <div id="welcome-lines">
                            <div id="welcome-line-1">Automatitas</div>
                            <div id="welcome-line-2">221245+213021</div>
                        </div>
                        <div id="input-area">
                            <div className="form-inp">
                                <input placeholder="Correo Électronico" type="email"/>
                            </div>
                            <div className="form-inp">
                                <input placeholder="Contraseña" type="text"/>
                            </div>
                        </div>
                        <div id="submit-button-cvr">
                            <button id="submit-button" type="submit">Login</button>
                        </div>
                        <div id="forgot-pass">
                            <Link to="/registro">Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
     );
}

export default Form;