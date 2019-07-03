import * as React from "react";
import {Component, ReactNode} from "react";
import {MapWrapper} from "./pages/map";
// import Loadable, { OptionsWithoutRender } from "react-loadable";
import {Route, Router, Switch} from "react-router";
import {createBrowserHistory} from "history";
// import {Loading} from "./components/loading";
import {Login} from "./pages/login";
import {observer, Provider} from "mobx-react";
import {stores, UserContext} from "./connector/AppContext";

/*const AsyncMap = Loadable(({
    loader: () => import("./pages/map"),
    loading: Loading,
} as unknown) as OptionsWithoutRender<RouteComponentProps>);

const AsyncLogin = Loadable(({
    loader: () => import("./pages/login").then(module => module.Login),
    loading: Loading,
} as unknown) as OptionsWithoutRender<RouteComponentProps>);*/

export const appHistory = createBrowserHistory();

@observer
export class App extends Component {
    constructor(props: object) {
        super(props);
        UserContext().login();
    }

    render(): ReactNode {
        return (
            <Provider {...stores}>
                <Router history={appHistory}>
                    <div className="App" style={{height: "100vh"}}>
                        <Switch>
                            <Route path={"/login"} exac={true} component={Login}/>
                            <Route path={"/"} exac={true} component={MapWrapper}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
