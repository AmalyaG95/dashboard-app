import styles from "./style.module.scss";

import { useContext, useState } from "react";
import DataContext from "../../contexts/DataContext";
import { FormattedTypes, Status, StatusColors } from "../../types";
import { Link } from "react-router";
import { STATUS_ORDER, TABLE_HEADERS } from "../../constants";
import cn from "classnames";
import capitalize from "../../utils/capitalize/capitalize";
import getRandomRowColor from "../../utils/getRandomColor/getRandomColor";

const DataTable = () => {
  const { tests, setTests } = useContext(DataContext);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortByHeader = (header: string) => {
    const sortedTests = tests.toSorted((a, b) => {
      if (header === "status") {
        const order =
          sortOrder === "asc" ? STATUS_ORDER : [...STATUS_ORDER].reverse();
        return order.indexOf(a.status) - order.indexOf(b.status);
      } else {
        const comparison = a[header].localeCompare(b[header]);
        return sortOrder === "asc" ? comparison : -comparison;
      }
    });

    setTests(sortedTests);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <table className={styles.container}>
      <thead>
        <tr className={styles.row}>
          {TABLE_HEADERS.map((header, index) => {
            const TitleElement = !!header ? "button" : "span";

            return (
              <th key={index} className={cn(styles.tableHeader, styles.column)}>
                <TitleElement
                  onClick={(_e) => handleSortByHeader(header.toLowerCase())}
                >
                  {header}
                </TitleElement>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tests.map(({ id, ...restTest }, index) => {
          const { status } = restTest;
          const isDraft = status === Status.DRAFT;
          const buttonText = isDraft ? "Finalize" : "Results";

          return (
            <tr
              className={styles.row}
              style={{ borderLeft: `3px solid ${getRandomRowColor()}` }}
              key={index}
            >
              {Object.values(restTest).map((value: any, i) => {
                const isStatus = i === 2;
                const isType = i === 1;
                const formattedValue = isStatus
                  ? capitalize(value)
                  : isType
                  ? FormattedTypes[value]
                  : value;
                const formatColor = isStatus ? StatusColors[status] : "unset";

                return (
                  <td
                    key={i}
                    className={cn(styles.column)}
                    style={{
                      color: formatColor,
                    }}
                  >
                    {formattedValue}
                  </td>
                );
              })}
              <td className={styles.column}>
                <Link
                  className={cn("button", styles.detailsButton, {
                    [styles.draftButton]: isDraft,
                  })}
                  to={`/${buttonText.toLowerCase()}/${id}`}
                >
                  {buttonText}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
