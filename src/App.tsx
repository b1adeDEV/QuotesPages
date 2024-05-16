import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/layout.tsx";
import {AppContainers} from "./containers/AppContainers/Appcontainers.tsx";
import {FormContainers} from "./containers/FormContainers/FormContainers.tsx";
import {CategoryContainers} from "./containers/CategoryContainers/CategoryContainers.tsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.tsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route index element={<AppContainers/>} />
                <Route path={"/quotes"} element={<CategoryContainers/>}>
                    <Route path={"star-wars"} element={<CategoryContainers/>} />
                    <Route path={"famous-people"} element={<CategoryContainers/>} />
                    <Route path={"saying"} element={<CategoryContainers/>} />
                    <Route path={"humour"} element={<CategoryContainers/>} />
                    <Route path={"motivational"} element={<CategoryContainers/>} />
                </Route>
                <Route path={'/quotes/:id/edit'} element={<FormContainers/>}/>
                <Route path={"/add-quote"} element={<FormContainers/>}/>
            </Route>
            <Route path={"*"} element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
