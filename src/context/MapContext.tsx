'use client'
import { ReactNode, useContext, useState, createContext } from "react";


interface MapContextProviderProps {
    children: ReactNode
}

interface MapContextType {
    isOpenModal: boolean
    openModalMap: () => void
}

export const MapContext = createContext({} as MapContextType);

export function useMap() {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error('useBetting deve ser usado dentro de um BettingProvider');
    }
    return context;
}

export function MapProvider({ children }: MapContextProviderProps) {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    

    function openModalMap() {
        setIsOpenModal(!isOpenModal)
    }

    return (
        <MapContext.Provider value={{
            isOpenModal,
            openModalMap,
        }}>
            {children}
        </MapContext.Provider>
    )
}