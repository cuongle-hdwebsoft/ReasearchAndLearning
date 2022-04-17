import { useMutation, useQueryClient } from "react-query";
import useApp from "../../../common/hooks/useApp";
import PostApi from "../../../services/posts";
import { IComment } from "../interface/comment";
import { useSnackbar } from "notistack";

export default function usePostComment() {
  const { user } = useApp();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate, isError } = useMutation(
    function (data: Omit<IComment, "id">) {
      return PostApi.postCommentByPostId(data);
    },
    {
      retry: 3,
    }
  );

  const handlePostComment = (
    comment: string,
    postId: string,
    cb: (value: string) => void
  ) => {
    if (!user) {
      enqueueSnackbar("User not found", { variant: "error" });
      return;
    }

    let data = {
      idAuthor: user?.id,
      authorName: user?.displayName,
      dateTime: new Date().toUTCString(),
      comment,
      postId,
    };

    mutate(data, {
      onSuccess: function () {
        cb("");
        console.log(123);
        enqueueSnackbar("Post comment successfully", { variant: "success" });
        queryClient.invalidateQueries("comments", { exact: true });
      },
      onError: function (error: any) {
        console.log(error);
        enqueueSnackbar("Post comment fail", { variant: "error" });
      },
    });
  };

  return {
    handlePostComment,
    isError,
  };
}
