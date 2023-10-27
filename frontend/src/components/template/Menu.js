import React from 'react'
import './Menu.css'
import {Link} from 'react-router-dom'

export default function Menu(props) {
    return(
        <nav className = "menu">
            <Link to="/alunos">
                Alunos
            </Link>

            <Link to="/cursos">
                Cursos
            </Link>

            <Link to="/carometro">
                Carometro
            </Link>
        </nav>
    )
}