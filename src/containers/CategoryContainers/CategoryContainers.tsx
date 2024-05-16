import {Card} from "../../components/card/card.tsx"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {ParsePost} from "../../helpers/parsePost.ts";
import {useEffect, useState} from "react";
import {TCard} from "../AppContainers/Appcontainers.tsx";
import {Loader} from "../../components/loader/loader.tsx";


export const CategoryContainers = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState<TCard[]>([]);
    const [loader, setLoader] = useState<boolean>(true);
    const response = async() => {
        const {data} = await axios.get(`https://exam8-46e74-default-rtdb.firebaseio.com/quotes.json?orderBy="category"&equalTo="${location.pathname.split("/")[2]}"`)
        setLoader(false)
        if (data !== null) {
            setData(ParsePost(data))
        }else {
            setData([])
        }
    }

    useEffect(() => {
        setLoader(true)
        response()
    }, [location.pathname]);

    const onEdit = (id:string) => {
        navigate({pathname: `/quotes/${id}/edit`})
    }

    const onDelete = async(id:string) => {
        await axios.delete(`https://exam8-46e74-default-rtdb.firebaseio.com/quotes/${id}.json`)
        response()
    }

    return (
        <>
            <Loader active={loader}/>
            <div className={!loader ? "content" : "none"}>
                {
                    data.map((item: TCard) => (
                        <Card
                            key={item.id}
                            author={item.author}
                            text={item.text}
                            onDelete={() => onDelete(item.id)}
                            onEdit={() => onEdit(item.id)}/>
                    ))
                }
            </div>
        </>
    )
}