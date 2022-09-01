import { Poke } from "../../types/Poke"
import arrow from '../../assets/images/arrow.svg'
import './style.css'

type EvolveProps = {
    pokeArr : Poke[]
}

export function PokeEvolves({ pokeArr } : EvolveProps){
    
    if(pokeArr.length == 0 ){
        return <div></div>
    }

    return (
        <div className="elvolves-container">
            { pokeArr.length > 1 ?
                pokeArr.map(poke => {
                    
                    return (
                        <div className="elvolve-background">
                                
                                <a href={`/profile/about/${poke.name}`}>
                                <img title={poke.name} className="poke" src={poke.sprites.other.dream_world.front_default} alt="" />
                                </a>
                                {pokeArr.indexOf(poke) < pokeArr.length -1  &&
                                    <img className="arrow-evolution" src={arrow} alt="" />}
                            
                        </div>
                    )
                })
            : <h2
                style={{color: 'white', fontWeight: '100'}}
            >Este pokémon não possui evoluções</h2> } 
        </div>
    )
}