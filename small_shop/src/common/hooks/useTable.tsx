import { SelectChangeEvent } from "@mui/material";
import { useDispatch } from "react-redux";
import { IBaseLoad, IBaseFilter } from "../../modules/products/constant";
import formatData from "../utils/formatData";
import formatQueryToPagination from "../utils/formatQueryToPagination";

interface IProps<F> {
  actionLoad: (payload: IBaseLoad<F>) => { type: string; payload: IBaseLoad<F> };
  prevQuery: IBaseFilter<F>;
}

export default function useTable<F>(props: IProps<F>) {
  const dispatch = useDispatch();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
    const payload = formatData<F>(props.prevQuery, { page: nextPage });
    dispatch(props.actionLoad(payload));
  };

  const handleChangeRowPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const payload = formatData<F>(props.prevQuery, { page: 0, limit: parseInt(event.target.value) });
    dispatch(props.actionLoad(payload));
  };

  const handleFilterInput = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = formatData<F>(props.prevQuery, {
      filter: {
        [key]: e.target.value,
      },
    } as unknown as IBaseFilter<F>);
    dispatch(props.actionLoad(payload));
  };

  const handleFilterSelect = (key: string) => (e: SelectChangeEvent<string>) => {
    const payload = formatData<F>(props.prevQuery, {
      filter: {
        [key]: e.target.value,
      },
    } as unknown as IBaseFilter<F>);
    dispatch(props.actionLoad(payload));
  };

  const init = (query?: any) => {
    if (query) {
      const formatQuery = formatQueryToPagination<F>(query);
      const payload = formatData<F>(props.prevQuery, formatQuery);
      dispatch(props.actionLoad(payload));
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
