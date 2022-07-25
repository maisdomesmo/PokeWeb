import './style.css'
import { useParams } from 'react-router-dom'

export type paginationProps= {
    totalCount?: number,
    currentPage: number,
    onPageChange?: () => {}
    siblingCount?: number,
    className?: string
}

export function Pagination(){
    const pagesArr = []
    const params = useParams()
    const currentPage = parseInt(params.page!)
    const inicio = '<<'
    const final = '>>'

    const next = '>'
    const previous = '<'


    for(let i = 1; i<58; i++){
        pagesArr.push(i)
    }
    
    
    return (
        <div className='pagination'>
            
            {   currentPage > 3  &&
                <a href={`/${pagesArr[0]}`}> {inicio} </a>
            }


            {  parseInt(params.page!) - 7 >= 0 &&
                <a href={`/${pagesArr[parseInt(params.page!) - 7]}`}> { previous } </a>
            }

            {   parseInt(params.page!) -1 > 0 &&
                <a href={`/${pagesArr[parseInt(params.page!) -2]}`}> { parseInt(params.page!) -1 } </a>
            }

            <a className='current' href={``}> { currentPage } </a>
            
            {   parseInt(params.page!) + 1 <= 57 &&
                <a href={`/${pagesArr[parseInt(params.page!)]}`}> { parseInt(params.page!)+1  } </a>
            }

            {   parseInt(params.page!) + 7 <= 56 &&
                <a href={`/${pagesArr[parseInt(params.page!) + 7]}`}> { next } </a>
            }
            {   currentPage != 57 &&
                <a href={`/${pagesArr[56]}`}> { final } </a>
            }
        </div>
    )
}