'use client'

import Image from "next/image"
import Link from "next/link"
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
import { useEffect, useState } from "react"

const Navbar = () => {

  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const providerSet = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    providerSet();
  }, [])

  return (
    <nav className="w-full flex-between mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">

        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="Promptopia Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* desktop Navigation */}
      <div className="sm:flex hidden">
        {
          isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={"/create-prompt"} className="black_btn">Create Post</Link>

              <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button>

              <Link href='/profile'>
                <Image
                  src='/assets/images/logo.svg'
                  width={37}
                  height={37}
                  alt="Profile"
                  className="rounded-full"
                />
              </Link>

            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => (

                  <button
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                    key={provider.name}
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          isUserLoggedIn ? (
            <div className="flex">
              <Image
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full"
                onClick={() => setToggleDropDown((prev) => !prev)}
              />

              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    Create Prompt
                  </Link>

                  <button 
                    type="button"
                    className="black_btn mt-5 w-full"
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>

                </div>
              )}

            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => (

                  <button
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                    key={provider.name}
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>

    </nav>
  )
}

export default Navbar