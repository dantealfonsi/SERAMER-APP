import AuthHeader from "../components/auth/AuthHeader";
import NewPasswordBody from "../components/NewPasswordBody";

export default function NewPassword() {
  return (
    <main className="main-login container-fluid min-vh-100">
      <div className="row">
        <div className="col-md-6">
          <section className="login d-flex flex-column align-items-center justify-content-center ">
            <AuthHeader message="Por favor, ingresa tu nueva contraseña para continuar con el proceso."/>
            <NewPasswordBody />
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