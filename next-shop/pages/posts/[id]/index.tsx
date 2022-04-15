import { GetStaticProps, GetStaticPaths } from "next";
import { dehydrate, QueryClient } from "react-query";
import PostDetail from "../../../modules/posts/pages/PostDetail";
import PostApi from "../../../services/posts";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    let post;
    const queryClient = new QueryClient();
    if (ctx.params && ctx.params.id) {
      post = await PostApi.getById(ctx.params.id as string);
      await queryClient.prefetchQuery(
        ["comments", { limit: 4, page: 1, postId: ctx?.params?.id }],
        function () {
          return PostApi.getCommentsByPostId(ctx?.params?.id as string, {
            _limit: 4,
            _page: 1,
          });
        }
      );
    }

    return {
      props: {
        post: post,
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        post: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  let result = await PostApi.getAll({});

  let paths = result.data.map((data) => {
    return {
      params: {
        id: data.id,
      },
    };
  });

  return {
    fallback: "blocking",
    paths: paths,
  };
};

export default PostDetail;
