import PostList from "../../modules/posts/pages/PostLists";

export const getStaticProps = () => {
  console.log("PostList getStaticProps");
  return {
    props: {},
  };
};

export default PostList;
