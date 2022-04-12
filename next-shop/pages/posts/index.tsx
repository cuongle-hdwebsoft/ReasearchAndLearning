import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await axios({
    method: "GET",
    url: "http://localhost:3001/posts?_limit=10&page=1",
  });

  return {
    props: {
      posts: posts.data,
    },
  };
};

export default function index({
  posts,
}: {
  posts: Array<{ id: number; title: string; description: string }>;
}) {
  return (
    <div>
      {posts.map((post) => {
        return <div key={post.id}>{post.title}</div>;
      })}
    </div>
  );
}
