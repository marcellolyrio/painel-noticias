import React, { Component } from "react";
import Swal from 'sweetalert2';
//import { useHistory } from "react-router-dom";
import   Api   from "../../services/api";
import "./styles.css";




class List extends Component{

  constructor() {
    super()
    this.state = {
      Posts: ""
     
    }
  }

  componentDidMount() {
    this.listar();
    
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
            'Excluído!',
            'Esta mensagem foi excluída.',
            'success',
            
          )
        }
        window.location.href ='/App'
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

  editar = async (id) =>{
   const dados = await Api.get(`/messages/${id}`)
          
   const { value: formValues } = await Swal.fire({
            title: 'Editar mensagem',
            html:
              `<input type="text" id="swal-input1" class="swal2-input" value="${dados.data.title}">` +
              `<textarea id="swal-input2" class="swal2-input">${dados.data.message}</textarea>`,
            focusConfirm: false,
            preConfirm: () => {
              return {
                title: document.getElementById('swal-input1').value,
                message: document.getElementById('swal-input2').value
              }
            }
          })
          
          if (formValues) {
            await Api.put(`/messages/${id}`, formValues);
      
               await Swal.fire({
                  text: "Mensagem atualizada com sucesso.",
                  icon: 'success',
                })
                window.location.href ='/App'
                
          }

  }

  listar = async() => {
    try {
      let res = await Api.get("/messages");
      let messages = res.data;
      // this will re render the view with new data
     
      this.setState({
        Posts: messages.map((note) => (
               messages !== '' ? (
                <tr key={note.id}>
                  <td>{note.id} - {note.title}</td>
                  <td>{new Date(note.created_at).toLocaleString()}</td>
                  <td>
                    <a href="#!" onClick={ () => this.editar(note.id)} className="waves-effect waves-light btn-small purple darken-3 modal-trigger" id="acoes"><i className="material-icons">edit</i></a> 
                    <a href="#!" onClick={ () => this.deletar(note.id)} className="waves-effect waves-light btn-small purple darken-3" id="acoes"><i className="material-icons">delete</i></a>
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

  cadastrar = async () =>{
   
    const { value: formValues } = await Swal.fire({
      title: 'Cadastrar mensagem',
      html:
        '<input type="text" id="swal-input1" class="swal2-input">' +
        '<textarea id="swal-input2" class="swal2-input"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById('swal-input1').value,
          message: document.getElementById('swal-input2').value
        }
      }
    })
    
    if (formValues) {
      await Api.post('/messages', formValues);

         await Swal.fire({
            text: "Mensagem cadastrada com sucesso.",
            icon: 'success',
          })
          window.location.href ='/App'
          
    }
  }
  
  render() {
      return (
        <div className="container">
          <div className="adicionar">
          <a href="#!" onClick={ () => this.cadastrar() } className="waves-effect waves-light btn-floating purple darken-3"><i className="material-icons">add</i></a>
          </div>
          <table className="responsive-table">
          <thead>
            <tr>
                <th>Titulo</th>
                <th>Criada em</th>
                <th>Ações</th>
            </tr>
          </thead>
          <tbody>{this.state.Posts}</tbody>
        </table>
        </div>
      );
    }

}

export default List;