import './style.scss';
import { AiOutlineUser } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";


export function HeaderMap() {
    return (
        <header className="header-map">
            <div className="header-map-container">
                <div className="header-map-container-logo">
                    <h1>AuroraMap</h1>
                <form className="header-map-container-form">
                        <input type="text" placeholder="Pesquise por um endereço" />
                        <button type="submit">
                            <CiSearch size={24} />
                            Pesquisar
                        </button>
                </form>
                </div>
                <div className="header-map-container-user">
                    <button>
                        <AiOutlineUser size={24}/>
                    </button>
                </div>
            </div>
        </header>
    );
}