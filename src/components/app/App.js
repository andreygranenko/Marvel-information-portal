import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";

const App = () => {



    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path='/comics'>
                            <ComicsPage/>
                        </Route>
                        <Route exact path='/'>
                            <MainPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )

}

export default App;