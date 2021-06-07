import React, { useState, useEffect, Component } from 'react'
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


function AirplaneSeats (props){

    const {cookies} = props
    let state = {
      loading: false,
      origem : cookies.get('origem'),
      destino : cookies.get('destino'),
      dataIda : cookies.get('dataIda'),
      seats : cookies.get('seats'),
      chosenSeats: []
    };
  

  function addSeatCallback({ row, number, id }, addCb){

    new Promise((resolve) => setTimeout(resolve, 50));
    console.log(`Added seat ${number}, row ${row}, id ${id}`);
    state.chosenSeats.push(number);
    console.log(state.chosenSeats);
    console.log(state.chosenSeats.length);
    addCb(row, number, id, null);

  };

  function removeSeatCallback({ row, number, id }, removeCb){
    new Promise((resolve) => setTimeout(resolve, 50));
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    const index = state.chosenSeats.indexOf(number);
    state.chosenSeats.splice(index, 1);
    console.log(state.chosenSeats);
    console.log(state.chosenSeats.length);
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
  };

  function handleValidation(){
    let assentosEscolhidos = state.chosenSeats;
    let errorsInput = {};
    let formIsValid = true;
    
    if (state.chosenSeats.length < parseInt(state.seats)){
        formIsValid = false;
    }
    
    return formIsValid;
  
    
  }
  
  function contactSubmit(e){
    let valid = handleValidation();
    
    if(valid){
       //alert("Form submitted");
       //handleCookies();
    }else{
        e.preventDefault();
        alert("Preencha todos os dados corretamente.")
  
    }
  }

    const rows = iniciaAssentos(arquivoJSON);
    const seatCost = 100.0;
    const seatChoose = state.seats;
    let seat = Math.round(seatChoose * 100) / 100;

    const { loading } = state;

    console.log(state.origem);
    console.log(state.destino);
    console.log(state.dataIda);
    console.log(state.seats);
    
    useEffect(() => {}, [state.origem]);

  return (
    <div className="main">
      <NavBarProfile />    
      <div className="filter-container">
      <FilterWrapper>
        
        <h2>Escolha seus {state.seats} assentos:<br/>  </h2>

          <SeatPicker
            addSeatCallback={addSeatCallback}
            removeSeatCallback={removeSeatCallback}
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
          onClick={contactSubmit}
      >
      Buscar
      </Link>

      </div>
      </FilterWrapper>
      </div>
    </div>
  );
}

export default withCookies(AirplaneSeats);
