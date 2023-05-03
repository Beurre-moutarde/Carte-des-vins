import { gql } from "@apollo/client";

export const QUERY_REGION = gql`
  query region {
    region {
      _id
      region_name
    }
  }
`;

export const QUERY_VIN = gql`
  query vin {
    vin {
      _id
      vin_name
      millesime
      producteur
    }
  }
`;

export const QUERY_USER = gql`
  query user {
    user {
        _id
        firstname
        lastname
        email
    }
  }
`;

