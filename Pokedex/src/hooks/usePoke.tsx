import {  createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { Poke } from "../types/Poke";
import axios from 'axios'
import { EvolutionChain } from "../types/EvolutionChain";
import { damage_relations } from "./useWeaknesses";

type PokeProviderProps = {
    children: ReactNode
}
type PokeContextData ={
    poke : Poke[],
    getPoke: (page: number) => void,
    getPokeDetail: (name: string) => Promise<Poke>,
    getSpecies: (speciesUrl: string) => Promise<ChainProps>,
    getChain: (speciesUrl: string)=> Promise<EvolutionChain>,
    getWeaknessesType: (types: string[]) => Promise<damage_relations[]>,
    getPokeByType: (type: string) => Promise<pokeByTypeArrProps[]>
}

export type ChainProps = {
    evolution_chain: {
        url: string
    }
}
export type pokeByTypeArrProps = {
    pokemon: [{
        pokemon:{
            name: string
        }
    }]
}

export const PokeContext = createContext({} as PokeContextData)

function PokeProvider({children} : PokeProviderProps){

    const [poke, setPoke] = useState<Poke[]>([])
    const [chainUrl, setChainUrl] = useState<ChainProps>({} as ChainProps)
    const [pokeChain, setPokeChain] = useState<EvolutionChain>({} as EvolutionChain)
    const pokeByTypeArr: pokeByTypeArrProps[] = []
    
    async function getWeaknessesType(types: string[]){
        
        const weaknessesArr: damage_relations[] = []
        
        await api.get(`type/${types[0]}` ).then((response)=> weaknessesArr.push(response.data)
        )
        .catch((err)=> {
            console.log('ops! ocorreu um erro' + err);
            
        })

        if(types.length > 1){
            await api.get(`type/${types[1]}` ).then((response)=> weaknessesArr.push(response.data)
        )
        .catch((err)=> {
            console.log('ops! ocorreu um erro' + err);
            
        })
        }


        return (weaknessesArr)

    }

    async function getSpecies(speciesUrl: string){
        const species = axios.create({
            baseURL: `${speciesUrl}`
        })
        await species.get('').then((response)=> setChainUrl(response.data))
        .catch((err)=> {
            console.log('ops! ocorreu um erro' + err);
            
        })
        return (chainUrl)
    }

    async function getChain(chainUrl: string){
        const chain = axios.create({
            baseURL: `${chainUrl}`
        })


        await chain.get('').then((response)=> setPokeChain(response.data))
        .catch((err)=> {
            console.log('ops! ocorreu um erro' + err);
            
        })
        return (pokeChain)
    }
    

    async function getPokeByType(type: string){
        await api.get(`/type/${type}`).then((response)=> {
            pokeByTypeArr.push(response.data)
        })
        .catch((err)=> {
            console.log('ops! ocorreu um erro' + err);
            
        })
        return (pokeByTypeArr)
    }
    async function getPoke(page : number){
        await api.get(`/pokemon?limit=20&offset=${page-20}`).then((response)=> setPoke(response.data.results))
        .catch((err)=> {
            console.log('ops! ocorreu um erro' + err);
            
        })
    }
    
    async function getPokeDetail(name: string){
        
        const pokeDetail = await api.get(`/pokemon/${name}`).then((response)=> (response.data))
        .catch((err)=> {
            console.log('ops! ocorreu um erro' + err);
            
        })
        return (pokeDetail)
    }

    return (
        <PokeContext.Provider
            value={{poke, getPoke, getPokeDetail, getChain, getSpecies, getWeaknessesType, getPokeByType}}
        >
            {children}
        </PokeContext.Provider>
    )
    
}

function usePoke(){
    const context = useContext(PokeContext)
    return context
}



export {PokeProvider, usePoke}