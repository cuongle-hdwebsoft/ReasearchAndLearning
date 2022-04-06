/** @jsxImportSource @emotion/react */
import { Card, Typography, Button, Stack, useTheme, Breadcrumbs } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomTextInput from "../../../common/components/CustomTextInput";
import { css } from "@emotion/react";
import CustomRadio from "../../../common/components/CustomRadio";
import CustomSelect from "../../../common/components/CustomSelect";
import { Link, useHistory, useParams } from "react-router-dom";
import CardHeaderPage from "../../../common/components/CardHeaderPage";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFormProduct } from "../constant";
import useCategory from "../hooks/useCategory";
import useGetProductItem from "../hooks/useGetProductItem";
import useEdit from "../hooks/useEdit";
import useCreate from "../hooks/useCreate";

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
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { isLoading: isLoadingCategories, categories } = useCategory();
  const { isLoading: isLoadingProduct, product } = useGetProductItem(id);
  const { handleEdit } = useEdit();
  const { handleCreate } = useCreate();

  const handleCancel = () => {
    history.goBack();
  };

  const onSubmit = (value: IFormProduct) => {
    if (id == "null") {
      handleCreate(value);
    } else {
      handleEdit(value, id);
    }
  };

  useEffect(() => {
    if (id !== "null" && !isLoadingProduct && product) {
      Object.keys(product).forEach((key: any) => {
        methods.setValue(key, product[key]);
      });
    }
  }, [isLoadingProduct, product, id]);

  // console.log(isLoadingCategories, isLoadingProduct);

  if (isLoadingCategories || isLoadingProduct) {
    return null;
  }

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
