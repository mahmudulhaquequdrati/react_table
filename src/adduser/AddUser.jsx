import React, { useState } from "react";

const AddUser = ({ getRoute }) => {
  const [text, setText] = useState("");
  const submit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          setText("");
          getRoute();
        }
      });
  };
  return (
    <div
      className="update"
      style={{
        width: "100%",
      }}
    >
      <form
        onSubmit={submit}
        className="update"
        style={{
          width: "85%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{
            height: "30px",
            width: "100%",
            border: "1px solid #ccc",
          }}
          placeholder="Name"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* <input
          style={{
            height: "30px",
            width: "100%",
            border: "1px solid #ccc",
          }}
          type="submit"
          // onClick={submit}
        /> */}
      </form>
    </div>
  );
};

export default AddUser;
