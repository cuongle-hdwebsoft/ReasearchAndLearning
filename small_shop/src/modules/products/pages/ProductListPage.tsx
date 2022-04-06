/** @jsxImportSource @emotion/react */

import {
  Typography,
  Box,
  Card,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import { css } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

import CardHeaderPage from "../../../common/components/CardHeaderPage";
import { useProductReducerHook } from "../hook";
import FilterProducts from "../../../common/components/FilterProducts";
import FakeTableLoading from "../../../common/components/FakeTableLoading";
import useModal from "../../../common/hooks/useModal";
import useTableProduct from "../../../common/hooks/useTableProduct";
import useQueryProduct from "../../../common/hooks/useQueryProduct";
import ProductListBreadCrums from "../components/ProductListBreadCrums";
import FormDeleteProduct from "../components/FormDeleteProduct";

export default function ProductListPage() {
  const { t } = useTranslation();
  const history = useHistory();

  const { products, totalProducts, limit, page, isLoading } = useProductReducerHook();

  const modalContext = useModal();
  const queryProduct = useQueryProduct();
  const table = useTableProduct();

  useEffect(() => {
    table.init(queryProduct.query);
  }, []);

  const handleDeleteProduct = (id: string | number) => {
    modalContext.open(<FormDeleteProduct id={id}></FormDeleteProduct>);
  };

  return (
    <Box>
      <CardHeaderPage>
        <Stack
          css={css`
            margin-bottom: 30px;
          `}
          direction={"row"}
          alignItems="center"
        >
          <Typography variant="h4">{t("ProductPage")}</Typography>
          <ProductListBreadCrums></ProductListBreadCrums>
        </Stack>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FilterProducts></FilterProducts>
          <Stack
            css={css`
              margin-left: auto;
            `}
          >
            <Button onClick={() => history.push("/products/null")} variant="contained" startIcon={<AddIcon></AddIcon>}>
              <Trans i18nKey={"AddNew"}>Add new {{ name: "product" }}</Trans>
            </Button>
          </Stack>
        </Box>
      </CardHeaderPage>
      <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <div>{t("ID")}</div>
                </TableCell>
                <TableCell>
                  <div>{t("Image")}</div>
                </TableCell>
                <TableCell>
                  <div>{t("Name")}</div>
                </TableCell>
                <TableCell>
                  <div>{t("Price")}</div>
                </TableCell>
                <TableCell>
                  <div>{t("Stock")}</div>
                </TableCell>
                <TableCell>
                  <div>{t("CategoyName")}</div>
                </TableCell>
                <TableCell>
                  <div>{t("InStock")}</div>
                </TableCell>
                <TableCell align="right">
                  <div>{t("Action")}</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <FakeTableLoading cols={8} />
              ) : (
                products &&
                products.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>{item.id}</div>
                      </TableCell>
                      <TableCell>
                        <Avatar src={item.imageUrl} variant="square"></Avatar>
                      </TableCell>
                      <TableCell>
                        <div>{item.productName}</div>
                      </TableCell>
                      <TableCell>
                        <div>{item.price}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {item.amount} ({t("Items")})
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{item.categoryName}</div>
                      </TableCell>
                      <TableCell>
                        <CircleIcon color={item.inStock ? "success" : "error"}></CircleIcon>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction={"row"} spacing={2} justifyContent="right">
                          <Button
                            onClick={() => history.push("/products/" + item.id)}
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon></EditIcon>}
                          >
                            {t("Edit")}
                          </Button>
                          <Button
                            onClick={() => handleDeleteProduct(item.id)}
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon></DeleteIcon>}
                          >
                            {t("Delete")}
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          onPageChange={table.handleChangePage}
          onRowsPerPageChange={table.handleChangeRowPerPage}
          component={"div"}
          count={totalProducts}
          rowsPerPage={limit}
          page={page ? page : 0}
        ></TablePagination>
      </Card>
    </Box>
  );
}
