import { FormRegister } from '@/components/FormRegister';
import './style.scss';

export default function Cadastro() {
    return (
        <main className='cadastro'>
            <section className='cadastro-container'>
                <div className='cadastro-content'>
                    <h1>Cadastro</h1>
                    <FormRegister />
                </div>
            </section>
        </main>
    )
}