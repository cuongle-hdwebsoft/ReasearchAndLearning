import { useCallback, useMemo, useState } from "react";
import Input from "../common/components/Input";
import logo from "../common/images/subcriber.png";

function UseCallbackUseMemo() {
  const [count, setState] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const handleClickSub = () => {
    setState(count + 1);
  };

  // const handleChangeInput = (value: string) => {
  //     setValue(value)
  // }

  const handleChangeInput = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <div>
      <h1>Subcription App!</h1>
      <img style={{ height: 500, display: "block", margin: "auto" }} src={logo} alt="" />
      <div style={{ textAlign: "center" }}>
        <p>Thank you for loving my app. Don't hesitate to contact with me. Subcript email to update lastest post</p>
        {/* chưa optimize */}
        {/* <Input value={value} /> */}

        {/* optimize 1 */}
        {/* {
                    useMemo(() => {
                        return <Input value={value} />
                    }, [value])
                } */}

        {/* optimize 2 */}
        {useMemo(() => {
          return <Input value={value} onChange={handleChangeInput} />;
        }, [value, handleChangeInput])}
        <button className="btn" onClick={handleClickSub}>
          Click now {count}
        </button>
      </div>
    </div>
  );
}

export default UseCallbackUseMemo;
