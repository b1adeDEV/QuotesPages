import "./loader.css"
type TProps = {
    active:boolean
}

export const Loader = (props:TProps) => {
    return (
        <div className={props.active?"loader":"none"}></div>
    )
}