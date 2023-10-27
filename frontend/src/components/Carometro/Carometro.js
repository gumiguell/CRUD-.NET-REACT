import React, { Component } from "react";
import axios from "axios";
import "./Carometro.css"

export default class CarometroPage extends Component {
    state = {
        imagensCarometro: [],
    };

    componentDidMount() {
        this.getAlunos();
    }

    getAlunos() {
        axios.get("http://localhost:5128/api/aluno")
            .then((response) => {
                const alunos = response.data;
                const imagensCarometro = alunos.map((aluno) => aluno.link);
                this.setState({ imagensCarometro });
            })
            .catch((error) => {
                console.error("Erro ao buscar os alunos:", error);
            });
    }

    render() {
        const { imagensCarometro } = this.state;
    
        return (
            <div className="carometro-container">
                {imagensCarometro.map((imagem, index) => (
                    <img
                        key={index}
                        src={imagem}
                        alt={`Imagem do Carômetro ${index}`}
                        className="carometro-image"
                    />
                ))}
            </div>
        );
    }
}    
    
