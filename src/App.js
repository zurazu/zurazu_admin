import { Route, Switch } from 'react-router';
import Login from 'routes/Login';
import ManageCategory from 'routes/ManageCategory';
import ManageNotice from 'routes/ManageNotice';
import ManageItem from 'routes/ManageItem';
import NotFound from 'routes/NotFound';
import Register from 'routes/Register';
import Home from './routes/Home';
import ManageItemDetail from 'routes/ManageItemDetail';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/category" component={ManageCategory} />
      <Route path="/notice" component={ManageNotice} />
      <Route path="/item/:idx" component={ManageItemDetail}/>
      <Route path="/item" component={ManageItem} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
