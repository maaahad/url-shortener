import React, { useEffect, useState, useReducer, useRef } from "react";
import Form from "./components/Form";
import List from "./components/List";
import { getJSON } from "../../lib/getJSON";
import styles from "../../styles/shorterner/Shortener.module.sass";

export default function Shortener() {
  const [shortenedList, setShortenedList] = useState([]);
  const [displayAlert, toggleDisplayAlert] = useReducer(
    (displayAlert) => !displayAlert,
    false
  );

  const timer = useRef();

  const addToShortenedList = (originalUrl) => {
    if (shortenedList.find((item) => item.originalUrl === originalUrl)) {
      if (timer.current) clearTimeout(timer.current);
      toggleDisplayAlert();
      timer.current = setTimeout(() => toggleDisplayAlert(), 1000);
    } else {
      getJSON("post", `${process.env.NEXT_PUBLIC_BASE_API}/shorten`, {
        originalUrl,
      })
        .then((json) => {
          setShortenedList((state) => [json, ...state]);
        })
        .catch(console.error);
    }
  };

  const clearShortenedList = () => {
    setShortenedList([]);
  };

  const deleteItemFromShortenedList = (deletedItem) => {
    setShortenedList((state) =>
      state.filter((item) => item._id !== deletedItem._id)
    );
  };

  useEffect(() => {
    console.log(`${process.env.NEXT_PUBLIC_BASE_API}/tinyurls/all`);
    getJSON("get", `${process.env.NEXT_PUBLIC_BASE_API}/tinyurls/all`)
      .then((json) => setShortenedList(json))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.shortenerContainer}>
      <section>
        <Form addToShortenedList={addToShortenedList} />
      </section>
      {shortenedList.length ? (
        <section>
          <List
            list={shortenedList}
            clearShortenedList={clearShortenedList}
            deleteItemFromShortenedList={deleteItemFromShortenedList}
          />
        </section>
      ) : null}

      {displayAlert && (
        <div className={styles.feedback}>
          <p>Shorten URL exist</p>
        </div>
      )}
    </div>
  );
}
