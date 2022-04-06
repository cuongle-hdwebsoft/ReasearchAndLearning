import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CategoryApi from "../../../apis/services/category";
import { errorActionSaga } from "../../app/actions";
import { ICategory } from "../constant";

export default function useCategory() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      CategoryApi.getAll()
        .then((result) => {
          if (result.error) {
            return dispatch(errorActionSaga({ type: "error", message: "Fail to load categories" }));
          }

          setCategories(result.data);
        })
        .catch(() => {
          dispatch(errorActionSaga({ type: "error", message: "Something wrong" }));
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  return React.useMemo(
    () => ({
      isLoading,
      categories,
    }),
    [isLoading, categories],
  );
}
