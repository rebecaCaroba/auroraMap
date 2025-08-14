'use client'
import { AiOutlineMenu } from "react-icons/ai";
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
            <div className="header-container">
                <div className="logo">
                    <Image src={logo} alt="logo" width={50} />
                    AuroraMap
                </div>
                <nav className={`header-content ${isMenuBar ? 'header-is-menu-bar' : ' '}`}>
                    <ul className='header-nav-links'>
                        <li><a href="#home">Início</a></li>
                        <li><a href="#home-home-features">Recursos</a></li>
                        <li><a href="#home-how-it-works">Como Funciona</a></li>
                        <li><a href="#contact">Contato</a></li>
                    </ul>

                    <div className='header-buttons'>
                        <Link href="/cadastro" className="register-button"> Cadastro</Link>
                        <Link href="/login" className="login-button"> Login</Link>
                    </div>
                </nav>
                <div className="header-menu-bar">
                    <button onClick={() => setIsMenuBar(!isMenuBar)}>
                        <AiOutlineMenu size={24} />
                    </button>
                </div>
            </div>
        </header>
    )
}