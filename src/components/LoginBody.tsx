import { Link } from "react-router-dom"
import AuthFooter from "./auth/AuthFooter"

export default function LoginBody() {
  return (
    <>
      {/* Formulario */}
      <form action="#" method="POST" className="login__form">
        <div className="form-group mb-2">
          <label htmlFor="username" className="form-label login__label">Nombre de usuario:</label>
          <div className="login__group-elements">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="login__icon"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
            <input type="text" className="form-control login__field" id="username" placeholder="Ingrese su usuario" />
          </div>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="password" className="form-label login__label">Contraseña:</label>
          <div className="login__group-elements">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="login__icon"
            >
              <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
            </svg>
            <input type="password" className="form-control login__field" id="password" placeholder="Ingrese su contraseña" />
            <button type="button" className="login__button-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="login__view-icon">
                <path
                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
      {/* Enlace de recuperacion */}
      <Link to="/recover-password" className="login__a fst-italic">¿Olvidaste tu contraseña?</Link>
      {/* Boton de envio */}
      <button type="submit" className="login__button py-3">Iniciar sesión</button>
      {/* Mensaje de retroalimentación */}
      <AuthFooter messageError="Error: Contraseña o usuario invalido"/>
    </>
  )
}