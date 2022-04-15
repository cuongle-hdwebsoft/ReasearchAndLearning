import { useQuery } from "react-query";
import PostApi from "../../../services/posts";
import { IComment } from "../interface/comment";

export default function useCommentsPost(props: {
  postId: string;
  limit?: number;
  page?: number;
}) {
  const { data, isError } = useQuery(
    ["comments", { limit: 4, page: 1, postId: props.postId }],
    function () {
      return PostApi.getCommentsByPostId(props.postId as string, {
        _limit: props.limit || 4,
        _page: props.page || 1,
      });
    }
  );

  return {
    comments: data as unknown as IComment[],
    isError,
  };
}
