import { useContext } from "react";

import styles from "./style.module.scss";

import SearchSvg from "../../icons/SearchSvg";
import useDebounce from "../../hooks/useDebounce";
import DataContext from "../../contexts/DataContext";
import { getSessionStorageItem } from "../../utils/storage";

const SearchInput = () => {
  const { tests, setTests, filterText, setFilterText } =
    useContext(DataContext);

  const search = useDebounce((v) => {
    setFilterText(v);

    if (!!v) {
      const foundTests = getSessionStorageItem("tests").filter(({ name }) => {
        console.log("name", name, v);

        return name.toLowerCase().includes(v);
      });
      console.log("foundTests", foundTests, v);

      setTests(foundTests);
    } else {
      setTests(JSON.parse(sessionStorage.getItem("tests")));
    }
  }, 800);

  const handleFilterByName = (e) => search(e.target.value);

  return (
    <label className={styles.wrapper} htmlFor="search">
      <SearchSvg />
      <input
        id="search"
        className={styles.searchInput}
        type="text"
        placeholder="What test are you looking for?"
        onChange={handleFilterByName}
      />
      <span className={styles.searchResultsNumber}>{tests.length} tests</span>
    </label>
  );
};

export default SearchInput;
