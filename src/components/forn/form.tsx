import React from "react"
import "./form.css"

type TProps = {
    ChangeAuthor: React.ChangeEventHandler<HTMLInputElement>
    ChangeQuote: React.ChangeEventHandler<HTMLTextAreaElement>
    onSubmit: React.FormEventHandler<HTMLFormElement>
    onClick: () => void
    onChangeSelect: React.ChangeEventHandler<HTMLSelectElement>
    title:string
    valueSelect?: string
    valueAuthor?: string
    valueQuote?: string
}

export const Form = (props:TProps) => {
    return (
        <form onSubmit={props.onSubmit}>
            <h1>{props.title}</h1>
            <div>
                <h3>Category</h3>
                <select value={props.valueSelect} onChange={props.onChangeSelect}>
                    <option value={"default"}>Выберите категорию</option>
                    <option value="star-wars">Star Wars</option>
                    <option value="famous-people">Famous People</option>
                    <option value="saying">Saying</option>
                    <option value="humour">Humour</option>
                    <option value="motivational">Motivational</option>
                </select>
            </div>
            <div>
                <h3>Author</h3>
                <input defaultValue={props.valueAuthor} onChange={props.ChangeAuthor} type="text"/>
            </div>
            <div>
                <h3>Quote text</h3>
                <textarea defaultValue={props.valueQuote} onChange={props.ChangeQuote}></textarea>
            </div>
            <button onClick={props.onClick}>Save</button>
        </form>
    )
}