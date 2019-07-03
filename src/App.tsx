import * as React from "react";
import {MapWrapper} from "./pages/map";
// import Loadable, { OptionsWithoutRender } from "react-loadable";
import {Route, Router, Switch} from "react-router";
import {createBrowserHistory} from "history";
// import {Loading} from "./components/loading";
import {Login} from "./pages/login";

/*const AsyncMap = Loadable(({
    loader: () => import("./pages/map"),
    loading: Loading,
} as unknown) as OptionsWithoutRender<RouteComponentProps>);

const AsyncLogin = Loadable(({
    loader: () => import("./pages/login").then(module => module.Login),
    loading: Loading,
} as unknown) as OptionsWithoutRender<RouteComponentProps>);*/

const history = createBrowserHistory();

export const App: React.FC = () => {
    return (
        <Router history={history}>
            <div className="App" style={{height: "100vh"}}>
                <Switch>
                    <Route path={"/map"} exac={true} component={MapWrapper}/>
                    <Route path={"/login"} exac={true} component={Login}/>
                </Switch>
            </div>
        </Router>
    );
};
