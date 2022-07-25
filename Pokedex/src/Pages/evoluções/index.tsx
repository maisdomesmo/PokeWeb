import { Poke } from "../../types/Poke"
import { useEffect, useState } from "react"
import { EvolutionChain } from "../../types/EvolutionChain"
import { ChainProps, usePoke } from "../../hooks/usePoke"
import { PokeEvolves } from "../../components/poke-evolves"


type AboutProps = {
    poke : Poke
}


export function Evolution({poke} : AboutProps){
    const [isLoading, setIsLoading]= useState(true)
    const [pokeChain, setPokeChain]= useState<EvolutionChain>({} as EvolutionChain)
    const {getChain, getSpecies, getPokeDetail} = usePoke()
    const [load, setLoad]= useState(false)
    const [pokesArr, setPokesArr] = useState<Poke[]>([] as Poke[])
    const pokes: Poke[] = []

    async function loadPokeSpecies(){
        const species = await getSpecies(poke.species.url)
        setLoad(true)
        return species       
    }

    async function loadPokeChain(){ 
        const getPokeSpecies = await loadPokeSpecies()
            const getPokeChain = await getChain(`${getPokeSpecies.evolution_chain.url}`)
            setPokeChain(getPokeChain)
            setLoad(false)
            setIsLoading(false)
            await loadChain() 
    }

    async function loadChain (){
        setLoad(false)
            pokes.push( await getPokeDetail(pokeChain.chain.species.name))
            if(pokeChain.chain.evolves_to[0]){
                pokes.push( await getPokeDetail(pokeChain.chain.evolves_to[0].species.name))
                if(pokeChain.chain.evolves_to[0].evolves_to[0]){
                    pokes.push( await getPokeDetail(pokeChain.chain.evolves_to[0].evolves_to[0].species.name))
                }
            }
            
            
            setPokesArr(pokes)
            
            setLoad(true)
    }

    useEffect(()=> {    
        loadPokeChain() 
        
    },[isLoading, load])
    
    

    if(isLoading || pokeChain.chain === undefined ){        
        return <div></div>
    }
    
    return (
        <div>
             <PokeEvolves pokeArr={pokesArr} ></PokeEvolves>
         </div>
    )
}