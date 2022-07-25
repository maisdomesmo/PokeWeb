import  { KeyboardEvent, useEffect, useState } from 'react'
import { Pagination } from '../../components/pagination'
import { PokeCard } from '../../components/poke-card'
import { usePoke } from '../../hooks/usePoke'
import './style.css'
import {useParams} from 'react-router-dom'
import { Poke } from '../../types/Poke'



export function Home(){
const [search, setSearch] = useState('')
const [pokeSearched, setPokeSerached] = useState<Poke[]>([])
const {getPokeByType, poke, getPoke, getPokeDetail} = usePoke()    
const params = useParams()
const [page, setPage]= useState<number>(params.page ? parseInt(params.page!) * 20 : 20)
const [isLoading, setIsLoading]= useState(true)
    
    useEffect(()=>{
        setPage(parseInt(params.page!) * 10)
        getPoke(page)
        
    }, [isLoading])
    
    async function searchType(search: string) {
        setIsLoading(true)
        pokeSearched.splice(0, pokeSearched.length)
        const poke = await getPokeByType(search).then(response=> {
            if(!response){
                alert('Nome/Tipo inválido!')
            }else{
                
                response[0].pokemon.forEach(async poke => {
                    
                    await getPokeDetail(poke.pokemon.name).then(response =>{
                        pokeSearched.push(response)          
                    })
                   
                }) 
                setIsLoading(false) 
            }
        })
        
    }

    async function searchPokeName(search: string){
        pokeSearched.splice(0, pokeSearched.length)
        setIsLoading(true)
        const poke = await getPokeDetail(search).then(response => {
            if(!response || response.id > 10228){
                alert('Nome/Tipo inválido!')
            }else{
                setPokeSerached([response]) 
                setIsLoading(false)
            }

        })
          
    }

    function handleSearch(search: string){
        if(search === 'bug'||search ==='dark'||search ==='dragon'||search ==='electric'||search ==='fairy'||search ==='fighting'||search ==='fire'||search ==='flying'||search ==='ghost'||search ==='grass'||search ==='ground'||search ==='ice'||search ==='normal'||search ==='poison'||search ==='rock'||search ==='psychic'||search ==='water'||search ==='steel'){ 
            searchType(search)
        }else {
            searchPokeName(search)
        }
    }

    

    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>)  {
        if(event.key === 'Enter'){
            handleSearch(search)
        }
      } 
    

        return (
            <div className="container">
                <header>
                    <span className='title'> <h1>Pokédex</h1> 
                    Search for Pokémon by name or using type.
                    </span>
                    
                    <span className='search-bar'>
                        
                            <input 
                            placeholder=' Digite o nome do pokémon ou seu tipo, ex: pikachu, water, fire'
                            type="text" 
                            onKeyDown={e => handleKeyPress(e)}
                            onChange={ event => 
                                
                                setSearch(event.target.value)} 
                            value={search}
                            id='enter'
                            />
                            <button type='button' onClick={()=> handleSearch(search)}/>
                        
                    </span>
                </header>
                {!pokeSearched.length ? <Pagination /> : 
                    <div className="pagina-inicial">
                        <a href="/1">Página incial</a>
                    </div>
                }
                <main>
                {isLoading ? poke.map((pokes)=> {
                        return (
                                <div key={`${poke.indexOf(pokes)}`} >
                                    <PokeCard name = {`${pokes.name}`} />
                                </div>
                                )
                    }):
                    pokeSearched.map((poke)=> {
                        return (
                                <PokeCard name = {`${poke.name}`} />
                                )
                    })
                    }
                </main>
            </div>
        )
    
    
    
}