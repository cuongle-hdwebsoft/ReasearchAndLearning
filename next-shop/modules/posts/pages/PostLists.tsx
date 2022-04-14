import { TablePagination } from "@mui/material";
import { DehydratedState } from "react-query";
import FilterBar from "../components/FilterBar";
import Post from "../components/Post";
import useFilterPost from "../hooks/useFilterPost";
import useGetPosts from "../hooks/useGetPosts";

interface IProps {
  dehydratedState: DehydratedState;
}

const PostList = (props: IProps) => {
  const {
    limit,
    page,
    handleChangePage,
    handleClearFilter,
    handleChangePerRow,
    handleChangeInputFilter,
    handleChangeSelectFilter,
    filter,
    debounceFilter,
    order,
    sort,
    handleSortFilter,
  } = useFilterPost({ dehydratedState: props.dehydratedState });
  const { data, isError } = useGetPosts({
    limit,
    page,
    filter: debounceFilter,
    sort,
    order,
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1 style={{ paddingLeft: 15 }}>Post List</h1>
      <FilterBar
        handleChangeInputFilter={handleChangeInputFilter}
        handleChangeSelectFilter={handleChangeSelectFilter}
        handleClearFilter={handleClearFilter}
        filter={filter}
        total={data.total}
        handleSortFilter={handleSortFilter}
        order={order}
        sort={sort}
      ></FilterBar>
      <div className="d-flex flex-wrap">
        {data.data.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <TablePagination
          component="div"
          count={data.total}
          rowsPerPage={limit}
          rowsPerPageOptions={[1, 2, 4, 8, 16, 24]}
          page={page ? page - 1 : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePerRow}
        ></TablePagination>
      </div>
    </div>
  );
};

export default PostList;
