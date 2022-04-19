import { NetworkStatus } from "@apollo/client";
import { Card, Pagination, Button } from "react-bootstrap";
import "./App.css";
import useFilterPosts from "./hooks/useFilterPosts";
import useGetPosts from "./hooks/useGetPosts";

function App() {
  const { limit, page, handleChangePage } = useFilterPosts();
  const { data, loading, error, networkStatus, refetch } = useGetPosts(
    limit,
    page
  );

  if (networkStatus === NetworkStatus.refetch) {
    return <div>Refetching</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error.message</div>;
  }

  return (
    <div className="container-fluid">
      <div className="d-flex">
        {data.getPosts.data.map((post) => {
          return (
            <div className="post" key={post.id}>
              <Card>
                <Card.Body>
                  <Card.Img
                    style={{
                      width: 200,
                      height: 200,
                      display: "block",
                      margin: "auto",
                    }}
                    src="https://picsum.photos/200"
                  ></Card.Img>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.authors}</Card.Text>
                  <Card.Subtitle style={{ height: 100, overflow: "hidden" }}>
                    {post.excerpt}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

      <Pagination>
        {Array.from({ length: Math.ceil(data.getPosts.total / limit) }).map(
          (_page, index) => {
            return (
              <Pagination.Item
                active={index + 1 === page}
                onClick={() => handleChangePage(index + 1)}
                key={index}
              >
                {index + 1}
              </Pagination.Item>
            );
          }
        )}
      </Pagination>
      <div>
        <Button onClick={() => refetch()}>Refetch</Button>
        <div>Limit: </div>
        <select>
          <option>1</option>
          <option>2</option>
          <option>4</option>
        </select>
        <input placeholder="search" />
      </div>
    </div>
  );
}

export default App;
