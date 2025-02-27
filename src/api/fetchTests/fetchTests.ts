import axios from "axios";
import { Site, Test } from "../../types";

export type TestData = (Omit<Test, "siteId"> & { site: string })[];

const fetchTests = async (): Promise<TestData> => {
  try {
    const [testsResult, sitesResult] = await Promise.allSettled([
      axios.get(`${process.env.REACT_APP_API_URL}/tests`),
      axios.get(`${process.env.REACT_APP_API_URL}/sites`),
    ]);

    if (
      testsResult.status !== "fulfilled" ||
      sitesResult.status !== "fulfilled"
    ) {
      console.error("One or more requests failed.");
      return [];
    }

    const tests: Test[] = testsResult.value.data;
    const sites: Site[] = sitesResult.value.data;

    const siteMap = new Map<number, string>(
      sites.map((site) => [
        site.id,
        site.url.replace(/^https?:\/\/(www\.)?/, ""),
      ])
    );

    const dataWithSites = tests.map(({ siteId, ...rest }) => ({
      ...rest,
      site: siteMap.get(siteId) || "",
    }));

    return dataWithSites;
  } catch (e) {
    console.error("Error fetching tests:", e);
    return [];
  }
};

export default fetchTests;
