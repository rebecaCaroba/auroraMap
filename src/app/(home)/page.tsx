import { Header } from "../../components/Header";
import { AiOutlineCaretRight } from "react-icons/ai";
import { FaCircleExclamation, FaMobileScreenButton, FaShield } from "react-icons/fa6";
import { FaMapMarkedAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoIosNotifications } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";

import { Stats } from "../../components/Stats";
import Link from "next/link";
import './style.scss'

export default function Home() {
  return (
    <>
    <Header />
    <section className="home-hero" id="home">
        <div className="container">
            <h1>Mapeamento Colaborativo de Segurança</h1>
            <p>Ajude a criar uma comunidade mais segura reportando e compartilhando informações sobre zonas de perigo em tempo real.</p>
            <div className="home-hero-buttons">
                <Link href="indext.html" className="btn-primary">
                    <AiOutlineCaretRight size={24} />
                    Começar Agora
                </Link>
                <a href="#home-how-it-works" className="btn-secondary">
                    <FaCircleExclamation size={24}/>
                    Como Funciona
                </a>
            </div>
        </div>
    </section>

    <section className="home-features" id="home-home-features">
        <div className="container">
            <h2 className="home-how-it-works-title">Recursos Principais</h2>
            <div className="home-home-features-grid">
                <div className="home-feature-card">
                    <div className="home-feature-icon">
                       <FaMapMarkedAlt />
                    </div>
                    <h3>Mapeamento Interativo</h3>
                    <p>Visualize zonas de perigo em tempo real com mapas interativos e marcadores coloridos por tipo de risco.</p>
                </div>
                <div className="home-feature-card">
                    <div className="home-feature-icon">
                       <HiMiniUserGroup />
                    </div>
                    <h3>Colaboração Comunitária</h3>
                    <p>Contribua com a segurança da comunidade reportando incidentes e validando informações de outros usuários.</p>
                </div>
                <div className="home-feature-card">
                    <div className="home-feature-icon">
                      <IoIosNotifications />
                    </div>
                    <h3>Alertas em Tempo Real</h3>
                    <p>Receba notificações instantâneas sobre novos riscos identificados na sua região.</p>
                </div>
                <div className="home-feature-card">
                    <div className="home-feature-icon">
                     <BsGraphUp />
                    </div>
                    <h3>Análise de Dados</h3>
                    <p>Visualize estatísticas e tendências de segurança para tomar decisões mais informadas.</p>
                </div>
                <div className="home-feature-card">
                    <div className="home-feature-icon">
                       <FaMobileScreenButton />
                    </div>
                    <h3>Acesso Mobile</h3>
                    <p>Use o aplicativo em qualquer dispositivo, a qualquer hora e em qualquer lugar.</p>
                </div>
                <div className="home-feature-card">
                    <div className="home-feature-icon">
                      <FaShield />
                    </div>
                    <h3>Segurança e Privacidade</h3>
                    <p>Seus dados estão protegidos com criptografia avançada e políticas rigorosas de privacidade.</p>
                </div>
            </div>
        </div>
    </section>

    <Stats />

    <section className="home-how-it-works" id="home-how-it-works">
        <div className="container">
            <h2 className="home-how-it-works-title">Como Funciona</h2>
            <div className="home-home-steps">
                <div className="home-step">
                    <div className="home-step-number">1</div>
                    <h3>Acesse o Mapa</h3>
                    <p>Abra o mapa interativo e navegue pela sua região para visualizar zonas de perigo existentes.</p>
                </div>
                <div className="home-step">
                    <div className="home-step-number">2</div>
                    <h3>Reporte Incidentes</h3>
                    <p>Clique no mapa para marcar uma nova zona de perigo e forneça detalhes sobre o tipo de risco.</p>
                </div>
                <div className="home-step">
                    <div className="home-step-number">3</div>
                    <h3>Valide Informações</h3>
                    <p>Confirme ou conteste reportes de outros usuários para manter a precisão das informações.</p>
                </div>
                <div className="home-step">
                    <div className="home-step-number">4</div>
                    <h3>Mantenha-se Informado</h3>
                    <p>Receba alertas e atualizações sobre mudanças na segurança da sua área.</p>
                </div>
            </div>
        </div>
    </section>

    <footer className="home-footer" id="contact">
        <div className="container">
            <div className="home-footer-content">
                <div className="home-footer-section">
                    <h3>AuroraMap</h3>
                    <p>Criando comunidades mais seguras através da colaboração e tecnologia.</p>
                </div>
                <div className="home-footer-section">
                    <h3>Links Rápidos</h3>
                    <p><a href="#home">Início</a></p>
                    <p><a href="#home-home-features">Recursos</a></p>
                    <p><a href="indext.html">Mapa</a></p>
                </div>
                <div className="home-footer-section">
                    <h3>Contato</h3>
                    <p><a href="mailto:contato@auroramap.com">contato@auroramap.com</a></p>
                    <p><a href="tel:+5511999999999">(11) 99999-9999</a></p>
                </div>
                <div className="home-footer-section">
                    <h3>Redes Sociais</h3>
                    <p><a href="#"><FaFacebook /> Facebook</a></p>
                    <p><a href="#"><FaTwitter /> Twitter</a></p>
                    <p><a href="#"><FaInstagram/>Instagram</a></p>
                </div>
            </div>
            <div className="home-footer-bottom">
                <p>&copy; 2024 AuroraMap. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
    </>
  );
}
