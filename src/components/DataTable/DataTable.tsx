"use server";

import styles from "./style.module.scss";

import { useContext, useState } from "react";
import DataContext from "../../contexts/DataContext";
import { Status } from "../../types";
import { Link } from "react-router";

const tableHeaders = ["Name", "Type", "Status", "Site", ""];

const DataTable = () => {
  const { tests, setTests, filteredTests, setFilteredTests } =
    useContext(DataContext);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const statusOrder = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"];

  console.log("5555555555555555", tests);

  const handleSortByHeader = (header: string) => {
    const sortedTests = tests.toSorted((a, b) => {
      if (header === "status") {
        const order =
          sortOrder === "asc" ? statusOrder : [...statusOrder].reverse();
        return order.indexOf(a.status) - order.indexOf(b.status);
      } else {
        const comparison = a[header].localeCompare(b[header]);
        return sortOrder === "asc" ? comparison : -comparison;
      }
    });

    setTests(sortedTests);
    setFilteredTests(sortedTests);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  console.log("tests33", tests);

  return (
    <table className={styles.container}>
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index} className={styles.tableHeader}>
              <span onClick={(_e) => handleSortByHeader(header.toLowerCase())}>
                {header}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(!!filteredTests.length ? filteredTests : tests).map(
          ({ id, ...restTest }, index) => {
            const { status } = restTest;
            const isDraft = status === Status.DRAFT;
            const buttonText = isDraft ? "Finalize" : "Results";

            return (
              <tr className={styles.row} key={index}>
                {Object.values(restTest).map((value: any, i) => (
                  <td key={i} className={styles.column}>{value}</td>
                ))}
                <td>
                  <Link to={`/${buttonText.toLowerCase()}/${id}`}>
                    {buttonText}
                  </Link>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
