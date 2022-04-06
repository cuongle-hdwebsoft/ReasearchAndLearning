import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ProductApi from "../../../apis/services/products";
import { errorActionSaga } from "../../app/actions";

export default function useGetProductItem(id: string) {
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (id === "null") {
        setLoading(false);
        return;
      }

      ProductApi.getById(id)
        .then((result) => {
          if (!result.error) {
            setProduct(result.data);
          } else {
            dispatch(errorActionSaga({ type: "error", message: "Fail to load product" }));
            history.goBack();
          }
        })
        .catch(() => dispatch(errorActionSaga({ type: "error", message: "Something wrong" })))
        .finally(() => setLoading(false));
    })();
  }, [id]);

  return React.useMemo(
    () => ({
      product,
      isLoading,
    }),
    [product, isLoading],
  );
}
