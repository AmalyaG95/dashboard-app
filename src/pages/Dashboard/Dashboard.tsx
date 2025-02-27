import styles from "./style.module.scss";

import SearchInput from "../../components/SearchInput/SearchInput";
import DataTable from "../../components/DataTable/DataTable";
import DataContext from "../../contexts/DataContext";
import { useEffect, useState } from "react";
import fetchTests, { TestData } from "../../api/fetchTests/fetchTests";
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from "../../utils/storage";

const Dashboard = () => {
  const [tests, setTests] = useState<TestData>([]);
  const [filterText, setFilterText] = useState<string>("");
  const testsStorage = getSessionStorageItem("tests");

  useEffect(() => {
    const fetchData = async () => {
      const testData = await fetchTests();
      setTests(testData);
      setSessionStorageItem("tests", testData);
    };

    if (testsStorage) setTests(testsStorage);
    else fetchData();
  }, []);

  const handleResetFilter = () => {
    setTests(testsStorage);
    // TODO: Reset input value
  };

  return (
    <DataContext.Provider
      value={{ tests, setTests, filterText, setFilterText }}
    >
      <h1 className="pageTitle">Dashboard</h1>

      {!!testsStorage && <SearchInput />}

      <section className={styles.wrapper}>
        {!!tests.length && <DataTable />}
        {!!filterText && tests.length === 0 && (
          <article className={styles.noResults}>
            <h2 className={styles.message}>
              Your search did not match any results.
            </h2>
            <button className="button" onClick={handleResetFilter}>
              Reset
            </button>
          </article>
        )}
      </section>
    </DataContext.Provider>
  );
};

export default Dashboard;
