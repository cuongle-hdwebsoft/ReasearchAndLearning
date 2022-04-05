import { useProductReducerHook } from "../../modules/products/hook";
import { useDispatch } from "react-redux";
import { ICategory } from "../../modules/products/constant";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { fetchAuth } from "../utils/fetch";
import { AxiosResponse } from "axios";
import { errorActionSaga } from "../../modules/app/actions";
import useTableProduct from "../hooks/useTableProduct";

export default function FilterProducts() {
  const { filter } = useProductReducerHook();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { t } = useTranslation();
  const table = useTableProduct();

  useEffect(() => {
    const getData = async () => {
      try {
        const rs: AxiosResponse<ICategory[]> = await fetchAuth("GET", "/categories");

        if (rs.status === 200) {
          setCategories(rs.data);
        } else {
          dispatch(errorActionSaga({ type: "error", message: "Fail to load categories" }));
        }
      } catch (error) {
        dispatch(errorActionSaga({ type: "error", message: "Something wrong" }));
      }
    };

    getData();
  }, []);

  return (
    <>
      <Stack direction={"row"} spacing={4}>
        <TextField
          onChange={table.handleFilterInput("productName")}
          InputLabelProps={{ shrink: true }}
          size="small"
          label={t("ProductName")}
          value={filter?.productName ? filter?.productName : ""}
        ></TextField>
        <FormControl size="small" sx={{ width: 300 }}>
          <InputLabel>{t("Category")}</InputLabel>
          <Select
            value={filter?.categoryName ? filter?.categoryName : ""}
            onChange={table.handleFilterSelect("categoryName")}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
