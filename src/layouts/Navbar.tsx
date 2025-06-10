import NotificationDropdown from "../components/NotificationDropdown";

interface Notification {
  id: string;
  message: string;
}

interface NavbarProps {
  notifications: Notification[];
}

export default function Navbar({ notifications }: NavbarProps) {
  return (
    <header className="header w-100 d-flex justify-content-between align-items-center">
      <article className="d-flex flex-column justify-content-center align-items-start w-50">
        <h3 className="header__title mb-0">Hello lorem ipsus</h3>
        <p className="header__sub-title mb-0">Lorem ipsum dolor</p>
      </article>
      <article className="d-flex justify-content-end w-50 gap-2">
        <NotificationDropdown notifications={notifications} />
        {/* <a href="" className="header__a">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="header__icon">
            <path
              d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
          </svg>
        </a> */}
        <a href="./Profile.html" className="header__a">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="header__icon">
            <path
              d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
          </svg>
        </a>
      </article>
    </header>
  )
}