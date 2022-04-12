import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await axios({
    method: "GET",
    url: "http://localhost:3001/posts?",
  });

  const paths = posts.data.map((data: any) => {
    return {
      params: {
        pid: String(data.id),
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await axios({
    method: "GET",
    url: "http://localhost:3001/posts/" + params?.pid,
  });

  return {
    props: {
      post: post.data,
    },
  };
};

export default function index(props: {
  post: {
    id: number;
    title: string;
    description: string;
  };
}) {
  const { post } = props;

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.description}</div>
      <div>{post.id}</div>
    </div>
  );
}
