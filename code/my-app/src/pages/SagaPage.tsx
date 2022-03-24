import { Button, message } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../common/hooks";

export default function SagaPage() {
  const dispatch = useDispatch();
  const countTakeEvery = useAppSelector((state) => state.MODULE_TODO.countTakeEvery);
  const countTakeLatest = useAppSelector((state) => state.MODULE_TODO.countTakeLatest);

  const handleClickTakeEvery = () => {
    dispatch({
      type: "CLICK_BUTTON_TAKE_EVERY_SAGA",
      payload: {
        time: new Date().toISOString(),
      },
    });
  };

  const handleClickTakeLatest = () => {
    dispatch({
      type: "CLICK_BUTTON_TAKE_LATEST_SAGA",
      payload: {
        time: new Date().toISOString(),
      },
    });
  };

  const handleTakeAndFork = () => {
    dispatch({ type: "MY_REQUEST", payload: "my_payload" });
  };

  useEffect(() => {
    message.success("CLICK_BUTTON_TAKE_EVERY_SAGA " + countTakeEvery, 0.5);
  }, [countTakeEvery]);

  useEffect(() => {
    message.success("CLICK_BUTTON_TAKE_LATEST_SAGA " + countTakeLatest, 0.5);
  }, [countTakeLatest]);

  return (
    <div>
      <h1>SagaPage</h1>

      <div style={{ marginBottom: 5 }}>
        <Button onClick={handleClickTakeEvery}>take every saga</Button> {countTakeEvery}
      </div>

      <div style={{ marginBottom: 5 }}>
        <Button onClick={handleClickTakeLatest}>take latest saga</Button> {countTakeLatest}
      </div>

      <div style={{ marginBottom: 5 }}>
        <Button onClick={handleTakeAndFork}>take and fork</Button> {countTakeLatest}
      </div>
    </div>
  );
}
