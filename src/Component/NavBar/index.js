import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import NavButton from '../NavButton'

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

const BrandWrapper = styled.div`
    a{
        text-decoration: none;
        color: #eee;
        font-size: 22px;
    }
`

class NavBar extends React.Component {
    render() {
        return(
            <Header>
                <NavWrapper>
                    <Navbar bg="primary" variant="dark">
                        <BrandWrapper>
                            <Link to="/">Viajar</Link>
                        </BrandWrapper>
                        
                        <Nav className={`justify-content-end w-100 mr-2 ${this.props.profileVisibility}`}>
                            <NavButton href="/profile" name="Meu Perfil"/>
                        </Nav>
                        <Nav className={`justify-content-end ${this.props.contactusVisibility}`}>
                            <NavButton href="/contactus" name="Ajuda"/>
                        </Nav>
                            
                    </Navbar>
                </NavWrapper>
            </Header>
        )
    }
}

export default NavBar;