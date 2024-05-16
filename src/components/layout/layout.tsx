import "./layout.css"
import {NavLink, Outlet} from "react-router-dom";
export const Layout = () => {
    return (
        <>
            <header>
                <h1>Quotes Central</h1>
                <nav>
                    <NavLink to={"/"}>Quotes</NavLink>
                    <NavLink to={"/add-quote"}>Submit new quote</NavLink>
                </nav>
            </header>
            <div className="contentContainer">
                <div className="navigation">
                    <ul>
                        <li>
                            <NavLink to={"/"}>All</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/quotes/star-wars"}>Star Wars</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/quotes/famous-people"}>Famous People</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/quotes/saying"}>Saying</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/quotes/humour"}>Humour</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/quotes/motivational"}>Motivational</NavLink>
                        </li>
                    </ul>
                </div>
                <Outlet/>
            </div>
        </>
    )
}