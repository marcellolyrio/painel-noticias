import React, { Component } from "react";
import Swal from 'sweetalert2';
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
    this.setState();
  }

  deletar = async (id) => {
    
    try {
      await Api.delete(`/messages/${id}`);
      
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
            Swal.fire(
              'Excluído!',
              'Esta mensagem foi excluída.',
              'success', 
            )
            window.location.href ='/App'
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

  editar = async (id) =>{

   const dados = await Api.get(`/messages/${id}`)
          
   const { value: formValues } = await Swal.fire({
            title: 'Editar mensagem',
            html:
              `<input type="text" id="swal-input1" class="swal2-input" value="${dados.data.title}">` +
              `<textarea id="swal-input2" class="swal2-input">${dados.data.message}</textarea>`,
            focusConfirm: false,
            showCancelButton: true,
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
          
      this.setState({
        Posts: messages.map((note) => (
               messages !== '' ? (
                <tr key={note.id}>
                  <td>{note.id} - {note.title}</td>
                  <td>{new Date(note.created_at).toLocaleString()}</td>
                  <td>
                    <a href="#!" onClick={ () => this.editar(note.id)} className="waves-effect waves-light btn-small purple darken-3" id="acoes"><i className="material-icons" id="icones">edit</i></a> 
                    <a href="#!" onClick={ () => this.deletar(note.id)} className="waves-effect waves-light btn-small purple darken-3" id="acoes"><i className="material-icons" id="icones">delete</i></a>
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
        '<input type="text" id="swal-input1" className="swal2-input">' +
        '<textarea id="swal-input2" className="swal2-input"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
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
        <div className="row">
          <div id="man" className="col s12">
            <div className="card material-table">
              <div className="table-header">
                <span className="table-title">Mensagens</span>
                <div className="actions">
                <a href="#!" onClick={ () => this.cadastrar() } className="waves-effect btn-flat nopadding"><i className="material-icons">add</i></a>
                <a href="#!" className="search-toggle waves-effect btn-flat nopadding"><i className="material-icons">search</i></a>
                </div> 
              </div>     
              <table id="datatable">
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
          </div>
        </div>
      );
    }

}

export default List;