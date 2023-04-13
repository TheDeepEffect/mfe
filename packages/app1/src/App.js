import React, { useEffect, useState } from "react";
import reducer from "../reducers/app1.reducer";
import { Provider, useSelector, useDispatch } from "react-redux";
import { Form } from "react-router-dom";

const App = () => {
  //   const state = useSelector((state) => state);
  //   const [appName, setAppName] = useState("");
  //   const dispatch = useDispatch();
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };
  return (
    <div id="contact">
      {/* test */}
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
      {/* 

      */}
    </div>
  );
};

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

const AppWrapper = (props) => {
  const { store = {} } = props;
  console.log(store, "store85");
  useEffect(() => {
    store.injectReducer("app1", reducer);
  }, []);
  return (
    <Provider store={store || {}}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
