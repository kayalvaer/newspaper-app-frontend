import React from "react";
import qs from "qs";
import Posts from "../components/Posts";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import useSWR from "swr";
import { useState } from "react";
export default function index({ posts }) {
  const [pageIndex, setPageIndex] = useState(1);
  let { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?pagination[page]=${pageIndex}&pagination[pageSize]=5&populate=*`,
    fetcher,
    {
      fallbackData: posts,
    }
  );
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const query = qs.stringify({
        _where: {
          title_contains: searchTerm,
        },
      });
      console.log(query);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Posts Listing
        </span>
      </h1>
      {data.data && <Posts posts={data.data} edit={false} />}
      <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-black {
            --tw-text-opacity: 1;
            color: rgb(0 0 0 / var(--tw-text-opacity));
        } text-white p-2 ${pageIndex === 1 ? "bg-gray-300" : "bg-blue-400"}`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {" "}
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 text-black {
            --tw-text-opacity: 1;
            color: rgb(0 0 0 / var(--tw-text-opacity));
        } text-white p-2 ${
          pageIndex === (data && data.meta.pagination.pageCount)
            ? "bg-gray-300"
            : "bg-blue-400"
        }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?pagination[page]=1&pagination[pageSize]=5&populate=*`
  );
  return {
    props: {
      posts: postsResponse,
    },
  };
}
