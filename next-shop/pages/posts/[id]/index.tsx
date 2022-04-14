import { GetStaticProps, GetStaticPaths } from "next";
import PostDetail from "../../../modules/posts/pages/PostDetail";
import PostApi from "../../../services/posts";

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    let result;
    if (ctx.params && ctx.params.id) {
      result = await PostApi.getById(ctx.params.id as string);
    }

    return {
      props: {
        post: result,
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
