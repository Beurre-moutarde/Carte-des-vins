import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedPlants {
        plantId
        authors
        bibliography
        family
        title
        image
        link
      }
    }
  }
`;
