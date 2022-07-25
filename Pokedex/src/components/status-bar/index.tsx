import './style.css'

type StatusBarProps = {
    value: number,
    stats: string
}

export function StatusBar({value, stats}: StatusBarProps){
    
    
    document.body.style.setProperty(`--${stats}-value`, `${value}`)
    
    return(
        <div className={`progress-bar ${stats}`} ></div>
    )
}