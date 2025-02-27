import styles from "./style.module.scss";

import SearchInput from "../../components/SearchInput/SearchInput";
import DataTable from "../../components/DataTable/DataTable";
import DataContext from "../../contexts/DataContext";
import { useEffect, useState } from "react";
import fetchTests, { TestData } from "../../utils/fetchTests/fetchTests";

const Dashboard = () => {
  const [tests, setTests] = useState<TestData>([]);
  const [filteredTests, setFilteredTests] = useState<TestData>([]);

  useEffect(() => {
    const fetchData = async () => {
      const testData = await fetchTests();
      setTests(testData);
    };

    fetchData();
  }, []);

  const handleResetFilter = () => {
    setFilteredTests(tests);
  };

  return (
    <DataContext.Provider
      value={{ tests, setTests, filteredTests, setFilteredTests }}
    >
      <h1 className="pageTitle">Dashboard</h1>

      <SearchInput />

      <section>
        {!!filteredTests.length ||
        (filteredTests.length === 0 && !!tests.length) ? (
          <DataTable />
        ) : (
          <article className={styles.noResults}>
            <p className={styles.message}>
              {true && "Your search did not match any results."}
            </p>
            <button className={styles.resetButton} onClick={handleResetFilter}>
              Reset
            </button>
          </article>
        )}
      </section>
    </DataContext.Provider>
  );
};

export default Dashboard;
