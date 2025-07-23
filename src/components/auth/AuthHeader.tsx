type AuthHeaderProps = {
  message: string;
}

export default function AuthHeader({message}: AuthHeaderProps) {
  return (
    <header className="auth__header">
      <p className="auth__message-header">
        {message}
      </p>
    </header>
  )
}