import Dropdown from "../Dropdown/Dropdown";
import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";

export default function AIChat() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [website, setWebsite] = useState("");
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);
  const [palceholder, setPlaceholder] = useState(
    "ask questions like what is the radius, circumference, temperature, day length, ..."
  );
  const email = localStorage.getItem("user");
  async function fetchChats() {
    try {
      const response = await fetch(`${BASE_URL}/ai/chats/${email}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  async function fetchWebsites() {
    const response = await fetch(`${BASE_URL}/ai/websites`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setOptions(data);
  }

  useEffect(() => {
    fetchChats();
    fetchWebsites();
  }, []);

  function emailChangeHandler(event) {
    setError(false);
    setPlaceholder(
      "ask questions like what is the radius, circumference, temperature, day length, ..."
    );
    setQuestion(event.target.value);
  }

  async function submitHandler() {
    if (!website) {
      setQuestion("");
      setPlaceholder("Please select a website before asking questions.");
      setError(true);
      return;
    }
    if (question.length < 1) {
      setPlaceholder("Please enter a valid question.");
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    const response = await fetch(`${BASE_URL}/ai/query`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        question: question,
        websiteNumber: website.value,
      }),
    });
    setLoading(false);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    setWebsite("");
    fetchChats();
  }

  async function optionSelectHandler(option) {
    const response = await fetch(`${BASE_URL}/crawler/data/${option.value}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    setWebsite(option);
  }

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
                      Question&#x2192; {chat.question}
                    </span>
                  </p>
                  <p className={classes.answer}>
                    <span className={classes.answer_text}>
                      Answer&#x2192;{chat.answer}
                    </span>
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
          {!loading && (
            <Dropdown options={options} onSelect={optionSelectHandler} />
          )}
          {website && !loading && (
            <p>Visit the website to view its content&#x2192;</p>
          )}
          {!loading && website && (
            <p>
              <a href={website.url} target="_blank" rel="noopener noreferrer">
                Website Link&#x2197;
              </a>
            </p>
          )}
          {!loading && !website && (
            <p>&#x2190;Select a website from the dropdown on the left.</p>
          )}
          {loading && <p>Loading...</p>}
        </div>
      </div>
      <div className={classes.input_box}>
        <input
          type="text"
          required
          className={
            !error ? classes.input_element : classes.input_element_error
          }
          value={question}
          onChange={emailChangeHandler}
          placeholder={palceholder}
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
