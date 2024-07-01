import classes from "./style.module.css";
import { useEffect, useState } from "react";

export default function AIChat() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  const email = localStorage.getItem("user");
  async function fetchChats() {
    try {
      const response = await fetch(`http://localhost:3000/QA/chats/${email}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  function emailChangeHandler(event) {
    setQuestion(event.target.value);
  }

  async function submitHandler() {
    setLoading(true);
    const response = await fetch("http://localhost:3000/QA/query", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        question: question,
        websiteNumber: 1,
      }),
    });
    setLoading(false);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    fetchChats();
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.chatBoxContainer}>
        <div className={classes.chatBox}>
          <ul className={classes.chat_list}>
            {chats.map((chat) => {
              return (
                <li key={chat._id}>
                  <p className={classes.question}>
                    <span className={classes.question_text}>
                      {chat.question}
                    </span>
                  </p>
                  <p className={classes.answer}>
                    <span className={classes.answer_text}>{chat.answer}</span>
                    <span className={classes.accuracy}>
                      Accuracy: {chat.accuracy.toFixed(2)}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={classes.loading}>
          {!loading && <p>Dropdown</p>}
          {!loading && <p>Website Link</p>}
          {loading && <p>Loading...</p>}
        </div>
      </div>
      <div className={classes.input_box}>
        <input
          type="text"
          required
          className={classes.input_element}
          value={question}
          onChange={emailChangeHandler}
        />
        <button
          type="button"
          className={classes.button}
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
