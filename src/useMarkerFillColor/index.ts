import { useMemo } from 'react'


export function useMarkerFillColor(severity: string) {

    const markerFillColor = useMemo(() => {
        switch (severity) {
            case 'Alto':
                return '#FF0000' 
            case 'Médio':
                return '#FFA500'
            case 'Baixo':
                return '#FFDE21' 
            default:
                return '#808080' 
        }
    
    }, [severity])

    return markerFillColor
}

