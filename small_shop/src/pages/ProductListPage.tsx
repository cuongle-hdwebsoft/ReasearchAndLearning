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
  Breadcrumbs,
  useTheme,
} from "@mui/material";
import { css } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import queryString from "query-string";

import CardHeaderPage from "../common/components/CardHeaderPage";
import { useProductReducerHook } from "../modules/products/hook";
import { deleteProduct, loadProducts } from "../modules/products/actions";
import FilterProducts from "../common/components/FilterProducts";
import FakeTableLoading from "../common/components/FakeTableLoading";
import { ModalCustomContext } from "../common/components/ModalProvider";

export default function ProductListPage() {
  const history = useHistory();
  const theme = useTheme();
  const { products, totalProducts, limit, page, isLoading } = useProductReducerHook();
  const dispatch = useDispatch();
  const modalContext = useContext(ModalCustomContext);

  useEffect(() => {
    const { query } = queryString.parseUrl(window.location.href);
    dispatch(loadProducts(query));
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
    dispatch(loadProducts({ page: nextPage, limit: 10 }));
  };

  const handleDeleteProduct = (id: string | number) => {
    modalContext.open(
      <Box>
        <h3
          css={css`
            color: ${theme.palette.text.primary};
            text-align: center;
            font-weight: bold;
          `}
        >
          Are you sure to delete this item?
        </h3>
        <Stack justifyContent={"space-around"} direction={"row"} spacing="4">
          <Button onClick={modalContext.close} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteProduct(String(id)));
              modalContext.close();
            }}
            variant="contained"
            color="primary"
          >
            Yes! Sure
          </Button>
        </Stack>
      </Box>,
    );
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
          <Typography variant="h4">Product page</Typography>
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
                font-weight: bold;
              `}
              to="/products"
            >
              Products
            </Link>
          </Breadcrumbs>
        </Stack>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FilterProducts></FilterProducts>
          <Stack
            css={css`
              margin-left: auto;
            `}
          >
            <Button onClick={() => history.push("/products/null")} variant="contained" startIcon={<AddIcon></AddIcon>}>
              Add new
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
                  <div>ID</div>
                </TableCell>
                <TableCell>
                  <div>Image</div>
                </TableCell>
                <TableCell>
                  <div>Name</div>
                </TableCell>
                <TableCell>
                  <div>Price</div>
                </TableCell>
                <TableCell>
                  <div>Stock</div>
                </TableCell>
                <TableCell>
                  <div>Categoy name</div>
                </TableCell>
                <TableCell>
                  <div>In stock</div>
                </TableCell>
                <TableCell align="right">
                  <div>Action</div>
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
                        <div>{item.amount} (items)</div>
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
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteProduct(item.id)}
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon></DeleteIcon>}
                          >
                            Delete
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
          onPageChange={handleChangePage}
          component={"div"}
          count={totalProducts}
          rowsPerPage={limit}
          page={page ? page : 0}
        ></TablePagination>
      </Card>
    </Box>
  );
}
