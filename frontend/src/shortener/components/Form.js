import React, { useState } from "react";
import { getJSON } from "../../../lib/getJSON";
import styles from "../../../styles/shorterner/components/Form.module.sass";

function validURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}

export default function Form({ addToShortenedList = (f) => f }) {
  const [urlInputText, setUrlInputText] = useState("");
  const [validUrl, setValidUrl] = useState(true);

  const onUrlInputTextChange = (event) => {
    setUrlInputText(event.target.value);
    validURL(event.target.value) || !event.target.value
      ? setValidUrl(true)
      : setValidUrl(false);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    addToShortenedList(urlInputText);
    setUrlInputText("");
  };

  return (
    <form className={styles.formContainer} onSubmit={onFormSubmit}>
      <div className={styles.actionGroup}>
        <input
          type="url"
          value={urlInputText}
          placeholder="Enter your long URL to be shortened"
          onChange={onUrlInputTextChange}
        />
        <button type="submit" title="Get Tiny URL">
          Shorten
        </button>
      </div>
      {!validUrl && <p>Please enter a valid URL...</p>}
    </form>
  );
}
