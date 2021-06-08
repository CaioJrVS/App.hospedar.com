import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from "styled-components"
import Image from 'react-bootstrap/Image'

import CardButton from '../CardButton'

const CardWrapper = styled.div`
    width: 18rem;
    margin-right: 15px;
    border-radius: 5px;
    border: solid inset 0.5px rgba(173, 173, 173, 0.445);
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    max-height: 286px;

    :hover {
        box-shadow: 5px 5px 11px rgba(33,33,33,.2);
    }

    h5 {
        margin-bottom: 40px;
        max-height: 24px;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ImgWrapper = styled.div`
    height: 150px;
    overflow: hidden;
`

class HomeCard extends React.Component {
    render() {
        return(
            <CardWrapper>
                <Card>
                    <ImgWrapper>
                        <Image src={this.props.src} rounded/>
                    </ImgWrapper>
                    <Card.Body>
                        <h5>Destino: {this.props.city}</h5>
                        <ButtonWrapper>
                            <CardButton href="#" currency={this.props.currency} name={this.props.price}/>
                        </ButtonWrapper>
                        
                    </Card.Body>
                </Card>
            </CardWrapper>    
        )
    }
}

export default HomeCard;