import { gql } from "apollo-boost";

export const DELETE_TEST = gql`
  mutation DeleteTest($testId: bigint!) {
    delete_test(where: { id: { _eq: $testId } }) {
      affected_rows
    }
  }
`;

export const INSERT_PARAMETER = gql`
  mutation Insert_Parameter($parameterName: String!, $parameterValue: String!) {
    insert_test_one(
      object: { parameter: $parameterName, tank_id: 1, value: $parameterValue }
    ) {
      parameter
      tank_id
      value
    }
  }
`;
