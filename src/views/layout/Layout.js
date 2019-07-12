// this Layout component wraps every page with the app header on top
// check out App.js to see how it's used

import React from 'react'
import Intercom from 'react-intercom'
import firebase from 'firebase'
import FirebaseAuth from '../misc/FirebaseAuth'
import {
  HeaderFooterWrapper,
} from '../../styles/layout'
import './HeaderStyles.css'
import {
  HeaderLink,
} from '../../styles/links'
import {
  Redirect,
} from "react-router-dom";

async function userInfo() {
  let info = {}
  firebase.auth().onAuthStateChanged(function(user) {
    info["email"] = user.email;
    info["name"] = user.displayName
  })
  return info;
}

const Layout = ({ children }) => (
  <HeaderFooterWrapper>

    <div className="header">
      <div className="headerNav">
        <HeaderLink to="/" className="navTitle w-nav">JourneyLIFE</HeaderLink>
        <FirebaseAuth>
          {({ isLoading, error, auth }) => {
            if (isLoading) {
              return null
            }
            if (error) {
              return '⚠️ login error'
            }
            if (auth) {
              if (window.location.pathname === "/") {
                return <Redirect to={{ pathname: "/menu" }} />
              } else {
                return <div className="navBar">
                  <HeaderLink to="/menu" className="nav-link">
                  <img src={require(`../../media/homeIcon.png`)} className="navIcon" alt={'home icon'} />
                  </HeaderLink>
                  <HeaderLink to={`/members`} className="nav-link">
                    <img src={require("../../media/members.svg")} className="navIcon" alt={'members icon'} />
                  </HeaderLink>
                  <HeaderLink to={`/teams`} className="nav-link">
                    <img src={require(`../../media/team.svg`)} className="navIcon" alt={'teams icon'} />
                  </HeaderLink>
                  <HeaderLink to={`/account`} className="nav-link">
                    <img src={require(`../../media/accountIcon.png`)} className="navIcon" alt={'account icon'} />
                  </HeaderLink>
                </div>
              }
            } else if (window.location.pathname === "/signup" || window.location.pathname === "/reset-password") {
              return null
            } else if (window.location.pathname !== "/") {
              return <Redirect to={{ pathname: "/" }} />
            } else {
              return null;
            }
          }}
        </FirebaseAuth>
      </div>
    </div>

    {children}
    
    <Intercom appID="mh0y5kvx" {...userInfo}/>
  </HeaderFooterWrapper>
)

export default Layout
