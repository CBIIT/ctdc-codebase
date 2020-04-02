/* eslint-disable */

import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";


export default class Navbar extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  render() {
    const alpahabets = ['A','B','C','D','E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];// 61 bytes
    console.log(alpahabets);
    return (
      <nav className="nav" id="navbar">
        <div className="nav-content">
          {alpahabets && alpahabets.map((alpahabet)=>(<Link
                activeClass="active"
                to={alpahabet}
                spy
                smooth
                offset={-70}
                duration={500}
              >
               {alpahabet}
              </Link>))}
        
        </div>
      </nav>
    );
  }
}