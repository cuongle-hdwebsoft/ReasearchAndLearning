/** @jsxImportSource @emotion/react */
import { Card, Typography, Button, Stack, useTheme, Breadcrumbs, Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../common/components/CustomTextInput";
import { css } from "@emotion/react";
import CustomRadio from "../common/components/CustomRadio";
import CustomSelect from "../common/components/CustomSelect";
import { Link, useHistory } from "react-router-dom";
import CardHeaderPage from "../common/components/CardHeaderPage";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  productName: string;
  price: number;
  inStock: boolean;
  amount: number;
  categoryName: string;
  image: string;
}

const schema = yup.object({
  image: yup.string().required(),
  productName: yup.string().required(),
  price: yup.number().positive().min(1).required(),
  inStock: yup.bool(),
  amount: yup.number().positive().min(1).required(),
  categoryName: yup.string().required(),
});

export default function ProductItemPage() {
  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: {
      image: "",
      productName: "",
      price: 0,
      inStock: true,
      amount: 0,
      categoryName: "",
    },
    resolver: yupResolver(schema),
  });
  const theme = useTheme();
  const history = useHistory();

  const handleCancel = () => {
    history.goBack();
  };

  const onSubmit = (value: IForm) => {
    console.log(value);
  };

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
            Create product
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
              Create new product
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
            name="image"
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
            items={[
              { name: "Category 1", value: "1" },
              { name: "Category 2", value: "2" },
            ]}
            label="Category"
            name="categoryName"
            control={control}
            muiProps={{ sx: { minWidth: 500 }, size: "small" }}
          ></CustomSelect>
        </div>

        <Stack direction={"row"} justifyContent="space-between">
          <Button onClick={handleCancel} color="error" variant="outlined" type="submit">
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
