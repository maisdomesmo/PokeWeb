import './style.css'
import { PokeType } from "../poke-type";
import { usePoke } from '../../hooks/usePoke';
import { createContext, useEffect, useState } from 'react';
import { Poke } from '../../types/Poke';



export let page = createContext('1')

export type pokeName = {
    name:string;
}

export function PokeCard({name}: pokeName ){
    const [poke, setPoke] = useState<Poke>({} as Poke)
    const {getPokeDetail} = usePoke()
    const [isLoading, setIsLoading] = useState(true)
    


    async function loadPokeDetail(){
        const pokeData = await getPokeDetail(name)
        
        setPoke(pokeData)
        setIsLoading(false)
    }

    useEffect(()=> {
        loadPokeDetail()
    }, [])


    if(isLoading){
        return <div></div>
    }
    return(
        <a  href={`/profile/about/${poke.name}`} className="container-card"  >
            <div className="card" style={{backgroundColor: `var( --background-type-${poke.types[0].type.name})`}}>
            
                <span>
                    <h4>#{poke.id}</h4>
                    <h1
                    style={{fontSize: poke.name.length > 10 ? '19px':'' }} 
                    >{poke.name}  </h1>
                    
                    <div id="types" >
                    {poke.types.map(type => {
                            
                           return  <span key={poke.types.indexOf(type)}>
                            <PokeType typePoke={type.type.name} />
                           </span>
                           
                        }) }
                    </div>
                        

                    
                </span>
                <img src={poke.sprites.front_default} alt="" />
            </div>
        </a>
    )
}
