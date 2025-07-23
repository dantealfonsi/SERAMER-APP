import AuthFooter from "./auth/AuthFooter";

export default function SecurityTokenBody() {
  return (
    <>
      {/* Formulario */}
      <form action="#" method="POST" className="auth__form">
        <div className="row justify-content-center mb-3">
          <div className="col-md-2">
            <input type="text" className="form-control auth__field" id="email" />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control auth__field" id="email" />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control auth__field" id="email" />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control auth__field" id="email" />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control auth__field" id="email" />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control auth__field" id="email" />
          </div>
        </div>
        <button type="submit" className="auth__button py-3">
          Siguiente
        </button>
      </form>
      {/* Mensaje de retroalimentacion */}
      <AuthFooter messageError="Error: Codigo de seguridad incorrecto." />
    </>
  )
}