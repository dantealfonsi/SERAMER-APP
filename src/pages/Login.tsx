import LoginHeader from "../components/LoginHeader";
import LoginBody from "../components/LoginBody";

export default function Login() {
  return (
    <main className="main-login container-fluid min-vh-100">
      <div className="row">
        <div className="col-md-6">
          <section className="login d-flex flex-column align-items-center justify-content-center ">
            {/* Cabezara del login */}
            <LoginHeader/>
            {/* Cuerpo del login */}
            <LoginBody/>
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