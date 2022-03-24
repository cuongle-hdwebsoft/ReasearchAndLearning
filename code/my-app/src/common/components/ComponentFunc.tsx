import { useEffect, useState } from "react";

interface IProps {
  text?: string;
  theme?: string;
}

export default function ComponentFunc(props: IProps) {
  const [count, setCount] = useState<number>(0);

  console.log(props);

  useEffect(() => {
    console.log("ComponentFunc mounted");
  }, []);

  useEffect(() => {
    console.log("ComponentFunc updated");
  });

  useEffect(() => {
    console.log("ComponentFunc count updated");
  }, [count]);

  const handleClickButton = () => {
    setCount(count + 1);
  };

  console.log("ComponentFunc render");

  return (
    <div className="function-component" onClick={handleClickButton}>
      ComponentFunc {count}
    </div>
  );
}
