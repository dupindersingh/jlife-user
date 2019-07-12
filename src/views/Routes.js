// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Account from './account/Account'
import Error from './misc/Error'
import Signup from './account/Signup'
import Login from './account/Login';
import Menu from './menu/Menu';
import Members from './members/Members';
import Teams from './teams/Teams';
import TeamDetails from './teams/TeamDetails';
import Discover from './Discover/Discover'
import Define from './Define/Define';
import ComingSoon from './misc/ComingSoon';
import ResetPassword from './account/ResetPassword';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/menu" component={Menu} />
    <Route path="/members" component={Members}/>
    <Route exact path="/teams" component={Teams}/>
    <Route exact path="/teams/:team/details" component={TeamDetails}/>
    <Route exact path="/discover" component={Discover} />
    <Route exact path="/define" component={Define} />
    <Route path="/account" component={Account} />
    <Route path="/detail" component={ComingSoon} />
    <Route path="/design" component={ComingSoon} />
    <Route path="/discipline" component={ComingSoon} />
    <Route component={Error} />
  </Switch>
)

export default Routes
