import { Route, Switch } from 'react-router';
import Login from 'routes/Login';
import NotFound from 'routes/NotFound';
import Register from 'routes/Register';
import Home from './routes/Home';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
