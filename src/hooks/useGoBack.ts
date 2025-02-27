import { useNavigate } from "react-router";

const useGoBack = () => {
  const navigate = useNavigate();

  return () => navigate(-1);
};

export default useGoBack;
