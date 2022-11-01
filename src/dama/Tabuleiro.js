import React from 'react';
import Quadro from './Quadro';
import './Tabuleiro.css'
class Tabuleiro extends React.Component 
{
    constructor(props) 
    {
        super(props);

        this.state = {
            tabuleiro: [
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0]
            ],
            vez: 'Jogue',
            criar_tabuleiro: props.criarTabuleiro
        }
        this.novo_tabuleiro = this.state.tabuleiro
        this.clearAll = this.clearAll.bind(this)
    }
    clearAll(){
        localStorage.clear()
        window.location.reload()
    }
    render() {
        let novo = this.props.criarTabuleiro(this.state.tabuleiro)
        let vez = JSON.parse(localStorage.getItem('dama_antiga'))
        const colorPlayer = (vez) =>{
            let color = ""

            if (vez === 1 ){ color = "azul"}
            else if (vez === 2 ){color = "vermelho"}

            return color
        }
        
        this.setState({
            tabuleiro: novo ?? this.state.tabuleiro,
            vez: vez ?? this.state.vez,
        })

        let x = 0, y = 0;

        const rows = this.state.tabuleiro.map((row) => {
            const r = row.map((n) => {
                return <Quadro x={x} y={y++} n={n} tabu={this.state.tabu}/>
            })

            y = 0;
            x = x + 1;
            return <div className="row">{r}</div>
        });
        return (
            <div className="tabuleiro">
                {rows}
                <div className='area-buttons'>
                    <button className='reniciar' onClick={this.clearAll}>Reniciar</button>
                    <span>
                        <h3 className={colorPlayer(this.state.vez)}>{this.state.vez === 1 ? 'Vez do jogador azul': this.state.vez === 2 ? 'Vez do jogador vermelho' : this.state.vez }</h3>
                    </span>
                </div>
            </div>
        )
    }
}

export default Tabuleiro;