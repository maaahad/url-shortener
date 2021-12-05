import React, { memo, useState } from "react";
import { BiCopy, BiTrash } from "react-icons/bi";
import { getJSON } from "../../../lib/getJSON";
import styles from "../../../styles/shorterner/components/Card.module.sass";

export default function Card({ item, deleteItemFromShortenedList = (f) => f }) {
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const deleteItem = (event) => {
    getJSON(
      "delete",
      `${process.env.NEXT_PUBLIC_BASE_API}/delete/tinyurl/${item._id}`
    )
      .then((json) => {
        deleteItemFromShortenedList(json);
      })
      .catch(console.error);
  };

  const feedBackOnCopy = () => {
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy"), 1000);
  };

  const copyToClipBoard = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(item.tinyUrl)
        .then(feedBackOnCopy)
        .catch(console.error);
    } else {
      document.execCommand("copy", true, item.tinyUrl);
      feedBackOnCopy();
    }
  };

  return (
    <div className={styles.cardContainer}>
      <button type="submit" title="Delete this item" onClick={deleteItem}>
        <BiTrash />
      </button>
      <div className={styles.infoContainer}>
        <p>{item.originalUrl}</p>
        <div className={styles.cardAction}>
          {/* in case of a here ... We better use original url */}
          <a href={item.tinyUrl} title="Visit" target="_blank">
            {item.tinyUrl}
          </a>
          <button
            type="button"
            title="Copy to Clipboard"
            onClick={copyToClipBoard}
          >
            {copyButtonText === "Copy" && <BiCopy />}
            <span>{copyButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export const PureCard = memo(
  Card,
  (prevProps, nextProps) => prevProps._id === nextProps._id
);
