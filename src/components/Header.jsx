import React, { Component } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";

class Header_Section extends Component {
  componentDidMount() {
    //this query is used to detect navbar location and turn it into fixed positon on Scroll
    $(function() {
      $(document).scroll(function() {
        var $nav = $(".nav-bar");
        $nav.toggleClass("black", $(this).scrollTop() > $nav.height());
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <nav className="nav-bar">
            <div className="logo">
                <h3>
                  Rise<sup>UP</sup>Summit
                </h3>
            </div>
          <ul className="menu-items">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Crowd</a>
            </li>
            <li>
              <a href="#">Agenda</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li className="icon">
              <a>
                <i className="fa fa-bars" />
              </a>
            </li>
          </ul>
        </nav>
        <section className="agenda-banner">
        </section>
      </React.Fragment>
      
    );
  }
}

export default Header_Section;
