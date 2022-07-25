export type EvolutionChain= {
    id: number,
    chain: {
        evolves_to: [{
            species: {
                name: string
            },
            evolves_to: [{
                species: {
                    name: string
                }
            }]
        }],
        species: {
            name: string
        }
    }
}