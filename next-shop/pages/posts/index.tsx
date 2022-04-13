import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import PostList from "../../modules/posts/pages/PostLists";
import PostApi from "../../services/posts";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const limit = (ctx.query.limit as unknown as number) || 8;
    const page = (ctx.query.page as unknown as number) || 1;
    const queryClient = new QueryClient();

    console.log("getServerSideProps");

    await queryClient.prefetchQuery(
      [
        "posts",
        { limit: parseInt(String(limit)), page: parseInt(String(page)) },
      ],
      function () {
        return PostApi.getAll({ _limit: limit, _page: page });
      }
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      props: {
        dehydratedState: {},
      },
    };
  }
};

export default PostList;
