import React, { Component } from "react";
import 'materialize-css';
//import { Button, Icon} from 'react-materialize';
import { Container } from "./styles";
import  Header  from "../Header";
import  Footer  from "../Footer";
import List from "../List";


class Main extends Component {
  render() {
    return (
      <Container>
        <Header />
        <List />
        <Footer />
      </Container>
    );
  }
}
export default Main;