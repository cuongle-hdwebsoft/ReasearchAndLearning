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
  Breadcrumbs,
  useTheme,
} from "@mui/material";
import { css } from "@emotion/react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardHeaderPage from "../common/components/CardHeaderPage";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAuth } from "../common/utils/fetch";
import { ICategory } from "../modules/products/constant";

export default function CategoryListPage() {
  const theme = useTheme();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const getData = async () => {
      const rs = await fetchAuth("GET", "/categories", null);

      if (rs.status === 200) {
        setCategories(rs.data);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Box>
        <CardHeaderPage>
          <Stack
            css={css`
              margin-bottom: 30px;
            `}
            direction={"row"}
            alignItems="center"
          >
            <Typography variant="h4">Category page</Typography>
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
                to="/category"
              >
                Category
              </Link>
            </Breadcrumbs>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField InputLabelProps={{ shrink: true }} size="small" label="Name category"></TextField>
            <Stack
              css={css`
                margin-left: auto;
              `}
            >
              <Button variant="contained" startIcon={<AddIcon></AddIcon>}>
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
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
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
            page={1}
          ></TablePagination>
        </Card>
      </Box>
    </div>
  );
}
