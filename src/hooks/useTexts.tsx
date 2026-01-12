import { useEffect, useState } from "react";

export type Texts = {
  easy: { id: number; text: string }[];
  medium: { id: number; text: string }[];
  hard: { id: number; text: string }[];
};
const useTexts = () => {
  const [texts, setTexts] = useState({} as Texts);

  useEffect(() => {
    const fetchTexts = async () => {
      const response = await fetch("../../data.json");
      const data = await response.json();
      setTexts(data);
    };
    fetchTexts();
  }, []);

  return { texts };
};

export default useTexts;
