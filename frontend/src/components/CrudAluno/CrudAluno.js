import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";
import "./CrudAluno.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom'

const title = "Cadastro de Alunos";

export default class CrudAluno extends Component {
    state = {
        alunos: [],
        alunoParaEditar: {
            id: null,
            ra: "",
            nome: "",
            codCurso: "",
            link: ""
        },
        alunoParaCriar: {
            ra: "",
            nome: "",
            codCurso: "",
            link: ""
        },
        editandoAluno: false,
        criandoAluno: false,
        exibirCarometro: false, // Estado para controlar a visibilidade do Carômetro
    };

    componentDidMount() {
        this.getAlunos();
    }

    getAlunos() {
        axios.get("http://localhost:5128/api/aluno")
            .then((response) => {
                this.setState({ alunos: response.data });
            })
            .catch((error) => {
                console.error("Erro ao buscar os alunos:", error);
            });
    }

    createAluno(novoAluno) {
        axios.post("http://localhost:5128/api/aluno", novoAluno)
            .then(() => {
                this.getAlunos();
                this.setState({ criandoAluno: false, alunoParaCriar: {} });
            })
            .catch((error) => {
                console.error("Erro ao criar aluno:", error);
            });
    }

    editAluno(alunoEditado) {
        axios.put(`http://localhost:5128/api/aluno/${alunoEditado.id}`, alunoEditado)
            .then(() => {
                this.getAlunos();
                this.setState({ editandoAluno: false, alunoParaEditar: {} });
            })
            .catch((error) => {
                console.error("Erro ao editar aluno:", error);
            });
    }

    deleteAluno(alunoId) {
        axios.delete(`http://localhost:5128/api/aluno/${alunoId}`)
            .then(() => {
                this.getAlunos();
            })
            .catch((error) => {
                console.error("Erro ao excluir aluno:", error);
            });
    }

    renderTable() {
        const { alunos } = this.state;

        return (
            <div className="tituloListagem">
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Ra</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloCurso">Curso</th>
                            <th className="tabTituloAcoes">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td className="table-cell">{aluno.ra}</td>
                                <td className="table-cell">{aluno.nome}</td>
                                <td className="table-cell">{aluno.codCurso}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => this.setState({ editandoAluno: true, alunoParaEditar: aluno })}
                                    >
                                        Editar
                                    </button>{" "}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => this.deleteAluno(aluno.id)}
                                    >
                                        Excluir
                                    </button>{" "}
                                    <Link to="/carometro" className="btn btn-primary">
                                        Carômetro
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className="btn btn-success"
                    onClick={() => this.setState({ criandoAluno: true })}
                >
                    Adicionar Aluno
                </button>
            </div>
        );
    }
    

    renderAlunoForm() {
        if (this.state.editandoAluno) {
            const { alunoParaEditar } = this.state;
            return (
                <div>
                    <h3>Editar Aluno</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="ra">Ra:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="ra"
                                name="ra"
                                value={alunoParaEditar.ra}
                                onChange={(e) => this.handleEditInputChange(e, "ra")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={alunoParaEditar.nome}
                                onChange={(e) => this.handleEditInputChange(e, "nome")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="codCurso">Código do Curso:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="codCurso"
                                name="codCurso"
                                value={alunoParaEditar.codCurso}
                                onChange={(e) => this.handleEditInputChange(e, "codCurso")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">Link:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="link"
                                name="link"
                                value={alunoParaEditar.link}
                                onChange={(e) => this.handleEditInputChange(e, "link")}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => this.editAluno(alunoParaEditar)}>Salvar</button>{" "}
                        <button className="btn btn-secondary" onClick={() => this.setState({ editandoAluno: false })}>Cancelar</button>
                    </form>
                </div>
            );
        } else if (this.state.criandoAluno) {
            const { alunoParaCriar } = this.state;
            return (
                <div>
                    <h3>Adicionar Aluno</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="ra">Ra:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="ra"
                                name="ra"
                                value={alunoParaCriar.ra}
                                onChange={(e) => this.handleCreateInputChange(e, "ra")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={alunoParaCriar.nome}
                                onChange={(e) => this.handleCreateInputChange(e, "nome")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="codCurso">Código do Curso:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="codCurso"
                                name="codCurso"
                                value={alunoParaCriar.codCurso}
                                onChange={(e) => this.handleCreateInputChange(e, "codCurso")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">Link:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="link"
                                name="link"
                                value={alunoParaCriar.link}
                                onChange={(e) => this.handleCreateInputChange(e, "link")}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => this.createAluno(alunoParaCriar)}>Continuar</button>{" "}
                        <button className="btn btn-secondary" onClick={() => this.setState({ criandoAluno: false })}>Cancelar</button>
                    </form>
                </div>
            );
        }
    }

    handleEditInputChange(e, field) {
        const { alunoParaEditar } = this.state;
        this.setState({
            alunoParaEditar: {
                ...alunoParaEditar,
                [field]: e.target.value,
            },
        });
    }

    handleCreateInputChange(e, field) {
        const { alunoParaCriar } = this.state;
        this.setState({
            alunoParaCriar: {
                ...alunoParaCriar,
                [field]: e.target.value,
            },
        });
    }

    render() {
        return (
            <Main title={title}>
                {this.renderTable()}
                {this.renderAlunoForm()}
            </Main>
        );
    }
}
