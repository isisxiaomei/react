import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/login/login';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notices from './pages/ui/notices';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs'
import NoMatch from './pages/nomatch/nomatch';
import FormLogin from './pages/form/login'
import Registor from './pages/form/regisitor'
import BasicTable from './pages/table/basicTable'
class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notices} />
                                <Route path="/admin/ui/message" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
                                <Route path="/admin/form/login" component={FormLogin} />
                                <Route path="/admin/form/registor" component={Registor} />
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    {/* <Route path="/order/detail" component={Login} /> */}
                </App>
            </HashRouter>
        );
    }
}


export default IRouter;