import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";
import moment from "moment";

const Add = () => {
  const [image, setImage] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    img: null,
    user: null,
    published: moment(new Date()).format("yyyy-MM-DD"),
  });
  const { data: session, status } = useSession();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + session.user.jwt },
        body: formData,
      }
    );
    const responseData = await res.json();
    console.log(responseData[0].id);
    setValues({ ...values, img: responseData[0].id, user: session.user.id });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ session, values });
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.user.jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: values }),
    });
    const responseData = await res.json();
    console.log(responseData);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <>
      {session && (
        <Layout>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 w-full">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Tile
              </label>
              <input
                name="title"
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example..."
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Description
              </label>
              <textarea
                id="description"
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center mt-8">
              <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                  <label className="inline-block mb-2 text-gray-500">
                    File Upload
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Attach a file
                        </p>
                      </div>
                      <input
                        type="file"
                        className="opacity-0"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-center p-2">
                  <button
                    onClick={handleImageUpload}
                    type="button"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </Layout>
      )}
    </>
  );
};

export default Add;
