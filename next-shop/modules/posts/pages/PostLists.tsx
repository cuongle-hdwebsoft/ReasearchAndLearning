import { TablePagination } from "@mui/material";
import { useQueryClient } from "react-query";
import FilterBar from "../components/FilterBar";
import Post from "../components/Post";
import useFilterPost from "../hooks/useFilterPost";
import useGetPosts from "../hooks/useGetPosts";

const PostList = () => {
  const { limit, page, handleChangePage, handleChangePerRow } = useFilterPost();
  const { data, isError } = useGetPosts({ limit, page });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1 style={{ paddingLeft: 15 }}>Post List</h1>
      <FilterBar></FilterBar>
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
          rowsPerPageOptions={[4, 8, 16, 24]}
          page={page ? page - 1 : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePerRow}
        ></TablePagination>
      </div>
    </div>
  );
};

export default PostList;
