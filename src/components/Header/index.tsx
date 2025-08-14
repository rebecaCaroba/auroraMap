'use client'
import { RiMenuFold4Line, RiMenuFold3Line  } from "react-icons/ri";
import Link from 'next/link';
import logo from '../../../public/aurora-boreal.png'
import Image from "next/image";
import './style.scss';
import { useState } from "react";


export function Header() {
    const [isMenuBar, setIsMenuBar] = useState<boolean>(false)

    console.log(isMenuBar)

    return (
        <header className='header'>
            <nav className='header-content'>
                <div className="logo">
                    <Image src={logo} alt="logo" width={50} />
                    AuroraMap
                </div>
                <ul className={`header-nav-links ${isMenuBar ? 'header-is-menu-bar' : ' '}`}>
                    <li><a href="#home">Início</a></li>
                    <li><a href="#home-home-features">Recursos</a></li>
                    <li><a href="#home-how-it-works">Como Funciona</a></li>
                    <li><a href="#contact">Contato</a></li>
                    <div className='header-buttons'>
                        <Link href="/cadastro" className="register-button"> Cadastro</Link>
                        <Link href="/login" className="login-button"> Login</Link>
                    </div>
                </ul>

                <div className="header-button-menu-bar">
                    <button onClick={() => setIsMenuBar(!isMenuBar)}>
                        
                        {isMenuBar ? <RiMenuFold4Line size={32} /> : <RiMenuFold3Line size={32} />}
                    </button>
                </div>
            </nav>
        </header>
    )
}