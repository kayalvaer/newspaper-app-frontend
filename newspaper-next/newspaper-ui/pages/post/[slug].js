import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import { useSession } from "next-auth/react";
const Post = ({ post, plot, error }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [review, setReview] = useState({
    value: "",
  });

  const handleChange = (e) => {
    setReview({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(session);
    try {
      await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
        body: JSON.stringify({
          data: {
            review: review.value,
            reviewer: session.user,
            Post: post.id,
          },
        }),
      });
      router.reload();
    } catch (error) {
      console.error("error with request", error);
    }
  };
  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            {post.attributes.title}
          </span>
        </h1>
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.attributes.img.data.attributes.url}`}
          alt="img"
        />
        <p>
          author{" "}
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            {post.attributes.users_permissions_user.data.attributes.username}
          </span>
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            Plot
          </span>
        </h2>
        <div
          className="tracking-wide font-normal text-sm"
          dangerouslySetInnerHTML={{ __html: plot }}
        ></div>
        {
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                Reviews
              </span>
              {session && (
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="w-full text-sm px-3 py-2 text-gray-700 border-2 border-teal-400 rounded-lg focus:outline-none"
                    rows="4"
                    value={review.value}
                    onChange={handleChange}
                    placeholder="Add your review"
                  ></textarea>
                  <button
                    className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                    type="submit"
                  >
                    Add Review
                  </button>
                </form>
              )}
            </h2>
            <ul>
              {post.attributes.reviews.data.length === 0 && (
                <span>No reviews yet</span>
              )}
              {post.attributes.reviews.data &&
                post.attributes.reviews.data.map((review) => {
                  return (
                    <li key={review.id}>
                      <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        {review.attributes.reviewer}
                      </span>{" "}
                      said &quot;{review.attributes.review}&quot;
                    </li>
                  );
                })}
            </ul>
          </>
        }
      </Layout>
    );
  }
};

export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  console.log(slug);
  const postResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts/${slug}?populate=*`
  );
  console.log(postResponse);
  if (postResponse.data) {
    const plot = await markdownToHtml(postResponse.data.attributes.description);
    return {
      props: {
        post: postResponse.data,
        plot,
      },
    };
  } else {
    return {
      props: {
        error: postResponse.error.message,
      },
    };
  }
}

export default Post;
