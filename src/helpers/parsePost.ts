import {TCard} from "../containers/AppContainers/Appcontainers.tsx";

type TGetPost<T> = {
    [key: string]: T
}

export const ParsePost = (data:TGetPost<{[key:string]:string}>):TCard[] => {
    return Object.keys(data).map(id =>{
        return {
            id,
            author: data[id].author,
            category: data[id].category,
            text: data[id].text
        }
    })
}