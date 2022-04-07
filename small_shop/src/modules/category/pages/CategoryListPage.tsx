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
import CardHeaderPage from "../../../common/components/CardHeaderPage";
import { Link, useHistory } from "react-router-dom";
import useGetCategories from "../hooks/useGetCategories";
import FakeTableLoading from "../../../common/components/FakeTableLoading";
import useFilterCategory from "../hooks/useFilterCategory";
import useDebounce from "../../../common/hooks/useDebounce";
import useModal from "../../../common/hooks/useModal";
import FormDeleteCategory from "../components/FormDeleteCategory";

export default function CategoryListPage() {
  const theme = useTheme();
  const history = useHistory();
  const { handleFilterInput, handleChangePage, limit, page, filter } = useFilterCategory();
  const debounceFilter = useDebounce(filter, 500);
  const { data, status, isError, error } = useGetCategories({ limit, page, filter: debounceFilter });
  const modal = useModal();

  if (isError) {
    return <div>{error}</div>;
  }

  const handleOpenModalDelete = (id: string | undefined) => {
    if (id) {
      modal.open(<FormDeleteCategory id={id}></FormDeleteCategory>);
    }
  };

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
            <Typography variant="h4">Category page </Typography>
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
            <TextField
              onChange={handleFilterInput("name")}
              InputLabelProps={{ shrink: true }}
              size="small"
              label="Name category"
            ></TextField>
            <Stack
              css={css`
                margin-left: auto;
              `}
            >
              <Button
                onClick={() => history.push("/category/null")}
                variant="contained"
                startIcon={<AddIcon></AddIcon>}
              >
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
                  <TableCell>Value</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {status === "loading" ? (
                  <FakeTableLoading cols={4}></FakeTableLoading>
                ) : (
                  data?.data.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell align="right">
                          <Stack direction={"row"} spacing={2} justifyContent="right">
                            <Button
                              onClick={() => history.push("/category/" + item.id)}
                              size="small"
                              variant="outlined"
                              startIcon={<EditIcon></EditIcon>}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleOpenModalDelete(item.id)}
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
            count={data && data.total ? data.total : 0}
            rowsPerPage={limit}
            page={status === "loading" ? 0 : page}
          ></TablePagination>
        </Card>
      </Box>
    </div>
  );
}
