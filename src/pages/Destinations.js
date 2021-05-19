import React, {useState, useEffect} from 'react'
import styled from "styled-components"

import NavBar from '../Component/NavBar'
import DestinationCard from '../Component/DestinationCard'
import {importedAirlines} from '../Data/airlines'
import { withCookies, Cookies } from 'react-cookie'
import {GET_DESTINATION_FLIGHTS} from '../Shared/urls'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
`

const DestinationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    align-items:center;
`

function Destinations(props) {

    const {cookies} = props;

    const [price, setPrice] = useState('');

    useEffect(() => {
        axios.get(GET_DESTINATION_FLIGHTS, {params: {origin: cookies.get('origem'), destination: cookies.get('destino')}})
        .then(function (res) {
            setPrice(res.data.price);
        })
        .catch(function (err) {
            console.log(err);
        })
    })

    return(
        <Container>
            <NavBar/>
            <DestinationsContainer>
                {importedAirlines.map((airline) => <DestinationCard key={airline.ID} logo={airline.logo} name={cookies.get('destino')} origem={cookies.get('origem')} price={price}/>)}
            </DestinationsContainer>
        </Container>
    )
}

export default withCookies(Destinations);