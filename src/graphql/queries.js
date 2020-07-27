import { gql } from "apollo-boost";

export const ALL_TESTS = gql`
  {
    tank {
      id
      tests(order_by: { date_tested: asc }) {
        id
        parameter
        value
        date_tested
      }
      availableTests: tests(
        distinct_on: parameter
        order_by: { parameter: desc, date_tested: desc }
      ) {
        id
        parameter
        value
        date_tested
      }
    }
  }
`;

export const PARAMETER_TESTS = gql`
  query TankQuery($parameter: String!) {
    tank {
      id
      tests(where: { parameter: { _eq: $parameter } }) {
        id
        parameter
        value
        date_tested
      }
    }
  }
`;
