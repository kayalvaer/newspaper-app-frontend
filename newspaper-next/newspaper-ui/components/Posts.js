import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetcher } from "../lib/api";

const Posts = ({ posts, edit }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleDelete = async (id) => {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.user.jwt}` },
      }
    );
    router.reload();
  };
  console.log(posts);
  return (
    <>
      <section className="py-6 sm:py-12 bg-gray-800 text-gray-100">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Partem reprimique an pro</h2>
            <p className="font-serif text-sm text-gray-400">
              Qualisque erroribus usu at, duo te agam soluta mucius.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {posts?.map((post) => (
              <article className="flex flex-col bg-gray-900" key={post.id}>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Te nulla oportere reprimique his dolorum"
                >
                  <img
                    alt=""
                    className="object-cover w-full h-52 bg-gray-500"
                    src={
                      process.env.NEXT_PUBLIC_STRAPI_URL +
                      post.attributes.img.data.attributes.formats.thumbnail.url
                    }
                  />
                </a>
                <div className="flex flex-col flex-1 p-6">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    aria-label="Te nulla oportere reprimique his dolorum"
                  ></a>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs tracking-wider uppercase hover:underline text-violet-400"
                  >
                    {
                      post.attributes?.users_permissions_user?.data?.attributes
                        ?.username
                    }
                  </a>
                  <Link
                    href={`post/` + post.id}
                    className="flex-1 py-2 text-lg font-semibold leading-snug"
                  >
                    {post?.attributes?.title}
                  </Link>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-400">
                    <span>{post.attributes.published}</span>
                  </div>
                </div>
                {edit && (
                  <div className="flex flex-wrap justify-between pt-3 space-x-2">
                    <Link href={`edit/${post.id}`}>
                      <button className="p-2 rounded-lg bg-purple-500">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-lg bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;
