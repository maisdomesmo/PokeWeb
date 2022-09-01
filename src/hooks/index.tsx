import React, {ReactNode} from "react";
import { PokeProvider } from "./usePoke";

type AppProviderProps = {
    children: ReactNode
}

export function AppProvider({children}: AppProviderProps){
    return (
        <PokeProvider >
                {children}
        </PokeProvider>
    )
}