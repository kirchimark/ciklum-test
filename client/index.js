import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import { createStore,  combineReducers, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory';
import {Route, Switch } from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware, push, goBack} from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import ArticlePage from './containers/ArticlePage';
import ResultPage from './containers/ResultPage';

const history = createHistory();
const routerMiddle = routerMiddleware(history)


let AppReducers = combineReducers({
    ...reducers,
    router: routerReducer,
});

let store = createStore(AppReducers, compose(applyMiddleware(thunk ,routerMiddleware(history))));

class Layout extends React.Component {
    render() {
        return (<ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/fb" component={ArticlePage} exact/>
                    <Route exact path="/fb/results" component={ResultPage} exact />
                </Switch>
            </ConnectedRouter>)
    }
}

const LayoutRedux = connect((state) => ({}) ,(dispatch) => ({}))(Layout)

ReactDOM.render(
        <Provider store={store}>
            <LayoutRedux />
        </Provider>,
document.getElementById('app'));