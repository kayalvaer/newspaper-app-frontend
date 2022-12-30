import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import React from "react";
import { fetcher } from "../../lib/api";
import Layout from "../../components/Layout";
import Posts from "../../components/Posts";
const MyPost = ({ posts }) => {
  console.log(posts);
  return (
    <Layout>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Posts Listing
        </span>
      </h1>
      {posts && <Posts posts={posts?.data} edit={true} />}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const postsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?filters[user][username][$eq]=${session.user.username}&populate=*`
  );
  console.log(postsResponse);
  return {
    props: {
      posts: postsResponse,
    },
  };
}
export default MyPost;
