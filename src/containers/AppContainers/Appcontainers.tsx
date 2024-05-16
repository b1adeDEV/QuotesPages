import {Card} from "../../components/card/card.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {ParsePost} from "../../helpers/parsePost.ts";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../components/loader/loader.tsx";


export type TCard = {
    id:string
    author:string
    category:string
    text:string
}

export const AppContainers = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<TCard[]>([]);
    const [loader, setLoader] = useState<boolean>(true);
    const response = async() => {
        const {data} = await axios.get("https://exam8-46e74-default-rtdb.firebaseio.com/quotes.json");
        setLoader(false)
        if (data !== null) {
            setData(ParsePost(data).reverse())
        }else {
            setData([])
        }
    }

    useEffect(() => {
        response()
    }, []);

    const onEdit = (id:string) => {
        navigate({pathname: `/quotes/${id}/edit`})
    }

    const onDelete = async (id:string) => {
        await axios.delete(`https://exam8-46e74-default-rtdb.firebaseio.com/quotes/${id}.json`)
        response()
    }

    return (
        <>
            <Loader active={loader}/>
            <div className={!loader?"content":"none"}>
                {
                   data.length>0? data.map((item: TCard) => (
                       <Card
                           key={item.id}
                           author={item.author}
                           text={item.text}
                           onDelete={() =>onDelete(item.id)}
                           onEdit={() =>onEdit(item.id)}/>
                   )):""
                }
            </div>
        </>
    )
}