import React, { Component } from "react";
import Swal from 'sweetalert2';
//import { useHistory } from "react-router-dom";
import   Api   from "../../services/api";
import "./styles.css";




class List extends Component{

  constructor() {
    super()
    this.state = {
      Posts: "",
      showModal: false
    }
  }

  componentDidMount() {
    this.renderPosts();
    
  }

  deletar = async (id) => {
    
    try {
      
      Swal.fire({
        title: '',
        text: "Deseja excluir esta Mensagem?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6a1b9a',
        cancelButtonColor: '#ba68c8',
        confirmButtonText: 'Excluir'
      }).then((result) => {
        if (result.value) {
          Api.delete(`/messages/${ id }`);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
            
          )
        }
      })
      
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: 'Não foi possível excluir.',
        icon: 'error',
        confirmButtonText: 'ok'
      })
      
    }
    
  }

  renderPosts = async() => {
    try {
      let res = await Api.get("/messages");
      let messages = res.data;
      // this will re render the view with new data
     
      this.setState({
        Posts: messages.map((note) => (
          
              messages !== '' ? (
                <tr>
                  <td>{note.id} - {note.title}</td>
                  <td>{new Date(note.created_at).toLocaleString()}</td>
                  <td>
                    <a href="#modal1" class="waves-effect waves-light btn-small purple darken-3 modal-trigger" id="acoes"><i class="material-icons">edit</i></a> 
                    <a href="#!" onClick={ () => this.deletar(note.id)} class="waves-effect waves-light btn-small purple darken-3" id="acoes"><i class="material-icons">delete</i></a>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td><p>Nenhuma mensagem!</p></td>
                </tr>
              )
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  render() {
      return (
        <div className="container">
          <div class="adicionar">
          <a href="#!" class="waves-effect waves-light btn-floating purple darken-3"><i class="material-icons">add</i></a>
          </div>
          <table class="responsive-table">
          <thead>
            <tr>
                <th>Titulo</th>
                <th>Criada em</th>
                <th>Ações</th>
            </tr>
          </thead>

          <tbody>
          {this.state.Posts}
          </tbody>
        </table>
        </div>
      );
    }
}

export default List;