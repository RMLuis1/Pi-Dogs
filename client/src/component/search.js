import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearch } from "../redux/actions";
import styles from "./search.module.css";

export function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getSearch(searchText));
    setSearchText("");
  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchImp}
            type="text"
            placeholder="Search..."
            onChange={(e) => handleInput(e)}
          />
          <button
            className={styles.searchBot}
            type="submit"
            size={20}
            onClick={(e) => handleSubmit(e)}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
