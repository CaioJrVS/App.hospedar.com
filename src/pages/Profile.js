import React, { useState } from 'react'
import NavBar from '../Component/NavBar'
import styled from 'styled-components'

import LinkButton from '../Component/LinkButton'
import MyFlightCard from '../Component/MyFlightCard'

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
    margin: 10px;
    @media(min-width: 1200px) {
        max-width: 1200px;
    }
`

const MyFlightsWrapper = styled.div`
    width: 100%;
    margin: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media(min-width: 1200px) {
        max-width: 1200px;
    }

    @media(max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`

export default function Profile() {
    return (
        <div className="main">
            <NavBar profileVisibility="invisible"/>
                <div className="filter-container">
                <FilterWrapper>
                    <h2>Minha Conta</h2>
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                <label for="inputEmail4">Nome Completo</label>
                                <input type="text" readonly class="form-control" bg = "white" id="staticEmail" value="Cláudio Miceli de Farias"></input>
                                
                                </div>
                                {/* <div class="form-group col-md-6">
                                <label for="inputPassword4">Sobrenome</label>
                                <input type="text" readonly class="form-control" bg = "white" id="staticEmail" value="Miceli"></input>
                                </div> */}
                                <div class="form-group col-md-6">
                                <label for="inputEmail4">Data de Nascimento</label>
                                <input type="text" readonly class="form-control" bg = "white" id="staticEmail" value="27/04/1990"></input>
                                </div>


                                <div class="form-group col-md-6">
                                <label for="inputEmail4">Email</label>
                                <input type="text" readonly class="form-control" bg = "white" id="staticEmail" value="claudiomiceli@poli.ufrj.br"></input>
                                </div>

                                <div class="form-group col-md-6">
                                <label for="inputEmail4">Telefone</label>
                                <input type="text" readonly class="form-control" bg = "white" id="staticEmail" value="994421492"></input>
                                {/* <input type="date" class="form-control" id="inputEmail4"/> */}
                                </div>
                                
                                {/* <div class="form-group col-md-6">
                                <label for="inputEmail4">Data de Nascimento</label>
                                <input type="text" readonly class="form-control" bg = "white" id="staticEmail" value="20/10/1990"></input>
                                </div>

                                <div class="form-group col-md-6">
                                <label for="inputPassword4">Ultimos 4 digitos do Cartão de Crédito</label>
                                <input type="text" readonly class="form-control" bg = "white" id="staticEmail" value="2312"></input>
                                </div> */}
                                
                            </div>
                            {/* <div class="w-100 d-flex justify-content-end">
                                <LinkButton href="/changeprofile" name="Editar"/>
                            </div> */}
                        
                        </form>
                        <br></br>
                    <h2>Minhas Viagens</h2>     
                                
                                <MyFlightsWrapper>
                                    <MyFlightCard/>
                                    <MyFlightCard/>
                                    <MyFlightCard/>
                                    <MyFlightCard/>
                                </MyFlightsWrapper>

                </FilterWrapper>
            </div>
           
        </div>
    )
}