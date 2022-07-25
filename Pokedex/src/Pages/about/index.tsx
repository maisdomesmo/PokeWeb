import './style.css'
import { Poke } from '../../types/Poke';
import { createContext, useEffect, useState } from 'react';
import { usePoke } from '../../hooks/usePoke';
import { damage_relations } from '../../hooks/useWeaknesses';
import { PokeType } from '../../components/poke-type';
import { types } from '../../assets/icons';


type AboutProps = {
    poke : Poke,
}

export function About({poke} : AboutProps){
    
    const [isLoading, setIsLoading] = useState(true)
    const types: string[] = []
    const {getWeaknessesType} = usePoke()
    const [weaknessesTypes, setWeaknessesTypes] = useState<damage_relations[]>([] as damage_relations[])
    
    poke.types.map(type =>{
        types.push(type.type.name)
    })

    async function loadPokeWeaknesses(){
        const PokeWeaknesses = await getWeaknessesType(types)
        setWeaknessesTypes(PokeWeaknesses)
        setIsLoading(false)
    }
    
    console.log(poke);
    
    useEffect(()=> {
        loadPokeWeaknesses()
    }, [])
    
     if(isLoading){
        return <div></div>
    }

    return ( 
        <div className='container-about'>
            <span>
            <h2>Pokédex Data</h2>
            <div className='info'>
                <h4>Height</h4> <p>{poke.height}</p> 
                </div>
                <div className='info'>
                <h4>Weight</h4> <p>{poke.weight}</p> 
                </div>
                <div className='info'>
                <h4>Abilities</h4>
                 <p>{poke.abilities.map(ability => {
                    if(poke.abilities.indexOf(ability) + 1 < poke.abilities.length ){            
                        return (
                            ability.ability.name + ', '
                        )
                    }else {
                        return (
                            ability.ability.name 
                        ) 
                    }
                })}</p> 
                </div>
                <div className='info'>
                    <h4>Weakenesses</h4> 
                    {weaknessesTypes.map(type => {
                            return (
                                type.damage_relations.double_damage_from.map(weakType => {
                                    return(
                                        <div  key={type.damage_relations.double_damage_from.indexOf(weakType)}>
                                            <PokeType typePoke={`${weakType.name}`}/>
                                        </div>
                                    )
                                })
                            )
                            
                        
                        })} 

                </div>
                
            </span>

            
        </div>
    )
    

    
}

