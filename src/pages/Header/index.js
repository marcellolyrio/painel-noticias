import React, { Component } from "react";
import { logout } from "../../services/auth";
import { Icon } from "react-materialize";
import "./styles.css";

class Header extends Component{
  
  handleLogout = async () => {
    
    logout();
   
  }

  render() {
      return (
        <div className="container-fluid">
          <nav>
            <div class="nav-wrapper purple darken-3">
              <a href="#!" class="logo">Painel de Notícias</a>
              <a href="#!" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
              <ul class="right hide-on-med-and-down">
                <li>
                    <a href="#!" onClick={this.handleLogout}>
                    <Icon left>
                    exit_to_app
                    </Icon>
                    Sair</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
}

export default Header;