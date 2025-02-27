import axios from "axios";
import { Test } from "../../types";

export type TestData = (Omit<Test, "siteId"> & { site: string })[];

const fetchTests = async (): Promise<TestData> => {
  try {
    const response = await axios.get("http://localhost:3100/tests");
    const data: Test[] = response.data;

    const dataWithSites = await Promise.allSettled(
      data.map(async ({ siteId, ...rest }) => {
        try {
          const siteResponse = await axios.get(
            `http://localhost:3100/sites/${siteId}`
          );
          const { statusText, data } = siteResponse;

          if (statusText === "OK") {
            return {
              ...rest,
              site: data.url.replace(/^https?:\/\/(www\.)?/, ""),
            };
          } else {
            throw new Error("Error fetching site data");
          }
        } catch (error) {
          console.error("Error fetching site:", error);
        }
      })
    );

    console.log(
      "4444444444444",
      dataWithSites
        .filter(
          (item): item is PromiseFulfilledResult<any> =>
            item.status === "fulfilled"
        )
        .map((data) => data.value)
    );
    // Filter out rejected promises and return only fulfilled ones
    return dataWithSites
      .filter(
        (item): item is PromiseFulfilledResult<any> =>
          item.status === "fulfilled"
      )
      .map((data) => data.value);
  } catch (e) {
    console.error("Error fetching tests:", e);
    return []; // Return empty array on error
  }
};

export default fetchTests;
