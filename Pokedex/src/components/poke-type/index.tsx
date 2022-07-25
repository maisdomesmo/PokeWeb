import { types } from "../../assets/icons";
import './style.css'

type pokeTypeProps = {
    typePoke: string
}

export function PokeType({typePoke}: pokeTypeProps){
    
    let type;
    switch (typePoke) {
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
        <div id='div' title={typePoke} style={{backgroundColor: `var(--type-${typePoke})`}}>
                        <img src={type} alt=''/>     
                        <p className="type">{typePoke}   </p>     
        </div>
    )
    
}