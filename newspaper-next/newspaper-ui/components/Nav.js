import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetcher } from "../lib/api";

const Nav = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session == null) return;
  }, [session]);
  return (
    <nav
      className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
    >
      <div>
        <Link href="/" passHref>
          {/* <a> */}
          {/* eslint-disable @next/next/no-img-element */}
          {/* <img
              className="m-3"
              src="/strapi-logo.png"
              width={200}
              height={50}
              alt="Strapi Logo"
            />
          </a> */}
          <h2>Tybloid News</h2>
        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        className="h-6 w-6 cursor-pointer md:hidden block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0 space-x-2"
        >
          <li>
            <Link legacyBehavior href="/">
              <a className="md:p-2 py-2 block hover:text-purple-400" href="#">
                Posts
              </a>
            </Link>
          </li>
          {session && (
            <li>
              <Link legacyBehavior href="/post/add">
                <a className="md:p-2 py-2 block hover:text-purple-400" href="#">
                  Create Posts
                </a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link legacyBehavior href="/post/my-post">
                <a className="md:p-2 py-2 block hover:text-purple-400" href="#">
                  My Posts
                </a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <a
                className="md:p-2 py-2 block hover:text-purple-400"
                onClick={signOut}
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
            </li>
          )}
          {!session && (
            <>
              <li>
                <Link
                  href="/auth/login"
                  className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                  type="submit"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/register">
                  <a className="md:p-2 block py-2 hover:text-purple-400 text-black">
                    Register
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
