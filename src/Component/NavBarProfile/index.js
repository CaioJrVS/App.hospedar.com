import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styled from 'styled-components'

const Header = styled.div`
    width: 100%;
    background-color: #007bff;

    @media (min-width: 1400px) {
        padding-left: 250px;
    }
`

const NavWrapper = styled.div`
    max-width: 1350px;
`

class NavBarProfile extends React.Component {
    render() {
        return(
            <Header>
                <NavWrapper>
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand href="/">Viajar</Navbar.Brand>
                        
                        <Nav className="justify-content-end w-100 mr-2">
                            <Button href="/profile" variant="outline-light">Meu perfil</Button>
                            <Button href="/contactus" variant="outline-light">Ajuda</Button>
                            
                        </Nav>
                            
                    </Navbar>
                </NavWrapper>
            </Header>
        )
    }
}

export default NavBarProfile;