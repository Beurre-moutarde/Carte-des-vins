// import React from "react";
// import {
//   Jumbotron,
//   Container,
//   CardColumns,
//   Card,
//   Button,
// } from "react-bootstrap";
// import { GET_ME } from "../utils/queries";
// import { REMOVE_PLANT } from "../utils/mutations";
// import Auth from "../utils/auth";
// import { removePlantId } from "../utils/localStorage";
// import { useQuery, useMutation } from "@apollo/react-hooks";

// const SavedPlants = () => {
//   const { loading, data } = useQuery(GET_ME);
//   let userData = data?.me || {};
//   console.log(userData);
//   const [removePlant] = useMutation(REMOVE_PLANT);

//   // function that accepts the plant's mongo _id value as param and deletes the plant from the database
//   const handleDeletePlant = async (plantId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { user } = await removePlant({
//         variables: {
//           plantId: plantId,
//         },
//       });

//       userData = user;
//       removePlantId(plantId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <Jumbotron fluid className="text-light bg-dark">
//         <Container>
//           <h1>Viewing saved plants!</h1>
//         </Container>
//       </Jumbotron>
//       <Container>
//         <h2>
//           {userData.savedPlants?.length
//             ? `Viewing ${userData.savedPlants.length} saved ${
//                 userData.savedPlants.length === 1 ? "plant" : "plants"
//               }:`
//             : "You have no saved plants!"}
//         </h2>
//         <CardColumns>
//           {userData.savedPlants?.map((plant) => {
//             return (
//               <Card key={plant.plantId} border="dark">
//                 {plant.image ? (
//                   <Card.Img
//                     src={plant.image}
//                     alt={`The photo for ${plant.name}`}
//                     variant="top"
//                   />
//                 ) : null}
//                 <Card.Body>
//                   <Card.Title>{plant.name}</Card.Title>
//                   <p className="small">Category: {plant.category}</p>
//                   <Card.Text>{plant.description}</Card.Text>
//                   <Button
//                     className="btn-block btn-danger"
//                     onClick={() => handleDeletePlant(plant.plantId)}
//                   >
//                     Delete this Plant!
//                   </Button>
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </CardColumns>
//       </Container>
//     </>
//   );
// };

// export default SavedPlants;
import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { GET_ME } from "../utils/queries";
import { REMOVE_PLANT } from "../utils/mutations";
import Auth from "../utils/auth";
import { removePlantId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "../style.css"; // Import custom styles

const SavedPlants = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  console.log(userData);
  const [removePlant] = useMutation(REMOVE_PLANT);

  // function that accepts the plant's mongo _id value as param and deletes the plant from the database
  const handleDeletePlant = async (plantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { user } = await removePlant({
        variables: {
          plantId: plantId,
        },
      });

      userData = user;
      removePlantId(plantId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved plants!</h1>
        </Container>
      </Jumbotron>
      <Container className="my-5">
        <h2 className="text-center mb-4">
          {userData.savedPlants?.length
            ? `Viewing ${userData.savedPlants.length} saved ${
                userData.savedPlants.length === 1 ? "plant" : "plants"
              }:`
            : "You have no saved plants!"}
        </h2>
        <CardColumns>
          {userData.savedPlants?.map((plant) => {
            return (
              <Card key={plant.plantId} border="dark">
                {plant.image ? (
                  <Card.Img
                    src={plant.image}
                    alt={`The photo for ${plant.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{plant.name}</Card.Title>
                  <p className="small">Category: {plant.category}</p>
                  <Card.Text>{plant.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeletePlant(plant.plantId)}
                  >
                    Delete this Plant!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedPlants;
