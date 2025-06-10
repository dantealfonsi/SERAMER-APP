import Navbar from "../layouts/Navbar"
import Sidebar from "../layouts/Sidebar"

const mockNotifications = [
  { id: "1", message: "Cobranza pendiente: Factura #1234" },
  { id: "2", message: "Recordatorio de pago: Factura #5678" },
  { id: "3", message: "Pago recibido: Factura #9101" },
  { id: "4", message: "Nueva factura generada: Factura #1121" },
  { id: "5", message: "Cobranza vencida: Factura #3141" },
  { id: "6", message: "Actualización de estado: Factura #5161" },
  { id: "7", message: "Descuento aplicado: Factura #7181" },
  { id: "8", message: "Notificación de pago automático: Factura #9202" },
];

export default function Dashboard() {
  return (
    <div className="db-body container-fluid min-vh-100">
      <div className="row content-general">
        {/* Barra lateral */}
        <Sidebar />
        <main className="main-enter main-enter d-flex flex-column align-items-center col-lg-10">
          {/* Barra de navegacion */}
          <Navbar notifications={mockNotifications} />
        </main>
      </div>
    </div>
  )
}