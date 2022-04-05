/** @jsxImportSource @emotion/react */
import { Card, Typography, Button, Stack, useTheme, Breadcrumbs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTextInput from "../common/components/CustomTextInput";
import { css } from "@emotion/react";
import CustomRadio from "../common/components/CustomRadio";
import CustomSelect from "../common/components/CustomSelect";
import { Link, useHistory, useParams } from "react-router-dom";
import CardHeaderPage from "../common/components/CardHeaderPage";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICategory, IFormProduct } from "../modules/products/constant";
import { useDispatch } from "react-redux";
import { createProductActionSaga, editProductActionSaga } from "../modules/products/actions";
import { fetchAuth } from "../common/utils/fetch";
import { errorActionSaga } from "../modules/app/actions";
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
  const methods = useForm<IFormProduct>({
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
  const id = params.id;
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleCancel = () => {
    history.goBack();
  };

  const onSubmit = (value: IFormProduct) => {
    if (id == "null") {
      dispatch(createProductActionSaga(value));
    } else {
      dispatch(editProductActionSaga({ ...value, id: params.id }));
    }
  };

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

    const getProduct = async () => {
      try {
        const rs: AxiosResponse<ICategory[]> = await fetchAuth("GET", "/products/" + params.id);

        if (rs.status === 200) {
          Object.keys(rs.data).forEach((key: any) => {
            methods.setValue(key, rs.data[key]);
          });
        } else {
          dispatch(errorActionSaga({ type: "error", message: "Fail to load product" }));
          history.goBack();
        }
      } catch (error) {
        dispatch(errorActionSaga({ type: "error", message: "Something wrong" }));
      }
    };

    if (id == "null") {
      getData();
    } else {
      (function () {
        Promise.all([getProduct(), getData()]);
      })();
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
            {id === "null" ? "Create" : "Edit"} product
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
              {id === "null" ? "Create new" : "Edit"} product
            </Link>
          </Breadcrumbs>
        </Stack>
      </CardHeaderPage>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          css={css`
            width: 500px;
          `}
        >
          <div className="form-item">
            <CustomTextInput
              muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true } }}
              label="Product image"
              name="imageUrl"
            ></CustomTextInput>
          </div>

          <div className="form-item">
            <CustomTextInput
              muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true } }}
              label="Product name"
              name="productName"
            ></CustomTextInput>
          </div>

          <div className="form-item">
            <CustomTextInput
              muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true }, type: "number" }}
              label="Product price"
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
              name="inStock"
            ></CustomRadio>
          </div>

          <div className="form-item">
            <CustomTextInput
              muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true }, type: "number" }}
              label="Amount"
              name="amount"
            ></CustomTextInput>
          </div>

          <div className="form-item">
            <CustomSelect
              items={categories.map((c) => ({ value: c.value, name: c.name }))}
              label="Category"
              name="categoryName"
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
      </FormProvider>
    </Card>
  );
}
