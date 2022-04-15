import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import getFilters from "../../common/utils/getFilters";
import { IFilterPost } from "../../modules/posts/interface/post";
import PostList from "../../modules/posts/pages/PostLists";
import prefetchCategories from "../../modules/posts/queries/prefetchCategories";
import prefetchPosts from "../../modules/posts/queries/prefetchPosts";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const limit = (ctx.query.limit as unknown as number) || 8;
    const page = (ctx.query.page as unknown as number) || 1;
    const sort = (ctx.query.sort as string) || "";
    const order = (ctx.query.order as string) || "";
    const filter: IFilterPost = getFilters(ctx.query, ["tags.id", "q"]);

    const queryClient = new QueryClient();

    await Promise.all([
      prefetchPosts(queryClient, limit, page, filter, sort, order),
      prefetchCategories(queryClient),
    ]);

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
