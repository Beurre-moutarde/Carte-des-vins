import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_DATA = gql`
  mutation saveData($Params: String!) {
    saveData(input: {params: $Params}) {
      username
    }
  }
`;

export const DELETE_DATA = gql`
  mutation deleteData($dataID: ID) {
    deleteData(dataID: $dataID) {
      _id
      username
      email
    }
  }
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;


export const SAVE_VIN = gql`
  mutation saveVin($input: VinInput) {
    saveVin(input: $input) {
      _id
      username
      vinCount
      savedVins {
        vinId
        title
        description
      }
    }
  }
`;

export const REMOVE_VIN = gql `
  mutation removeVin($vinId: String!) {
    removeVin(vinId: $vinId) {
      _id
      username
      vinCount
      savedVins {
        vinId
        vin_name
        millesime
        producteur
      }
    }
  } 
`;