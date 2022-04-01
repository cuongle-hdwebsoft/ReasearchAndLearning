import { useProductReducerHook } from "../../modules/products/hook";
import { useDispatch } from "react-redux";
import { ICategory, IFilterProduct } from "../../modules/products/constant";
import { loadProducts } from "../../modules/products/actions";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { fetchAuth } from "../utils/fetch";
import { AxiosResponse } from "axios";
import { errorAction } from "../../modules/app/actions";

export default function FilterProducts() {
  const { filter } = useProductReducerHook();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { t } = useTranslation();

  const handleChangeInput = (key: keyof IFilterProduct) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      loadProducts({
        [key]: e.target.value,
      }),
    );
  };

  const handleChangeSelect = (key: keyof IFilterProduct) => (e: SelectChangeEvent<string>) => {
    dispatch(
      loadProducts({
        [key]: e.target.value,
      }),
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const rs: AxiosResponse<ICategory[]> = await fetchAuth("GET", "/categories");

        if (rs.status === 200) {
          setCategories(rs.data);
        } else {
          dispatch(errorAction({ type: "error", message: "Fail to load categories" }));
        }
      } catch (error) {
        dispatch(errorAction({ type: "error", message: "Something wrong" }));
      }
    };

    getData();
  }, []);

  return (
    <>
      <Stack direction={"row"} spacing={4}>
        <TextField
          onChange={handleChangeInput("productName")}
          InputLabelProps={{ shrink: true }}
          size="small"
          label={t("ProductName")}
          value={filter?.productName ? filter?.productName : ""}
        ></TextField>
        <FormControl size="small" sx={{ width: 300 }}>
          <InputLabel>{t("Category")}</InputLabel>
          <Select
            value={filter?.categoryName ? filter?.categoryName : ""}
            onChange={handleChangeSelect("categoryName")}
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
