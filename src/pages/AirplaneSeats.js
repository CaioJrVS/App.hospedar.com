import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeatPicker from "react-seat-picker";
import NavBarProfile from "../Component/NavBarProfile";
import styled from "styled-components";
import { withCookies, Cookies } from 'react-cookie';
import {Link} from 'react-router-dom'
//import seatmap from '.json';
const iataCodes = require('../Data/IATAcodesWorld.json');
const arquivoJSON = require('../Data/exampleSeatMap.json');

const FilterWrapper = styled.div`
  width: 150%;
  height: fit-content;
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: #222c69;
  color: white;
  border-radius: 10px;
  padding: 20px;
  font-family: "Roboto", sans-serif;
  margin: 10px 10px 10px 10px;

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;

class assento {
  constructor(id, isReserved = false, number) {
    this.id = id; //int id de cada banco
    this.isReserved = isReserved;
    this.number = number; //string A3,A4,...
  }
}


function iniciaAssentos(seatmap) {
  let alfabeto = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let mSeats = []; //matriz com arrays de assentos

  let count = 0;

  let boolVar;

  const tamX = seatmap["data"][0]["decks"][0]["deckConfiguration"]["length"];
  const tamY = seatmap["data"][0]["decks"][0]["deckConfiguration"]["width"];

  const width = tamY;

  for (let i=0;i < tamX; i++){
    let arrSeats = [];
    for (let j=0; j < width; j++){
      arrSeats.push(null);
    }
    mSeats.push(arrSeats);
  }
  
  const varStr = 'gOrOkA';
  console.log(iataCodes[varStr.toUpperCase()]);

  
  for (let el of seatmap["data"][0]["decks"][0]["seats"]){

    let x = el.coordinates.x;
    let y = el.coordinates.y;
    count = y + x*width;

    let seatNumber = (alfabeto[y].concat((parseInt(x,10)).toString()));
    console.log(el["travelerPricing"][0]["seatAvailabilityStatus"]);
    if (el["travelerPricing"][0]["seatAvailabilityStatus"] === "AVAILABLE"){
      boolVar = false;
    }else{
      boolVar = true;
    }
    mSeats[x][y] = new assento(count,boolVar,seatNumber)
  }

  return mSeats;
}


class AirplaneSeats extends Component {
  constructor(props){
    super(props);
    const {cookies} = props
    this.state = {
      loading: false,
      seats: cookies.get('seats'),
      chosenSeats: []
    };

  }

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState(
      {
        loading: false,
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        // const newTooltip = `tooltip for id-${id} added by callback`;
        this.state.chosenSeats.push(number);
        console.log(this.state.chosenSeats);
        console.log(this.state.chosenSeats.length);
        addCb(row, number, id, null); //newTooltip);
        this.setState({ loading: false });
      }
    );
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: false, // talvez false
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip

        // Remove seat from chosenSeats
        const index = this.state.chosenSeats.indexOf(number);
        this.state.chosenSeats.splice(index, 1);
        console.log(this.state.chosenSeats);
        console.log(this.state.chosenSeats.length);

        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        this.setState({ loading: false });
      }
    );
  };

  handleValidation = () => {
    let assentosEscolhidos = this.state.chosenSeats;
    let errorsInput = {};
    let formIsValid = true;
    
    // Origem
    // if (!estados.includes(fields.origem)){
    //     formIsValid = false;
    // }
    // // Destino
    // if ((!estados.includes(fields.destino)) || (fields.origem == fields.destino)){
    //     formIsValid = false;
    // }
    // Data Ida
    console.log(this.state.chosenSeats.length);
    if (this.state.chosenSeats.length < parseInt(this.state.seats)){
        formIsValid = false;
    }
    
    return formIsValid;
  
    
  }
  
  contactSubmit = (e) => {
    let valid = this.handleValidation();
    
    if(valid){
       //alert("Form submitted");
       //handleCookies();
    }else{
        e.preventDefault();
        alert("Preencha todos os dados corretamente.")
  
    }
  }

  render() {
    //const myPlane = new aviao(64, 2, 4, 2);
    const rows = iniciaAssentos(arquivoJSON);//seatmap);//myPlane);
    const seatCost = 100.0;
    const seatChoose = this.state.seats;
    let seat = Math.round(seatChoose * 100) / 100;

    const { loading } = this.state;
    return (
      <div className="main">
        <NavBarProfile />    
        <div className="filter-container">
        <FilterWrapper>
          
          <h2>Escolha seus {this.state.seats} assentos:<br/>  </h2>

            <SeatPicker
              addSeatCallback={this.addSeatCallback}
              removeSeatCallback={this.removeSeatCallback}
              rows={rows}
              maxReservableSeats={seatChoose}
              alpha
              //visible // Para mostrar as linhas, só que ele mostra em alfabeto
              selectedByDefault
              loading={loading}
              tooltipProps={{ multiline: true }}
            />

        <h3 id="seat">O valor total foi: R$ {(seat * seatCost).toFixed(2)}</h3>
        <div class="w-200 d-flex justify-content-center">
        <Link
            className="btn btn-danger"
            to={{
                pathname: "/payment",
                //state: {fields: fields}
            }}
            onClick={this.contactSubmit}
        >
        Buscar
        </Link>

        </div>
        </FilterWrapper>
        </div>
      </div>
    );
  }
}

export default withCookies(AirplaneSeats);
