import { useContext } from "react";

import styles from "./style.module.scss";

import SearchSvg from "../../icons/SearchSvg";
import useDebounce from "../../hooks/useDebounce";
import DataContext from "../../contexts/DataContext";

const SearchInput = () => {
  const { tests, filteredTests, setFilteredTests } = useContext(DataContext);

  const search = useDebounce((v) => {
    if (!!v) {
      const foundTests = tests.filter(({ name }) =>
        name.toLowerCase().includes(v)
      );

      setFilteredTests(foundTests);
    } else {
      setFilteredTests(tests);
    }
  }, 800);

  const handleFilterByName = (e) => search(e.target.value);

  return (
    <label className={styles.wrapper} htmlFor="">
      <SearchSvg />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="What test are you looking for?"
        onChange={handleFilterByName}
      />
      <span className={styles.searchResultsNumber}>
        {filteredTests.length} tests
      </span>
    </label>
  );
};

export default SearchInput;
