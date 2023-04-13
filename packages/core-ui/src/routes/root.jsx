import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const location = useLocation();
  return (
    <>
      <div id="sidebar">
        <h1>Buy your favourite car</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/buy`}>Buy</Link>
            </li>
            {/* <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li> */}
          </ul>
        </nav>
      </div>
      <div id="detail">
        {location.pathname === "/" ? (
          <>
            <h1>Home</h1>
            <h2>Buy your facourite car</h2>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}
