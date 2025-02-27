import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Test } from "../types";
import getTest from "../api/getTest/getTest";

const useFetchTest = () => {
  const { testId } = useParams();

  const [test, setTest] = useState<Test>();

  useEffect(() => {
    if (!!testId) {
      const fetchData = async () => {
        const testData = await getTest(testId);
        setTest(testData);
      };

      fetchData();
    }
  }, [testId]);

  return test;
};

export default useFetchTest;
