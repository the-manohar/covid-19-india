import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Columns from "react-columns";

function App() {
  const [total, setTotal] = useState([]);
  const [state, setState] = useState([]);
  const [time, setTime] = useState("");
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    axios.get("https://disease.sh/v2/gov/india").then((res) => {
      setTotal(res.data.total);
      setState(res.data.states);
      setTime(res.data.updated);
    });
  }, []);

  const lastUpdated = new Date(parseInt(time));
  const date = `Last Updated ${lastUpdated}`;

  const filterCountry = state.filter((item) => {
    return searchState !== ""
      ? item.state.toLowerCase().includes(searchState.toLowerCase())
      : item;
  });

  const stateData = filterCountry.map((data, i) => (
    <Card
      bg="light"
      text="dark"
      className="text-center"
      style={{
        margin: 10,
        background: "linear-gradient(#FF9933,#FFFFFF, #128807)",
      }}
      key={i}
    >
      <Card.Body>
        <Card.Title className="text-uppercase text-primary">
          {data.state}
        </Card.Title>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Total Cases :</span> {data.total}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold", color: "red" }}>Deaths :</span>{" "}
          {data.deaths}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold", color: "green" }}>
            Recovered :
          </span>{" "}
          {data.recovered}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Active :</span>
          {data.active}
        </Card.Text>
      </Card.Body>
    </Card>
  ));

  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];

  return (
    <div>
      <marquee>
        “Better to wear a mask than a ventilator; better to stay at home than in
        an ICU.”
      </marquee>

      <br />
      <h2
        style={{
          textAlign: "center",
          background: "linear-gradient(#FF9933,#FFFFFF, #128807)",
        }}
      >
        COVID-19 Live Now{" "}
      </h2>
      <p style={{ textAlign: "center" }}>
        This Website is created by{" "}
        <span className="text-uppercase text-primary">Manohar Sirvi</span>
      </p>
      <br />
      <CardDeck className="text-center text-white" style={{ margin: 10 }}>
        <Card bg="success">
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text className="h2">{total.total}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{date}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger">
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text className="h2">{total.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{date}</small>
          </Card.Footer>
        </Card>
        <Card bg="primary">
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text className="h2">{total.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{date}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />

      <Form.Group controlId="formGroupSearch">
        <Form.Control
          type="text"
          placeholder="Search a State"
          onChange={(e) => setSearchState(e.target.value)}
        />
      </Form.Group>
      <Columns queries={queries}>{stateData}</Columns>
    </div>
  );
}

export default App;
