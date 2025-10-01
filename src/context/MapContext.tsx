'use client'
import { ReactNode, useContext, useState, createContext } from "react";

export interface ClickedPositionType {
    lat: number,
    lng: number
}

interface MapContextProviderProps {
    children: ReactNode
}

interface MapContextType {
    isOpenModal: boolean
    openModalMap: () => void
    clickedPosition: ClickedPositionType | null
    getClickedPosition: (data : ClickedPositionType) => void
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
    const [ clickedPosition, setClickedPosition ] = useState<ClickedPositionType | null>(null)

    function openModalMap() {
        setIsOpenModal(!isOpenModal)
    }

    function getClickedPosition(data: ClickedPositionType) {
        setClickedPosition(data)
    }

    return (
        <MapContext.Provider value={{
            isOpenModal,
            openModalMap,
            clickedPosition,
            getClickedPosition

        }}>
            {children}
        </MapContext.Provider>
    )
}