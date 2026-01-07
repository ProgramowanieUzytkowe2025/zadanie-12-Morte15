import './AppCalculator.css';
import { useState, useEffect, useReducer } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './useKalkulator';


function statusReducer(state, action) {
    switch (action.type) {
        case 'INIT':
            return 'Brak rozruchowy status.'; 
        case 'CHANGE_A':
            return 'Zmodyfikowano wartość liczby A'; 
        case 'CHANGE_B':
            return 'Zmodyfikowano wartość liczby B'; 
        case 'CALCULATE':
            return 'Wykonano obliczenia'; 
        case 'RESTORE':
            return 'Przywrócono historyczny stan'; 
        default:
            return state;
    }
}

export function AppCalculator() {
    const { 
        liczbaA, setLiczbaA, 
        liczbaB, setLiczbaB, 
        wynik, historia, 
        dodaj, odejmij, pomnoz, podziel, 
        przywrocStan, parsujLiczbe 
    } = useKalkulator();

    const [porownanie, setPorownanie] = useState('');
    
    const [status, dispatch] = useReducer(statusReducer, 'Brak rozruchowy status.');

    useEffect(() => {
        if (liczbaA === null || liczbaB === null) {
            setPorownanie('');
        } else if (liczbaA === liczbaB) {
            setPorownanie('Liczba A jest równa liczbie B.');
        } else if (liczbaA > liczbaB) {
            setPorownanie('Liczba A jest większa od liczby B.');
        } else {
            setPorownanie('Liczba B jest większa od liczby A.');
        }
    }, [liczbaA, liczbaB]);

    function handleLiczbaAChange(val) {
        setLiczbaA(parsujLiczbe(val));
        dispatch({ type: 'CHANGE_A' });
    }

    function handleLiczbaBChange(val) {
        setLiczbaB(parsujLiczbe(val));
        dispatch({ type: 'CHANGE_B' });
    }

    function handleObliczenia(akcjaObliczenia) {
        akcjaObliczenia();
        dispatch({ type: 'CALCULATE' });
    }

    function handlePrzywrocenie(index) {
        przywrocStan(index);
        dispatch({ type: 'RESTORE' });
    }

    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    return (
    <div className='app-calculator'>
        <div className='app-calculator-pole'>
            <label>Wynik: </label>
            <span>{wynik}</span>
        </div>
        
        <div className='app-calculator-pole'>
            <label>Ostatnia czynność: </label>
            <span>{status}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label>Dynamiczne porównanie liczb: </label>
            <span>{porownanie}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label htmlFor="liczba1">Liczba 1</label>
            <input 
                id="liczba1" 
                type="number" 
                value={liczbaA ?? ''} 
                onChange={(e) => handleLiczbaAChange(e.target.value)} 
                name="liczba1" 
            />
        </div>
        <div className='app-calculator-pole'>
            <label htmlFor="liczba2">Liczba 2</label>
            <input 
                id="liczba2" 
                type="number" 
                value={liczbaB ?? ''} 
                onChange={(e) => handleLiczbaBChange(e.target.value)} 
                name="liczba2" 
            />
        </div>

        <hr />

        <div className='app-calculator-przyciski'>
            <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => handleObliczenia(dodaj)}/>
            <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => handleObliczenia(odejmij)}/>
            <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => handleObliczenia(pomnoz)}/>
            <AppButton disabled={zablokujDzielenie} title="/" onClick={() => handleObliczenia(podziel)}/>
        </div>

        <hr />
        
        <div className='app-calculator-historia'>
            <AppCalculationHistory historia={historia} onClick={(index) => handlePrzywrocenie(index)}/>
        </div>
    </div>)
}