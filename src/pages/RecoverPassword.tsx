import AuthHeader from "../components/auth/AuthHeader";
import RecoverPasswordBody from "../components/RecoverPasswordBody";


export default function RecoverPassword() {
  return (
    <main className="main-login container-fluid min-vh-100">
      <div className="row">
        <div className="col-md-6">
          <section className="login d-flex flex-column align-items-center justify-content-center ">
            <AuthHeader message="Ingresa tu correo electrónico y te enviaremos un codigo seguro para restablecer tu contraseña."/>
            <RecoverPasswordBody />
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