import React from 'react';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'

const NavWrapper = styled.div`
    max-width: 1400px;
`

class HomeNavBar extends React.Component {
    render() {
        return(
            <NavWrapper>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/">Hospedar</Navbar.Brand>
                    
                    <Nav className="justify-content-end w-100">
                        <Button href="/login" variant="outline-light">Iniciar Sessão</Button>
                    </Nav>
                         
                </Navbar>
            </NavWrapper>
        )
    }
}

export default HomeNavBar;