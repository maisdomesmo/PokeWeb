import { types } from "../../assets/icons";
import { defenceType } from "../../Pages/status";
import './style.css'

type SymbolProps = {
    typeArr : defenceType[]
}


export function PokeSymbol({typeArr} : SymbolProps){

    let type;
    
    return (
        <div>
            {
                typeArr.map(pokeType => {

                    switch (pokeType.name) {
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
                    return ( 
                        <div key={typeArr.indexOf(pokeType)}  title={`${pokeType.name} X${pokeType.value} de dano tomado` } className="symbol-container">
                            <div  style={{backgroundColor: `var(--type-${pokeType.name})`}} className="symbol">
                                <img src={type}/> 
                            </div>
                            <div className="value">
                                { pokeType.value !== 1 &&
                                pokeType.value
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}