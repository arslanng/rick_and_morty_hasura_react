import { gql } from "@apollo/client";

export const GET_ALL_CHAR = gql`
  query Characters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    results {
      name
      image
      id
    }
    info{
        count
    }
  }
}
`;
