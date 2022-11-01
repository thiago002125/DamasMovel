import React from 'react';
import { destinoBackup, origemBackup, saveDestino, saveOrigem } from './NovoTabuleiro/NovaTabela';
import './Quadro.css';

class Quadro extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tabuleiro_recebido: props.tabu,
            origem: {
                x: props.y,
                y: props.x,
                n: props.n === 1 | props.n === 2 ? props.n : props.x % 2 === 0 ? props.y % 2 !== 0 ? "preto" : "branco" : props.y % 2 === 0 ? "preto" : "branco"
            },
            destino: {
                x: props.y,
                y: props.x,
            },
        }

        this.getOrigem = this.getOrigem.bind(this)
        this.getDestino = this.getDestino.bind(this)
        
    }
    getDestino (){
        if (this.state.origem.n !== 1 | this.state.origem.n !== 2 && this.state.origem.n === "preto"){
            this.setState({
                destino: {
                    x: this.state.destino.y,
                    y: this.state.destino.x
                }
            })
            console.log('destino primeiro IF',this.state.destino);

            saveDestino(this.state.destino)
            destinoBackup(this.state.destino)
            return this.state.destino
        }if (this.state.origem.x === this.state.destino.y && this.state.origem.y === this.state.destino.x){
            this.setState({
                destino: {
                    x: this.state.destino.y,
                    y: this.state.destino.x
                }
            })
            localStorage.removeItem('destino')
            saveDestino(this.state.destino)
            destinoBackup(this.state.destino)
        }
    }
    getOrigem(){
        let origem_backup = JSON.parse(localStorage.getItem('origem_backup'))
        let dama_antiga = JSON.parse(localStorage.getItem('dama_antiga'))
        if (this.state.origem.n === 1 | this.state.origem.n === 2 && this.state.origem.n !== "preto"){
            this.setState({
                origem: {
                    x: this.state.origem.y,
                    y: this.state.origem.x,
                    n: this.state.origem.n
                },
            })
            saveOrigem(this.state.origem)
            origemBackup(this.state.origem)
            return this.state.origem
        }
        if (this.state.origem.x !== origem_backup.x && this.state.origem.y !== origem_backup.y){
            // console.log('origem da peça que já foi jogada getOrigem',{
            //     x: this.state.origem.x,
            //     y: this.state.origem.y,
            //     n: origem_backup.n === 1 ? 2 : 1
            // });

            localStorage.removeItem('destino')
            this.setState({
                origem: {
                    x: this.state.origem.x,
                    y: this.state.origem.y,
                    n: origem_backup.n === 1 ? 2 : origem_backup.n === "preto" ? dama_antiga === 1 ? 1 : 2 : 1 
                },
            })
            origemBackup(this.state.origem)
        }
        console.log('getOrigem',this.state.origem);
    }
    
    render() {
        const colorSquare = (x, y) => {
            let color = "";

            if (x % 2 === 0) {
                color = (y % 2 !== 0 ? "painted" : "")
            } else {
                color = (y % 2 === 0 ? "painted" : "")
            }

            return color;
        }

        const ficha = (n) => {
            let fix = "";

            if (n === 1) {
                fix = <div onClick={this.getOrigem} className="disk team-a"></div>
            }
            else if (n === 2) {
                fix = <div onClick={this.getOrigem} className="disk team-b"></div>
            }

            return fix;
        }

        return (
            <div onClick={this.getDestino}  className={"square " + colorSquare(this.props.x, this.props.y)} x={this.props.x} y ={this.props.y}>{ficha(this.props.n)}</div>
        );
    }
}

export default Quadro;