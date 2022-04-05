import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppReducerHook } from "../../modules/app/hook";

interface IProps {
  children?: React.ReactElement | React.ReactElement[];
}

export default function PublicUtils(props: IProps) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { toast, history: historyReducer } = useAppReducerHook();

  useEffect(() => {
    if (toast) {
      enqueueSnackbar(toast.message, { variant: toast.type });
    }
  }, [toast]);

  useEffect(() => {
    if (historyReducer) history.push(historyReducer.path);
  }, [historyReducer]);

  return <>{props.children}</>;
}
