import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query getPosts($params: IFilterPaginationPostParams) {
    getPosts(params: $params) {
      data {
        id
        uuid
        title
        slug
        html
        feature_image
        visibility
        created_at
        updated_at
        tags {
          id
          name
          slug
        }
        authors
        excerpt
      }
      total
    }
  }
`;

export default function useGetPosts(limit, page) {
  const query = useQuery(GET_BOOKS, {
    variables: {
      params: {
        _limit: limit,
        _page: page,
      },
    },

    // always fetch server, in case of we need realtime.
    // uncomment this line for testing
    // pollInterval: 500,

    notifyOnNetworkStatusChange: true,

    // Used for first execution
    fetchPolicy: "network-only",

    // Used for subsequent executions
    nextFetchPolicy: "cache-first",
  });

  return {
    ...query,
  };
}
