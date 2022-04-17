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
      await queryClient.prefetchInfiniteQuery(["comments"], function () {
        return PostApi.getCommentsByPostId(ctx?.params?.id as string, {
          _limit: 4,
          _page: 1,
        });
      });
    }

    // seriablize data if nextjs do not seriabize its data
    // https://github.com/vercel/next.js/discussions/11209

    return {
      props: {
        post: post,
        dehydratedState: JSON.stringify(dehydrate(queryClient)),
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        post: null,
        dehydratedState: null,
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
