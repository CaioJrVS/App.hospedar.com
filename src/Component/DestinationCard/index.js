import React from 'react';
import styled from 'styled-components'

import Card from 'react-bootstrap/Card'
import LinkButton from '../LinkButton'

const DestinationCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    border: solid 0.5px rgba(173, 173, 173, 0.645);
    justify-self: center;
    margin-bottom: 20px;
    transition: 0.3s;

    :hover {
        box-shadow: 5px 5px 11px rgba(33,33,33,.2);
    }
`

const ImgWrapper = styled.div`
    width: 250px;
    max-height: 260px;
    overflow: hidden;
`

const DescriptionWrapper = styled.div`
    width: 250px;
    padding: 20px;
    margin-top: 20px;

    h3 {
        margin-bottom: 20px;
    }
`

const FlightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    height: 130px;

    p {
        margin-bottom: 5px;
    }
`

class DestinationCard extends React.Component {
    render() {
        return(
                <DestinationCardWrapper>
                    <ImgWrapper>
                        <Card.Img variant="bottom" src={this.props.logo} />
                    </ImgWrapper>

                    <DescriptionWrapper>
                        <h4>{this.props.name}</h4>
                        <h5>De: {this.props.origem}</h5>
                        <FlightWrapper>
                            <div className="d-flex">
                                <p>{this.props.currency}</p>
                                <h4>{this.props.price}</h4>
                                <p>/adulto</p>
                            </div>
                            
                            <LinkButton href="/destinations/airplane" name="Selecionar" fields={this.props.state}/> 
                        </FlightWrapper>
                    </DescriptionWrapper>
                    
                </DestinationCardWrapper>
        )
    }
}

export default DestinationCard;