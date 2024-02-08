import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SingleCharacterPage from "../pages/SingleCharacterPage";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const App = () => {



    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path={'/comics/:comicId'} element={<SingleComicPage/>}/>
                            <Route path={'/characters/:charId'} element={<SingleCharacterPage/>}/>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path={'*'} element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;