import { useState, useEffect } from 'react';

export function useKalkulator() {
    
    const getStoredValue = (key, initialValue) => {
        const saved = sessionStorage.getItem(key);
        if (saved !== null) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error('Błąd parsowania danych z sessionStorage:', error);
            }
        }
        return initialValue;
    };

    
    const [liczbaA, setLiczbaA] = useState(() => getStoredValue('kalkulator-liczbaA', null));
    const [liczbaB, setLiczbaB] = useState(() => getStoredValue('kalkulator-liczbaB', null));
    const [wynik, setWynik] = useState(() => getStoredValue('kalkulator-wynik', null));
    
    const [historia, setHistoria] = useState(() => getStoredValue('kalkulator-historia', []));

   
    useEffect(() => {
        sessionStorage.setItem('kalkulator-liczbaA', JSON.stringify(liczbaA));
    }, [liczbaA]);

    useEffect(() => {
        sessionStorage.setItem('kalkulator-liczbaB', JSON.stringify(liczbaB));
    }, [liczbaB]);

    useEffect(() => {
        sessionStorage.setItem('kalkulator-wynik', JSON.stringify(wynik));
    }, [wynik]);
   
    useEffect(() => {
        sessionStorage.setItem('kalkulator-historia', JSON.stringify(historia));
    }, [historia]);

    
    function parsujLiczbe(value) {
        if (value === '' || value === null) return null;
        const sparsowanaLiczba = parseFloat(value);
        return isNaN(sparsowanaLiczba) ? null : sparsowanaLiczba;
    }

    function aktualizujHistorie(operation, wynikOperacji) {
        const wpis = { a: liczbaA, b: liczbaB, operation: operation, wynik: wynikOperacji };
        setHistoria(prev => [...prev, wpis]);
        setWynik(wynikOperacji);
    }

    const dodaj = () => aktualizujHistorie('+', liczbaA + liczbaB);
    const odejmij = () => aktualizujHistorie('-', liczbaA - liczbaB);
    const pomnoz = () => aktualizujHistorie('*', liczbaA * liczbaB);
    const podziel = () => {
        if (liczbaB !== 0) aktualizujHistorie('/', liczbaA / liczbaB);
    };

    const przywrocStan = (index) => {
        const elementHistorii = historia[index];
        
        const nowaHistoria = historia.slice(0, index + 1);
        setHistoria(nowaHistoria);
        
       
        setLiczbaA(elementHistorii.a);
        setLiczbaB(elementHistorii.b);
        setWynik(elementHistorii.wynik);
    };

    return {
        liczbaA, setLiczbaA,
        liczbaB, setLiczbaB,
        wynik,
        historia,
        dodaj, odejmij, pomnoz, podziel,
        przywrocStan,
        parsujLiczbe
    };
}