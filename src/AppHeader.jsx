import './AppHeader.css';
import { useFont } from './FontContext';

export function AppHeader({imie, nazwisko}) {
    const czcionki = ['small', 'medium', 'large'];
    const { setCzcionka } = useFont(); 

    return (
        <div className="app-header">
            <h2>{imie} {nazwisko}</h2>
            <div className="app-header-czcionki">
                {czcionki.map(c => (
                    <span 
                        key={c} 
                        title={c} 
                        onClick={() => setCzcionka(c)} 
                        style={{ fontSize: c }}
                    >
                        A
                    </span>
                ))}
            </div>
        </div>
    );
}