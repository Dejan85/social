import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';

// private route
import PrivateRoute from './auth/PrivateRoute';

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      {/* private route */}
      <PrivateRoute exact path='/user/edit/:userId' component={EditProfile} />
      <PrivateRoute exact path='/user/:userId' component={Profile} />
      <PrivateRoute exact path='/findpeople' component={FindPeople} />
      <PrivateRoute exact path='/post/create' component={NewPost} />

      {/* public route */}
      <Route exact path='/' component={Home} />
      <Route exact path='/post/:postId' component={SinglePost} />
      <Route exact path='/users' component={Users} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/signin' component={Signin} />
    </Switch>
  </div>
);

export default MainRouter;
