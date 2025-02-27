import styles from "./style.module.scss";

import useGoBack from "../../hooks/useGoBack";
import useFetchTest from "../../hooks/useFetchTest";

import BackSvg from "../../icons/BackSvg";

type TestProps = {
  title: string;
};

const Test = ({ title }: TestProps) => {
  const goBack = useGoBack();
  const test = useFetchTest();

  return (
    <>
      <div>
        <h1 className="pageTitle">{title}</h1>
        {!!test && <h4 className={styles.subtitle}> {test.name}</h4>}
      </div>

      <button className="backButton" onClick={goBack}>
        <BackSvg /> Back
      </button>
    </>
  );
};

export default Test;
