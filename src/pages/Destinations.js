import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import NavBar from '../Component/NavBar'
import DestinationCard from '../Component/DestinationCard'
import Spinner from 'react-bootstrap/Spinner'
import { withCookies, Cookies } from 'react-cookie'
import {GET_DESTINATION_FLIGHTS} from '../Shared/urls'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    align-items: center;
`

const DestinationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    align-items:center;
`

function Destinations(props) {

    const {cookies} = props;

    const [destinationFlights, setDestinationFlights] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadingDestinationFlights () {
        await axios.get(GET_DESTINATION_FLIGHTS, {
            params: {
                origin: cookies.get('origem'), 
                destination: cookies.get('destino'),
                departureDate: cookies.get('dataIda'),
                adults: cookies.get('seats')
            }
        })
        .then(function (res) {
            let flightArray = []
            for (let i = 0; i < 10; i++) {
                flightArray.push(res.data[i]);
            }
            setDestinationFlights(flightArray);
        })
        .catch(function (err) {
            console.log(err);
        })
        setLoading(true);
    }

    useEffect(() => {
        loadingDestinationFlights();
    }, [])

    // setCookie('price', price, { path: '/' });

    return(
        <Container>
            <NavBar/>
            {loading ? 
                <DestinationsContainer>
                    <DestinationCard key="1" name={cookies.get('destino')} origem={cookies.get('origem')} price={destinationFlights[0].price.total} currency={destinationFlights[0].price.currency}/>
                    <DestinationCard key="1" name={cookies.get('destino')} origem={cookies.get('origem')} price={destinationFlights[1].price.total} currency={destinationFlights[1].price.currency}/>
                    <DestinationCard key="1" name={cookies.get('destino')} origem={cookies.get('origem')} price={destinationFlights[2].price.total} currency={destinationFlights[2].price.currency}/>
                </DestinationsContainer>
                : <Spinner animation="border" variant="primary" />
            }
            
        </Container>
    )
}

export default withCookies(Destinations);