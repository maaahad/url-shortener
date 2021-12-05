import { PureCard } from "./Card";
import { getJSON } from "../../../lib/getJSON";
import { BiLinkAlt } from "react-icons/bi";
import styles from "../../../styles/shorterner/components/List.module.sass";

export default function List({
  list,
  clearShortenedList = (f) => f,
  deleteItemFromShortenedList = (f) => f,
}) {
  const clearAll = (event) => {
    getJSON("delete", `${process.env.NEXT_PUBLIC_BASE_API}/delete/tinyurls/all`)
      .then((json) => {
        clearShortenedList();
      })
      .catch(console.error);
  };
  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h2>
          <BiLinkAlt />
          <span>Your URLs</span>
        </h2>
        <button type="button" title="Clear All" onClick={clearAll}>
          Clear All
        </button>
      </div>

      <div className={styles.list}>
        {list.map((item) => (
          <PureCard
            key={item._id}
            item={item}
            deleteItemFromShortenedList={deleteItemFromShortenedList}
          />
        ))}
      </div>
    </div>
  );
}
