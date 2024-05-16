import "./card.css"
import {MdDeleteOutline, MdEdit} from "react-icons/md";

type TProps = {
    text:string
    author: string
    onDelete: () =>void
    onEdit: () => void
}

export const Card = (props:TProps) => {
    return (
        <div className="card">
            <p>{props.text}</p>
            <h3>-{props.author}</h3>
            <div className={"cardBtn"}>
                <button onClick={props.onEdit} ><MdEdit/></button>
                <button onClick={props.onDelete}><MdDeleteOutline/></button>
            </div>
        </div>
    )
}