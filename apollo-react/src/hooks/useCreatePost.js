import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePost($post: IPostBody) {
    createPost(post: $post) {
      uuid
    }
  }
`;

export default function useCreatePost() {
  const [mutationFunction, { data, loading, error, reset }] = useMutation(
    CREATE_POST,
    {
      // tạo item ở 1 trang bất kì nào đó
      // khi create 1 item thì nó sẽ trả về mỗi object id và dc lưu vào cache
      // khi tí mình quay qua trang có chứa item vừa create
      // nó sẽ fetch về và load lên trên chính cache item đó luôn
      // dựa vào cache id
      // default là nó lấy id là cache id luôn

      refetchQueries: ["getPosts"],
    }
  );

  return {
    mutationFunction,
    data,
    loading,
    error,
    reset,
  };
}
