import logo from './logo.svg';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import Login from './Components/Autharization/Login';
import Signup from './Components/Autharization/Signup';
import AuthReducer from './Store/Reducers/AuthReducer';
import BlogsReducer from './Store/Reducers/BlogsReducer';
import Blog from './Components/Product/Blog';
import thunk from 'redux-thunk';
import Home from './Components/Home/Home';

const reducer = combineReducers({Authorization: AuthReducer, Blogs: BlogsReducer});
const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>         
        <Navigation />
        <Switch>
          <Route path='/blog/:id' exact component={Blog} />
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />  
          <Route path='/signup' exact component={Signup} />
        </Switch>
      </Router>
    </Provider>    
  );
}

export default App;
