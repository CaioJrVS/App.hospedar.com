import React from 'react';
import styled from 'styled-components'

import Card from 'react-bootstrap/Card'
import LinkButton from '../LinkButton'

const MyFlightWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    border: solid 0.5px rgba(173, 173, 173, 0.645);
    justify-self: center;
    margin-bottom: 20px;
    color: #222;
    max-height: 250px;
`

const ImgWrapper = styled.div`
    width: 250px;
    max-height: 260px;
    overflow: hidden;
`

const DescriptionWrapper = styled.div`
    width: 250px;
    padding: 20px;
    height: 228px;

    display:flex;
    flex-direction: column;
    justify-content: space-around;

    h3 {
        margin-bottom: 20px;
    }
`

const PriceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    height: 130px;

    p {
        font-family: inherit;
        margin: 0;
        padding: 0;
    }
`

class MyFlight extends React.Component {
    render() {
        return(
                <MyFlightWrapper>
                    <ImgWrapper>
                        <Card.Img variant="bottom" src={this.props.logo} />
                    </ImgWrapper>

                    <DescriptionWrapper>
                        <h5>Origem: {this.props.origem}</h5>
                        <h5>Destino: {this.props.destino}</h5>
                        
                        <p>Preço = RS 999,99</p>

                        <LinkButton href="/" name="Alterar Vôo" fields={this.props.state}/> 
                    </DescriptionWrapper>
                </MyFlightWrapper>
        )
    }
}

export default MyFlight;