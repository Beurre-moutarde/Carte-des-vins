import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import "../index.css";

import Auth from "../utils/auth";
import { savePlantIds, getSavedPlantIds } from "../utils/localStorage";

// import Apollo hook and mutation
import { SAVE_PLANT } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

// const apiToken = process.env.TREFLE_API_TOKEN;

const SearchPlants = () => {
  // create state for holding returned google api data
  const [searchedPlants, setSearchedPlants] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // create state to hold saved plantId values
  const [savedPlantIds, setSavedPlantIds] = useState(getSavedPlantIds());
  // set up useEffect hook to save `savedPlantIds` list to localStorage on component unmount
  useEffect(() => {
    return () => savePlantIds(savedPlantIds);
  });

  // use the SAVE_PLANT mutation
  const [savePlant] = useMutation(SAVE_PLANT);

  // create method to search for plants and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `/api/plants/search?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { data }  = await response.json();
      console.log(data)
      const plantData = data.map((plant) => ({
        plantId: plant.id,
        author: plant.author,
        family: plant.family,
        bibliography: plant.bibliography || "",
        title: plant.common_name,
        year: plant.year || "",
        observations: plant.observations,
        scientificname: plant.scientific_name,
        image: plant.image_url || "",
      }));
      // console.log(plantData.data)
      setSearchedPlants(plantData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a plant to our database
  const handleSavePlant = async (plantId) => {
    // find the plant in `searchedPlants` state by the matching id
    const plantToSave = searchedPlants.find((plant) => plant.plantId === plantId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await savePlant({
        variables: {
          input: plantToSave,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // if plant successfully saves to user's account, save plant id to state
      setSavedPlantIds([...savedPlantIds, plantToSave.plantId]);
    } catch (err) {
      console.error(err);
      console.log("GraphQL error:", err.graphQLErrors);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Plants!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a plant"
                  className="form-control"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg" className="btn-success">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container className="results">
        <h2>
          {searchedPlants.length
            ? `Viewing ${searchedPlants.length} results:`
            : "Search for a plant to begin"}
        </h2>
        <CardColumns>
          {searchedPlants.map((plant) => {
            return (
              <Card key={plant.plantId} border="dark" className="card">
                {plant.image ? (
                  <Card.Img
                    className="card-img-top"
                    src={plant.image}
                    alt={`The view for ${plant.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body className="card-body">
                  <Card.Title className="card-title">{plant.title}</Card.Title>
                  <Card.Text className="card-text">Scientific Name: {plant.scientificname}</Card.Text>
                  <Card.Text className="card-text">Bibliography: {plant.bibliography}</Card.Text>
                  <Card.Text className="card-text">Family: {plant.family}</Card.Text>
                  <Card.Text className="card-text">Year: {plant.year}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedPlantIds && savedPlantIds.some(
                        (savedPlantId) => savedPlantId === plant.plantId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSavePlant(plant.plantId)}
                    >
                      {savedPlantIds && savedPlantIds.some(
                        (savedPlantId) => savedPlantId === plant.plantId
                      )
                        ? "This plant has already been saved!"
                        : "Save this Plant!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchPlants;