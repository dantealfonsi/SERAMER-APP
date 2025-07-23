import imgBrand from "/icon-seramer.png";

export default function LoginHeader() {
  return (
    <header className="login__header">
      <img className="login__brand" src={imgBrand} alt="Seramer Logo" />
      <h1 className="login__title">Inicia Sesión</h1>
      <p className="login__sub-title">Bienvenido de vuelta</p>
    </header>
  )
}

