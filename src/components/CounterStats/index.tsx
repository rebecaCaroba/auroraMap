'use client'
import { useEffect, useMemo, useRef, useState } from "react";

export function CounterStats({ target }: { target?: number | string }) {
    const [counter, setCounter] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observerInstance = new IntersectionObserver(callback, options);

        if (elementRef.current) {
            observerInstance.observe(elementRef.current);
        }

    }, []);

    useEffect(() => {
        let elementValue = 0

        if (typeof target === 'string') {
            const numericValue = parseFloat(target.replace('%', ''));

            elementValue = numericValue
        } else {
            elementValue = target || 0;
        }

        const step = Math.ceil(elementValue / 100)

        let i = 0
        const interval = setInterval(() => {
            i += step

            if (i >= elementValue) {
                setCounter(elementValue)
                clearInterval(interval)
            } else {
                setCounter(i)
            }

        }, 10)

    }, [isVisible]);

    
    const callback = (entries: any, observer: any) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
        }

    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }

    return (
        <span ref={elementRef} >
            {counter}
            {typeof target === 'string' && target.includes('%') ? '%' : ''}
        </span>
    )

}