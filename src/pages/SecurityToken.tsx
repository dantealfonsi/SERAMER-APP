import SecurityTokenBody from "../components/SecurityTokenBody";
import AuthHeader from "../components/auth/AuthHeader";



export default function SecurityToken() {
  return (
    <main className="main-login container-fluid min-vh-100">
      <div className="row">
        <div className="col-md-6">
          <section className="login d-flex flex-column align-items-center justify-content-center ">
            <AuthHeader message="Hemos enviado un código de 6 dígitos a tu correo. Por favor, ingrésalo aquí para continuar con la recuperación de tu contraseña."/>
            <SecurityTokenBody />
          </section>
        </div>
        <div className="col-md-6">
          <section className="login d-flex flex-column align-items-center justify-content-center">
            <h1 className="login__title-plus">SERAMER</h1>
          </section>
        </div>
      </div>
    </main >
  );
}