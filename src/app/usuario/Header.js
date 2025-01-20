import Link from "next/link";

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href="/entreno">Tabla de Entreno</Link></li>
                    <li><Link href="/dieta">Dieta</Link></li>
                    <li><Link href="/medidas">Medidas Corporales</Link></li>
                </ul>
            </nav>
        </header>
    );
}
