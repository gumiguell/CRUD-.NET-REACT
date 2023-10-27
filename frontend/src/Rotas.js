import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./components/template/Main";
import CrudAluno from "./components/CrudAluno/CrudAluno";
import Carometro from "./components/Carometro/Carometro"

export default function Rotas() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Main title="Bem vindo!!">
            <div>Cadastro de alunos e cursos</div>
          </Main>
        }
      />

      <Route
        path="/cursos"
        element={
          <Main title="Bem vindo!">
            <div>
              <h2>Lista de Cursos</h2>
                <ul>
                    <li>Alimentos</li>
                    <li>Desenvolvimento de Sistemas</li>
                    <li>Eletroeletrônica</li>
                    <li>Enfermagem</li>
                    <li>Informática</li>
                    <li>Mecatrônica</li>
                    <li>Plásticos</li>
                    <li>Meio Ambiente</li>
                    <li>Segurança do Trabalho</li>
                    <li>Telecomunicações</li>
                    <li>Indústria 4.0</li>
                </ul>
            </div>
          </Main>
        }
      />

      <Route exact path="/alunos" element={<CrudAluno />} />

      <Route exact path="/carometro" element={<Carometro />} />
    </Routes>
  );
}
