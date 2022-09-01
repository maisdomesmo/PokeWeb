import './style.css'
import { PokeSymbol } from '../../components/poke-symbol'
import { Poke } from '../../types/Poke'
import { StatusBar } from '../../components/status-bar'
import { damage_relations } from '../../hooks/useWeaknesses'
import { useEffect, useState } from 'react'
import { usePoke } from '../../hooks/usePoke'
import { types } from '../../assets/icons'

type AboutProps = {
    poke : Poke
}
export type defenceType = {
    name: string,
    value: number
}

export function Status({poke} : AboutProps){
    
    const {getWeaknessesType} = usePoke()
    const [defenseTypes, setDefenseTypes] = useState<damage_relations[]>([] as damage_relations[])
    const types: string[] = []
    const poketypes: defenceType[] = [
        {name: 'grass', value: 1}, 
        {value: 1  ,name:'fire'},
        {value: 1  ,name:'bug'},
        {value: 1  ,name:'dark'},
        {value: 1  ,name:'dragon'},
        {value: 1  ,name:'electric'},
        {value: 1  ,name:'fairy'},
        {value: 1  ,name:'fighting'},
        {value: 1  ,name:'poison'},
        {value: 1  ,name:'flying'},
        {value: 1  ,name:'ghost'},
        {value: 1  ,name:'rock'},
        {value: 1  ,name:'ground'},
        {value: 1  ,name:'ice'},
        {value: 1  ,name:'normal'},
        {value: 1  ,name:'water'},
        {value: 1  ,name:'steel'},
        {value: 1  ,name:'psychic'}]
    const [isLoading, setIsLoading] = useState(true)
    
    defenseTypes.map(type => {
        return (
            type.damage_relations.double_damage_from.map(doubleDmg=>{
                poketypes.forEach(type =>{
                   if( type.name === doubleDmg.name){
                    type.value = 2
                   }
                })
            })
        )
    })
    defenseTypes.map(type => {
        return (
            type.damage_relations.half_damage_from.map(halfDmg=>{
                poketypes.forEach(type =>{
                   if( type.name === halfDmg.name){
                    type.value = 1/2
                   }
                })
            })
        )
    })
    
    defenseTypes.map(type => {
        return (
            type.damage_relations.no_damage_from.map(imune=>{
                poketypes.forEach(type =>{
                   if( type.name === imune.name){
                    type.value = 0
                   }
                })
            })
        )
    })
    
    poke.types.map(type =>{
        types.push(type.type.name)
    })

    async function loadPokeWeaknesses(){
        const pokeDefenses = await getWeaknessesType(types)
        setDefenseTypes(pokeDefenses)
        setIsLoading(false)
        console.log(defenseTypes);
        
    }
    
    
    useEffect(()=> {
        loadPokeWeaknesses()
    }, [])

    
    
    if(isLoading){
        return <div></div>
    } 

    return (
        <div className="container-status">
            
             <div className="status-base">
                <h2>Status Base</h2>
                <span>
                    <div className='div'>
                        <h3>{poke.stats[0].stat.name}</h3><h5>{poke.stats[0].base_stat}</h5> 
                         <StatusBar stats={poke.stats[0].stat.name} value={poke.stats[0].base_stat}/>           
                    </div >
                    <div className='div'>
                        <h3>{poke.stats[1].stat.name}</h3> <h5>{poke.stats[1].base_stat}</h5>
                        <StatusBar  stats={poke.stats[1].stat.name} value={poke.stats[1].base_stat}/>
                    </div>  
                    <div className='div'>
                        <h3>{poke.stats[2].stat.name}</h3> <h5>{poke.stats[2].base_stat}</h5>
                        <StatusBar  stats={poke.stats[2].stat.name} value={poke.stats[2].base_stat}/>
                    </div>  
                    <div className='div'>
                        <h3>{poke.stats[3].stat.name}</h3> <h5>{poke.stats[3].base_stat}</h5>
                        <StatusBar  stats={poke.stats[3].stat.name} value={poke.stats[3].base_stat}/>
                    </div>  
                    <div className='div'>
                        <h3>{poke.stats[4].stat.name}</h3> <h5>{poke.stats[4].base_stat}</h5>
                        <StatusBar  stats={poke.stats[4].stat.name} value={poke.stats[4].base_stat}/>
                    </div>  
                    <div className='div'>
                        <h3>{poke.stats[5].stat.name}</h3> <h5>{poke.stats[5].base_stat}</h5>
                        <StatusBar  stats={poke.stats[5].stat.name} value={poke.stats[5].base_stat}/>
                    </div>  
                </span>
            </div>
            
            <div className="defesa">
                <h2>Tipos de defesa</h2>
                <span>
                    <p>A efetividade de cada tipo no {poke.name}.</p>
                    <div className="type">
                        <PokeSymbol typeArr={poketypes}/>
                    </div>
                    
                </span>
            </div>
            
        </div>
    )
}