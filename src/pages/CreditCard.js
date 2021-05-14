import React from "react";
import { render } from "react-dom";
import Styles from "../Component/CreditCard/Styles";
import { Form, Field } from "react-final-form";
import Card from "../Component/CreditCard/Card";
import NavBarProfile from "../Component/NavBarProfile";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../Component/CreditCard/cardUtils";
import styled from "styled-components";

const FilterWrapper = styled.div`
  width: 100%;
  height: fit-content;
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  // window.alert(JSON.stringify(values, 0, 2));
  window.alert("Pagamento realizado com sucesso!")
  window.location='/homeProfile';
};

const CreditCard = () => (
  <div className="main">
    <NavBarProfile />
    <div className="filter-container">
      <FilterWrapper>
        <h2>Pagamento</h2>
        <Styles>
          <Form
            onSubmit={onSubmit}
            render={({
              handleSubmit,
              form,
              submitting,
              pristine,
              values,
              active,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Card
                    number={values.number || ""}
                    name={values.name || ""}
                    expiry={values.expiry || ""}
                    cvc={values.cvc || ""}
                    focused={active}
                  />
                  <div>
                    <Field
                      name="number"
                      component="input"
                      type="text"
                      pattern="[\d| ]{16,22}"
                      placeholder="Card Number"
                      format={formatCreditCardNumber}
                    />
                  </div>
                  <div>
                    <Field
                      name="name"
                      component="input"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <Field
                      name="expiry"
                      component="input"
                      type="text"
                      pattern="\d\d/\d\d"
                      placeholder="Valid Thru"
                      format={formatExpirationDate}
                    />
                    <Field
                      name="cvc"
                      component="input"
                      type="text"
                      pattern="\d{3,4}"
                      placeholder="CVC"
                      format={formatCVC}
                    />
                  </div>
                  <div className="buttons">
                    <button type="submit" disabled={submitting}>
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </button>
                  </div>
                  {/* <h2>Values</h2>
            <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                </form>
              );
            }}
          />
        </Styles>
      </FilterWrapper>
    </div>
  </div>
);

render(<CreditCard />, document.getElementById("root"));
export default CreditCard;
