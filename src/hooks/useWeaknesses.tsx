import { useEffect } from "react"
import api from "../services/api"

export type damage_relations = {
    damage_relations : {
        double_damage_from: weaknessesType[],
        half_damage_from: strongnessType[],
        no_damage_from: imuneType[]
    }
}
export type weaknessesType = {
    name: string,
    url: string
}
type imuneType = {
    name: string,
    url: string
}

type strongnessType = {
    name: string,
    url: string
}

export function useWeaknesses(types: string[]){
    
    const weaknessesArr: damage_relations[] = []

    
    
    async function getWeaknessesType(){
        
        
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




    }
    
     useEffect(()=> {
        getWeaknessesType()

    },[]) 
    
    return weaknessesArr
}