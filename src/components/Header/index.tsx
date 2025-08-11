import Link from 'next/link';
import logo from '../../../public/aurora-boreal.png'
import Image from "next/image";
import './style.scss';

export function Header() {
    return (
        <header className='header'>
            <nav className="header-container">
                <div className="logo">
                    <Image src={logo} alt="logo" width={50} />
                    AuroraMap
                </div>
                <ul className="header-nav-links">
                    <li><a href="#home">Início</a></li>
                    <li><a href="#home-home-features">Recursos</a></li>
                    <li><a href="#home-how-it-works">Como Funciona</a></li>
                    <li><a href="#contact">Contato</a></li>
                </ul>

                <div className='header-buttons'>
                    <Link href="/login" className="login-button"> Login</Link>
                    <Link href="/cadastro" className="register-button"> Cadastro</Link>
                </div>
            </nav>
        </header>
    )
}