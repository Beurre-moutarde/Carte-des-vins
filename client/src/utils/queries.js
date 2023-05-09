import { gql } from "@apollo/client";


export const LOAD_DATA = gql`
  query Params {
    params {
      _id
      params
    }
  }  
`

export const QUERY_ME = gql`
  {
    me {
      _id
      firstname
      lastname
      email
      savedVins {
        vinId
        vin_name
        millesime
        producteur
      }
    }
  }
`;
