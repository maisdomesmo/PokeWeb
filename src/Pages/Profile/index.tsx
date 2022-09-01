import arrow from '../../assets/images/arrow.svg'
import {useParams} from 'react-router-dom'

import './style.css'
import { usePoke } from '../../hooks/usePoke';

import { Status } from '../status';
import { Evolution } from '../evoluções';
import { About } from "../about";
import { Poke } from '../../types/Poke';
import { useEffect, useState } from 'react';
import { PokeType } from '../../components/poke-type';
import { types } from '../../assets/icons';

type profileProps = {
    pokePage: string
}

export function Profile({pokePage}: profileProps){
    const {pokeName} = useParams();
    const [poke, setPoke] = useState<Poke>({} as Poke)
    const { getPokeDetail} = usePoke()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    //const pokePage = Math.ceil(poke.id/20)
    //const page = pokePage < 0.5 ? 1 : pokePage
    const page = pokePage

    async function loadPokeDetail(){
        const pokeData = await getPokeDetail(`${pokeName}`)
        setPoke(pokeData)
        setIsLoading(false)
    }

    useEffect(()=> {
        loadPokeDetail()
        
    }, [])

    let content;
    let type;
    
    if(params.content === 'about'){
        content = (<About poke={poke} />)
        
    }else if(params.content === 'status'){
        content = (<Status poke={poke}/>)
        
    } else if(params.content === 'evolution-chain'){
        content = (<Evolution poke={poke}/>)
         
    }

    if(!isLoading){
        switch (poke?.types[0].type.name) {
            case 'bug':
            type = types.bug   
                break;
            case 'dark':
            type = types.dark   
                break;
            case 'dragon':
            type = types.dragon   
                break;
            case 'electric':
            type = types.electric   
                break;
            case 'fairy':
            type = types.fairy   
                break;
            case 'fighting':
            type = types.fighting   
                break;
            case 'fire':
            type = types.fire   
                break;
            case 'flying':
            type = types.flying   
                break;
            case 'ghost':
            type = types.ghost   
                break;
            case 'grass':
            type = types.grass   
                break;
            case 'ground':
            type = types.ground   
                break;
                case 'ice':
            type = types.ice   
                break;
            case 'normal':
            type = types.normal   
                break;
            case 'poison':
            type = types.poison   
                break;
            case 'rock':
            type = types.rock   
                break;
            case 'psychic':
            type = types.psychic   
                break;
            case 'water':
            type = types.water   
                break;
            default:
                type = types.steel
                break;
        }
    }
    
    if(isLoading){
        return <div></div>
    }

    return (
        <>
        <div style={{backgroundColor: `var( --background-type-${poke.types[0].type.name})`}} className="container-profile">
            <header className="header">

                <a href={`/${page}`}><img className="arrow" src={arrow} alt="voltar" /></a>

                <span id="profile">
                    
                    <img id='poke' src={poke.sprites.other.dream_world.front_default ? poke.sprites.other.dream_world.front_default : poke.sprites.other.home.front_default} alt="" />
                    
            
                        <span>
                            <h4>#{poke.id}</h4>
                            <h1>{poke.name}  </h1>
                            {poke.types.map(type => {
                                return (
                                    <div key={poke.types.indexOf(type)}>
                                        <PokeType typePoke={type.type.name} />
                                    </div>
                                    
                                )
                            })}
                        </span>
                        
                    

                </span>
                

            </header>

            <nav>

                <div id='about' className={params.content === 'about' ? 'selected wrapper': 'wrapper'} >
                    <a href={`/profile/about/${poke.name}`}>Sobre </a>
                </div>

                <div id='status' className={params.content === 'status' ? 'selected wrapper': 'wrapper'}>
                    <a href={`/profile/status/${poke.name}`}>Status </a>
                </div>

                <div id='evolution' className={params.content === 'evolution-chain' ? 'selected wrapper': 'wrapper'}>
                    <a href={`/profile/evolution-chain/${poke.name}`} >Evoluções</a>
                </div>     
                
            </nav>
        <main>
            {content}
        </main>
        </div>
        </>
    )
}