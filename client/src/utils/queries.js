import { gql } from "@apollo/client";

export const QUERY_REGION = gql`
  query regions {
    regions {
      _id
      region_name
    }
  }
`;

export const QUERY_VIN = gql`
  query vins {
    vins {
      _id
      vin_name
      millesime
      producteur
    }
  }
`;

export const QUERY_USER = gql`
  query users {
    users {
        _id
        firstname
        lastname
        email
    }
  }
`;

