import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/usuario/entreno">Tabla de Entreno</Link>
          </li>
          <li>
            <Link href="/usuario/dieta">Dieta</Link>
          </li>
          <li>
            <Link href="/usuario/medidas">Medidas Corporales</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
