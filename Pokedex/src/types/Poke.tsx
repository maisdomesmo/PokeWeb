
type statType = 
    {
        base_stat :number,
        stat: {
            name: string,
            url: string
        }
    }
export type pokeType ={
        type:{
            name: string,
            url: string
        }
}
type pokeAbilities = 
    {
        ability: {
            name: string,
            url: string
        },
        is_hidden: boolean,
        slot: number
    }


export type Poke ={
    name: string,
    id: number,
    types: [pokeType],
    
    sprites: {
        front_default: string,
        
        other: {
            dream_world: {front_default: string},
            home:  {front_default: string},
        }
    },
    height: number,
    weight: number,
    abilities: pokeAbilities[],
    stats: [statType,statType,statType,statType,statType,statType],
    species: {
        name: string,
        url: string
    }

    
}