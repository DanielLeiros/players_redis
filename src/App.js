import React, {Component} from 'react';
import './App.js.css';
import Servico from "./Servico.js";

class App extends Component {
  
  constructor(){
    super()
    this.servico = new Servico();
    this.state = {
      doing:"add",
      nome: "",
      pontos: "",
      mensagem: null,
      listagem: [],
      posicao: ""
    };
  }

    ranking = () =>{
        this.servico.getRanking().then(response => {this.setState({listagem: response})})
    }

    byPosicao = (posicao) =>{
        this.servico.getByPosition(posicao).then(response => {this.setState({mensagem: response})})
    }

    listagem = (posicao) =>{
        this.servico.listagem().then(response => {this.setState({listagem: response})})
    }

    entrarPontos = (nome, pontos) =>{
        console.log(nome, pontos)
        this.servico.adicionarPontos(nome, pontos).then(response => {
            response === "OK" ? 
                this.setState({
                    nome: "",
                    pontos: "",
                    mensagem: "OK",
                }) :
                this.setState({
                    mensagem: "Não foi possível realizar a operação, tente novamente mais tarde :)",
                })
        })
    }

    incrementar = (nome, pontos) =>{
        console.log(nome, pontos)
        this.servico.incrementar(nome, pontos).then(response => {
            response ? 
                this.setState({
                    nome: "",
                    pontos: "",
                    mensagem: "OK",
                    listagem: response
                }) :
                this.setState({
                    mensagem: "Não foi possível realizar a operação, tente novamente mais tarde :)",
                })
        })
    }




  render() {
    const {doing, mensagem, listagem} = this.state;
    var {nome, pontos, posicao} = this.state;
    
    const adicionarJogador = 
       (
          <div id="formzinho">
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(val)=> {this.setState({nome : val.target.value})}}/>
            <label>Pontos:</label>
            <input type="number" value={pontos} onChange={(val)=>this.setState({pontos : val.target.value})}/>
            <button onClick={()=> nome && pontos ? this.entrarPontos(nome, pontos) : null}>Enter</button>
            {mensagem ? <div>{mensagem}</div> : null}
          </div>
        )

    const topTen = 
       (
          <div id="formzinho">
              <strong><u>Top 10</u></strong>
            {listagem?
             listagem.map((e, key) => {
                return <div key={key}>{e.nome + " - " + e.pontos}</div>
            }): null}
          </div>
        )

    const detalhar = 
       (
          <div id="formzinho">
            <label>Posicao:</label>
            <input type="number" value={posicao} onChange={(val)=>this.setState({posicao : val.target.value})}/>
            <button onClick={()=> posicao ? this.byPosicao(posicao) : null}>Enter</button>
            {mensagem ? mensagem.nome ? 
                <div>{mensagem.posicao +"º "+ mensagem.nome +" - "+ mensagem.pontos }</div> 
                : <div>"Não há registro para essa posição"</div> : null}
          </div>
        )

    const incrementar = 
       (
          <div id="formzinho">
            <div><label>Nome:</label></div>
            <input type="text" value={nome} onChange={(val)=> {this.setState({nome : val.target.value})}}/>
            <div><label>Incremento/Decremento('-' antes do digito):</label></div>
            <input type="number" value={pontos} onChange={(val)=>this.setState({pontos : val.target.value})}/>
            <button onClick={()=> nome && pontos ? this.incrementar(nome, pontos) : null}>Enter</button>
            {listagem ?
             listagem.map((e, key) => {
                return <div key={key}>{e.nome + " -> " + e.pontos}</div>
            }): null}
          </div>
        )

    return (
      <div className="App">
        <span onClick={()=> this.setState({doing: 'add', mensagem: null})}>
            Adicionar jogador
        </span>
        <span onClick={()=> {this.setState({doing: 'incrementar',mensagem: null}); this.listagem()}}>
            Incrementar Pontuação
        </span>
        <span onClick={()=> this.setState({doing: 'detalhar', mensagem: null})}>
            Por posição
        </span>
        <span onClick={()=>{ this.setState({doing: 'topTen', mensagem: null}); this.ranking()}}>
            Top 10
        </span>
        { doing === "add" ? adicionarJogador : doing === "topTen" ? topTen: doing === "detalhar" ? detalhar : 
        doing === "incrementar" ? incrementar : null}
      </div>
    );
  }
}  

export default App;