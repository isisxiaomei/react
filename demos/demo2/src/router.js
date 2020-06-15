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
import HighTable from './pages/table/highTable'
import City from './pages/city/index';
import Order from './pages/order/index';
import User from './pages/user/index';
import Rich from './pages/rich/index';
import BikeMap from './pages/bikeMap/index';
import OrderDetail from './pages/order/detail'
import Bar from './pages/echarts/bar/index';
import Pie from './pages/echarts/pie/index';
import Line from './pages/echarts/line/index';
import Permission from './pages/permission/index';
import Common from './common';

class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        } />
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notices} />
                                    <Route path="/ui/message" component={Messages} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/tabs" component={Tabs} />
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/registor" component={Registor} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route path="/rich" component={Rich} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/user" component={User} />
                                    <Route path="/bikeMap" component={BikeMap} />
                                    <Route path="/echarts/bar" component={Bar} />
                                    <Route path="/echarts/pie" component={Pie} />
                                    <Route path="/echarts/line" component={Line} />
                                    <Route path="/permission" component={Permission} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}


export default IRouter;