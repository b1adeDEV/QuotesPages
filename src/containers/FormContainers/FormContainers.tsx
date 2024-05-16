import {Form} from "../../components/forn/form.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {Loader} from "../../components/loader/loader.tsx";

export const FormContainers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [quoter, setQuoter] = useState("");
    const [author,setAuthor] = useState<string>("");
    const [select,setSelect] = useState<string>("");
    const [alert, setAlert] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(true);

    const ChangeAuthorHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
        setAlert(false)
    }
    const ChangeQuoterHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setQuoter(e.target.value);
        setAlert(false)
    }
    const ChangeSelectHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelect(e.target.value)
        setAlert(false)
    }

    const response = async() => {
        const {data} = await axios.get(`https://exam8-46e74-default-rtdb.firebaseio.com/quotes/${location.pathname.split("/")[2]}.json`);
        setLoader(false)
        if (data !== null) {
            setSelect(data.category)
            setQuoter(data.text)
            setAuthor(data.author)
        }
    }

    useEffect(() => {
        response()
    }, []);

    const onClick = async() => {
        if(select != "default" && author != "" && quoter != ""){
            await axios.post("https://exam8-46e74-default-rtdb.firebaseio.com/quotes.json", {
                category:select,
                text:quoter,
                author:author
            })
            navigate({
                pathname:"/"
            })
        }else {
            setAlert(true)
        }
    }
    const onClickEdit = async() => {
        if(select != "default" && author != "" && quoter != "") {
            await axios.put(`https://exam8-46e74-default-rtdb.firebaseio.com/quotes/${location.pathname.split("/")[2]}.json`,{
                category:select,
                text:quoter,
                author:author
            })
            navigate({pathname:"/"})
        }else {
            setAlert(true)
        }
    }

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <>
            {
                location.pathname.split("/")[3] !== "edit" ?
                    <div className={"formContainer"}>
                        <h1 className={alert ? "show" : "none"}>Заполните все поля</h1>
                        <Form
                            ChangeAuthor={(e) => ChangeAuthorHandler(e)}
                            ChangeQuote={(e) => ChangeQuoterHandler(e)}
                            onChangeSelect={(e) => ChangeSelectHandler(e)}
                            onClick={onClick}
                            onSubmit={(e) => onSubmit(e)}
                            title={"Submit new quote"}/>
                    </div>: ""
            }
            {
                location.pathname.split("/")[3] === "edit" ?
                    <>
                        <Loader active={loader}/>
                        <div className={!loader?"formContainer":"none"}>
                            <h1 className={alert ? "show" : "none"}>Заполните все поля</h1>
                            <Form
                                ChangeAuthor={(e) => ChangeAuthorHandler(e)}
                                ChangeQuote={(e) => ChangeQuoterHandler(e)}
                                onChangeSelect={(e) => ChangeSelectHandler(e)}
                                onClick={onClickEdit}
                                valueSelect={select}
                                valueAuthor={author}
                                valueQuote={quoter}
                                onSubmit={(e) => onSubmit(e)}
                                title={"Edit a quote"}/>
                        </div>
                    </>: ""
            }
        </>
    )
}