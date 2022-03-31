/** @jsxImportSource @emotion/react */
import { Card, Typography, Button, Stack, useTheme, Breadcrumbs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../common/components/CustomTextInput";
import { css } from "@emotion/react";
import CustomRadio from "../common/components/CustomRadio";
import CustomSelect from "../common/components/CustomSelect";
import { Link, useHistory, useParams } from "react-router-dom";
import CardHeaderPage from "../common/components/CardHeaderPage";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICategory, IFormProduct, IProduct } from "../modules/products/constant";
import { useDispatch } from "react-redux";
import { createProduct, editProduct } from "../modules/products/actions";
import { fetchAuth } from "../common/utils/fetch";
import { errorAction } from "../modules/app/actions";
import { AxiosResponse } from "axios";

const schema = yup.object({
  imageUrl: yup.string().required(),
  productName: yup.string().required(),
  price: yup.number().positive().min(1).required(),
  inStock: yup.bool(),
  amount: yup.number().positive().min(1).required(),
  categoryName: yup.string().required(),
});

export default function ProductItemPage() {
  const { control, handleSubmit, setValue } = useForm<IFormProduct>({
    defaultValues: {
      imageUrl: "",
      productName: "",
      price: 0,
      inStock: true,
      amount: 0,
      categoryName: "",
      isActive: true,
    },
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const isEdit = params.id ? true : false;

  const handleCancel = () => {
    history.goBack();
  };

  const onSubmit = (value: IFormProduct) => {
    if (!isEdit) {
      dispatch(createProduct(value));
    } else {
      dispatch(editProduct({ ...value, id: params.id }));
    }
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

    const getProduct = async () => {
      try {
        const rs: AxiosResponse<ICategory[]> = await fetchAuth("GET", "/products/" + params.id);

        if (rs.status === 200) {
          Object.keys(rs.data).forEach((key: any) => {
            setValue(key, rs.data[key]);
          });
        } else {
          dispatch(errorAction({ type: "error", message: "Fail to load product" }));
        }
      } catch (error) {
        dispatch(errorAction({ type: "error", message: "Something wrong" }));
      }
    };

    if (isEdit) {
      getData();
      getProduct();
    } else {
      getData();
    }
  }, []);

  console.log("render");

  return (
    <Card
      css={css`
        padding: 30px;
        min-height: 100%;
      `}
    >
      <CardHeaderPage>
        <Stack direction={"row"} alignItems="center">
          <Typography
            css={css`
              margin-bottom: 10px;
            `}
            variant="h4"
          >
            {isEdit ? "Edit" : "Create"} product
          </Typography>
          <Breadcrumbs
            separator="›"
            css={css`
              margin-left: 10px;
            `}
          >
            <Link
              to="/"
              css={css`
                color: ${theme.palette.text.secondary};
                text-decoration: none;
              `}
            >
              Dashboard
            </Link>
            <Link
              css={css`
                color: ${theme.palette.text.secondary};
                text-decoration: none;
              `}
              to="/products"
            >
              Products
            </Link>
            <Link
              css={css`
                color: ${theme.palette.text.secondary};
                font-weight: bold;
              `}
              to="/products/null"
            >
              {isEdit ? "Edit" : "Create new"} product
            </Link>
          </Breadcrumbs>
        </Stack>
      </CardHeaderPage>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          width: 500px;
        `}
      >
        <div className="form-item">
          <CustomTextInput
            muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true } }}
            label="Product image"
            control={control}
            name="imageUrl"
          ></CustomTextInput>
        </div>

        <div className="form-item">
          <CustomTextInput
            muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true } }}
            label="Product name"
            control={control}
            name="productName"
          ></CustomTextInput>
        </div>

        <div className="form-item">
          <CustomTextInput
            muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true }, type: "number" }}
            label="Product price"
            control={control}
            name="price"
          ></CustomTextInput>
        </div>

        <div className="form-item">
          <CustomRadio
            items={[
              { name: "Yes", value: "true" },
              { name: "No", value: "false" },
            ]}
            label="In stock"
            control={control}
            name="inStock"
          ></CustomRadio>
        </div>

        <div className="form-item">
          <CustomTextInput
            muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true }, type: "number" }}
            label="Amount"
            control={control}
            name="amount"
          ></CustomTextInput>
        </div>

        <div className="form-item">
          <CustomSelect
            items={categories.map((c) => ({ value: c.value, name: c.name }))}
            label="Category"
            name="categoryName"
            control={control}
            muiProps={{ sx: { minWidth: 500 } }}
          ></CustomSelect>
        </div>

        <Stack direction={"row"} justifyContent="space-between">
          <Button onClick={handleCancel} color="error" variant="outlined" type="button">
            cancel
          </Button>
          <Button variant="outlined" type="submit">
            submit
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
