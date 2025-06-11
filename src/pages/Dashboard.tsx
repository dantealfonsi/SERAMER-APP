import Navbar from "../layouts/Navbar"
import Sidebar from "../layouts/Sidebar"
/* import showToast from "../components/Toast"; */

const mockNotifications = [
  { id: "1", message: "Cobranza pendiente: Factura #1234" },
  { id: "2", message: "Recordatorio de pago: Factura #5678" },
  { id: "3", message: "Pago recibido: Factura #9101" },
  { id: "4", message: "Nueva factura generada: Factura #1121" },
  { id: "5", message: "Cobranza vencida: Factura #3141" },
  { id: "6", message: "Actualización de estado: Factura #5161" },
  { id: "7", message: "Descuento aplicado: Factura #7181" },
  { id: "8", message: "Notificación de pago automático: Factura #9202" },
  { id: "9", message: "Factura cancelada: Factura #1223" },
  { id: "10", message: "Nuevo cliente registrado: Factura #3445" },
  { id: "11", message: "Error en el pago: Factura #5667" },
  { id: "12", message: "Factura ajustada: Factura #7889" },
  { id: "13", message: "Confirmación de envío: Factura #9000" },
  { id: "14", message: "Factura enviada: Factura #1010" },
  { id: "15", message: "Pago parcial recibido: Factura #2020" },
  { id: "16", message: "Cliente actualizado: Factura #3030" },
  { id: "17", message: "Nueva promoción aplicada: Factura #4040" },
  { id: "18", message: "Revisión requerida: Factura #5050" },
  { id: "19", message: "Factura duplicada: Factura #6060" },
  { id: "20", message: "Pago rechazado: Factura #7070" },
  { id: "21", message: "Nueva dirección de envío: Factura #8080" },
  { id: "22", message: "Factura consolidada: Factura #9090" },
  { id: "23", message: "Cliente eliminado: Factura #1011" },
  { id: "24", message: "Cobranza exitosa: Factura #2022" },
  { id: "25", message: "Actualización de términos: Factura #3033" },
  { id: "26", message: "Factura archivada: Factura #4044" },
  { id: "27", message: "Notificación de reembolso: Factura #5055" },
];

export default function Dashboard() {
  /* Forma de utilizar toast */
  /* const handleClick = () => {
    showToast({
      title: 'Lorem ipsusm dolor sit amet',
      message: 'lorem ipsus dolor sit amet, consectetur adipiscing elit.',
      type: 'success',
      options: {
        autoClose: 3000,
      }
    });
  }; */
  
  return (
    <div className="db-body container-fluid min-vh-100">
      <div className="row content-general">
        {/* Barra lateral */}
        <Sidebar />
        <main className="main-enter main-enter d-flex flex-column align-items-center col-lg-10">
          {/* Barra de navegacion */}
          <Navbar notifications={mockNotifications} />
          {/* Eliminar boton uso solo prueba */}
          {/* <button onClick={handleClick}>Guardar</button> */}
        </main>
      </div>
    </div>
  )
}