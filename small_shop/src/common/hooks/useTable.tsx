import { SelectChangeEvent } from "@mui/material";
import { useDispatch } from "react-redux";
import { IBaseLoadUnknown } from "../../modules/products/constant";
import formatQueryToPagination from "../utils/formatQueryToPagination";

interface IProps<T> {
  actionLoad: (value: T) => { type: string; payload: T };
}

export default function useTable<T = IBaseLoadUnknown>(props: IProps<T>) {
  const dispatch = useDispatch();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
    dispatch(props.actionLoad({ page: nextPage } as unknown as T));
  };

  const handleChangeRowPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(props.actionLoad({ page: 0, limit: parseInt(event.target.value) } as unknown as T));
  };

  const handleFilterInput = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      props.actionLoad({
        filter: {
          [key]: e.target.value,
        },
      } as unknown as T),
    );
  };

  const handleFilterSelect = (key: string) => (e: SelectChangeEvent<string>) => {
    dispatch(
      props.actionLoad({
        filter: {
          [key]: e.target.value,
        },
      } as unknown as T),
    );
  };

  const init = (query?: any) => {
    if (query) {
      const formatQuery = formatQueryToPagination<T>(query);
      dispatch(props.actionLoad(formatQuery as unknown as T));
    }
  };

  return {
    handleChangePage,
    handleChangeRowPerPage,
    handleFilterInput,
    handleFilterSelect,
    init,
  };
}
