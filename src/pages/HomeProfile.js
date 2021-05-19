import React, { useState, useEffect } from 'react'
import {importedStates} from './../Data/states.js';
import {homeCardStates} from './../Data/homeCardStates';
import Carousel from 'react-elastic-carousel'
import NavBar from '../Component/NavBar'
import HomeCard from '../Component/HomeCard'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { GET_CARD_FLIGHTS, GET_HOME_CARD_FLIGHTS } from '../Shared/urls';

const FilterWrapper = styled.div`
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		background-color: #222c69;
		color: white;
		border-radius: 10px;
		padding: 20px;
		font-family: 'Roboto', sans-serif;
		margin: 10px 10px 10px 10px;
		@media(min-width: 1200px) {
				max-width: 1200px;
		}
`

export default function Home (props) {

	const [states, setStates] = useState([]);
	const [items, setItems] = useState(homeCardStates);
    const [fields, setFields] = useState({
        origem: "",
        destino: "",
        dataIda: "",
        dataVolta: "",
        seats: ""
})
	const [cookies, setCookie] = useCookies(['seats']);

	function handleCookies() {
		setCookie('origem', fields.origem, { path: '/' });
		setCookie('destino', fields.destino, { path: '/' });
		setCookie('dataIda', fields.dataIda, { path: '/' });
		setCookie('dataVolta', fields.dataVolta, { path: '/' });
		setCookie('seats', fields.seats, { path: '/' });
    } 
	
	const [flights, setFlights] = useState({availableFlights:[]})

	useEffect(() => {
	// axios.get(GET_CARD_FLIGHTS)
	// 	.then(function (response) {
	// 		if(!flights.availableFlights.length > 0 ){
	// 			setFlights(x=>({ ...x ,availableFlights:[response.data]}), [flights.availableFlights]);
	// 		}
	// 	})
	// 	.catch(function (error) {
	// 	console.log(error);
	// 	})

        axios.get(GET_HOME_CARD_FLIGHTS)
            .then(function (response) {
                if(!flights.availableFlights.length > 0 ){
                    setFlights(x=>({ ...x ,availableFlights:[response.data]}), [flights.availableFlights]);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
	});

	// Validar opções selecionadas
	const estados = [
        "Acre","Alagoas","Amazonas","Amapá","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Minas Gerais",
        "Mato Grosso do Sul","Mato Grosso","Pará","Paraíba","Pernambuco","Piauí","Paraná","Rio de Janeiro","Rio Grande do Norte","Rondônia",
        "Roraima","Rio Grande do Sul","Santa Catarina","Sergipe","São Paulo","Tocantins"
    ];

	function handleValidation(){
        let errorsInput = {};
        let formIsValid = true;
        
        // Origem
        if (!estados.includes(fields.origem)){
            formIsValid = false;
        }
        // Destino
        if ((!estados.includes(fields.destino)) || (fields.origem == fields.destino)){
            formIsValid = false;
        }
        // Data Ida
        if (!fields.dataIda){
            formIsValid = false;
        }
        // Data Volta
        if ((!fields.dataVolta)){
            formIsValid = false;
        }
        // Numero de Assentos
        if ((!fields.seats) || (fields.seats == "Selecione") ){
            formIsValid = false;

        }

        return formIsValid;
    
        
    }

    function contactSubmit(e){
        let valid = handleValidation();
        if(valid){
           //alert("Form submitted");
           handleCookies();
        }else{
            e.preventDefault();
            alert("Preencha todos os dados corretamente.")

        }
    }

	const breakPoints = [
		{ width: 1, itemtsToShow: 1 },
		{ width: 550, itemsToShow: 2, itemsToScroll: 1 },
		{ width: 768, itemsToShow: 3 },
		{ width: 1200, itemsToShow: 4 }
	];

	function guessState(parcialString){
		let statesWithParcialString = [];
		importedStates.forEach(x=> { if (x["Nome"].toLowerCase().includes(parcialString))  statesWithParcialString.push(x) } )
		setStates(statesWithParcialString)
	}

    const handleInputChange = event => {
        guessState(event.target.value.toLowerCase())
        const { name, value } = event.target;
        setFields(prevState => ({
          ...prevState,
          [name]: value
        }));
        console.log(fields);
      };

	return (
		<div className="main">
		<NavBar/>

		<div className="filter-container">
		<FilterWrapper>
		<h4>Passagens aéreas com reserva flexível</h4>
		<form>
		<div class="form-row">
		<div class="form-group col-md-6">
		<label for="inputPassword3" >Origem</label>
		<input type="text" class="form-control" id="inputPassword4" onChange={handleInputChange} list="cities" name="origem"/>
		<datalist id="cities">
            {states.map( (item, key) =>
            <option key={key} value={item.Nome} /> )}
        </datalist>
        </div>
		<div class="form-group col-md-6">
		<label for="inputPassword4">Destino</label>
		<input type="text" class="form-control" id="inputPassword4" onChange={handleInputChange} list="cities" name="destino"/>
		</div>
		<div class="form-group col-md-4">
		<label for="inputPassword4">Data Ida</label>
		<input type="date" class="form-control" id="inputPassword4" onChange={handleInputChange} name="dataIda"/>
		</div>

		<div class="form-group col-md-4">
		<label for="inputPassword4">Data Volta</label>
		<input type="date" class="form-control" id="inputPassword4" onChange={handleInputChange} name="dataVolta"/>
		</div>

		<div class="form-group col-md-4">
		<label for="inputPassword4">Número de passageiros</label>
		<select id="inputPassword4" class="form-control" onChange={handleInputChange} name="seats">
		<option selected>Selecione</option>
		<option>1</option>
		<option>2</option>
		<option>3</option>
		<option>4</option>
		<option>5</option>
		<option>6</option>
		<option>7</option>
		<option>8</option>
		</select>
		</div>


		</div>
		<div class="w-100 d-flex justify-content-end">
        <Link
            className="btn btn-danger"
            to={{
                pathname: "/destinations",
                state: {fields: fields}
            }}
            onClick={event => contactSubmit(event)}
        >
        Buscar
        </Link>
		</div>

		</form>
		</FilterWrapper>
		</div>

		<div className="offer-container">
		<div className="offer-description-container">
		<h6>Viaje</h6>
		<h3>Vôos a partir de: Rio de Janeiro</h3>
		</div>


		<div className="carousel-container">
		<Carousel breakPoints={breakPoints}>
            <HomeCard key={1} city={'São Paulo'} price='569' src={items[0].img}></HomeCard>
            <HomeCard key={2} city={'Minas Gerais'} price='475' src={items[1].img}></HomeCard>
            <HomeCard key={3} city={'Santa Catarina'} price='345' src={items[4].img}></HomeCard>
            <HomeCard key={4} city={'Bahia'} price='780' src={items[3].img}></HomeCard>
            <HomeCard key={5} city={'Espirito Santo'} price='224' src={items[2].img}></HomeCard>
		</Carousel>
		</div>
		</div>

		</div>
	)
}