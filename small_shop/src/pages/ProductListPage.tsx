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
  TextField,
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
import CardHeaderPage from "../common/components/CardHeaderPage";
import { Link, useHistory } from "react-router-dom";
import { useProductReducerHook } from "../modules/products/hook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadProducts } from "../modules/products/actions";

export default function ProductListPage() {
  const history = useHistory();
  const theme = useTheme();
  const { products } = useProductReducerHook();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

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
          <TextField InputLabelProps={{ shrink: true }} size="small" label="Product name"></TextField>
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
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Categoy name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <Avatar src={item.imageUrl} variant="square"></Avatar>
                      </TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.inStock}</TableCell>
                      <TableCell>{item.categoryName}</TableCell>
                      <TableCell align="right">
                        <Stack direction={"row"} spacing={2} justifyContent="right">
                          <Button size="small" variant="outlined" startIcon={<EditIcon></EditIcon>}>
                            Edit
                          </Button>
                          <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon></DeleteIcon>}>
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          onPageChange={() => {
            console.log(1);
          }}
          component={"div"}
          count={11}
          rowsPerPage={10}
          page={0}
        ></TablePagination>
      </Card>
    </Box>
  );
}
