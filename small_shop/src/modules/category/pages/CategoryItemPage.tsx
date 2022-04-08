/** @jsxImportSource @emotion/react */
import { Breadcrumbs, Button, Card, Stack, Typography, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import CardHeaderPage from "../../../common/components/CardHeaderPage";
import { Link, useHistory } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import CustomTextInput from "../../../common/components/CustomTextInput";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreate from "../hooks/useCreate";
import useEdit from "../hooks/useEdit";
import useGetCategoryItem from "../hooks/useGetCategoryItem";
import { useEffect } from "react";

const schema = yup.object({
  name: yup.string().required(),
  value: yup.string().required(),
});

interface IFormState {
  name: string;
  value: string;
}

export default function CategoryItemPage() {
  const theme = useTheme();
  const history = useHistory();

  const methods = useForm<IFormState>({
    defaultValues: {
      name: "",
      value: "",
    },
    resolver: yupResolver(schema),
  });
  const { id, category } = useGetCategoryItem();
  const { handleCreate } = useCreate();
  const { handleEdit } = useEdit();

  useEffect(() => {
    if (category) {
      Object.keys(category).forEach((key: any) => {
        methods.setValue(key, category[key]);
      });
    }
  }, [category]);

  const onSubmit = (value: IFormState) => {
    if (id === "null") {
      handleCreate(value);
    } else {
      handleEdit(value);
    }
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
            {id === "null" ? "Create" : "Edit"} category
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
              to="/category"
            >
              Category
            </Link>
            <Link
              css={css`
                color: ${theme.palette.text.secondary};
                font-weight: bold;
              `}
              to="/category/null"
            >
              {id === "null" ? "Create new" : "Edit"} category
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
              label="Name"
              name="name"
            ></CustomTextInput>
          </div>

          <div className="form-item">
            <CustomTextInput
              muiProps={{ style: { width: 500 }, size: "small", InputLabelProps: { shrink: true } }}
              label="Value"
              name="value"
            ></CustomTextInput>
          </div>

          <Stack direction={"row"} justifyContent="space-between">
            <Button onClick={() => history.goBack()} color="error" variant="outlined" type="button">
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
