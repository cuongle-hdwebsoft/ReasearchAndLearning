import { NetworkStatus } from "@apollo/client";
import { Card, Pagination, Button } from "react-bootstrap";
import "./App.css";
import useCreatePost from "./hooks/useCreatePost";
import useFilterPosts from "./hooks/useFilterPosts";
import useGetPosts from "./hooks/useGetPosts";

function App() {
  const { limit, page, handleChangePage } = useFilterPosts();
  const { data, loading, error, networkStatus, refetch, called } = useGetPosts(
    limit,
    page
  );
  const { mutationFunction } = useCreatePost();

  if (networkStatus === NetworkStatus.refetch) {
    return <div>Refetching</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error.message</div>;
  }

  console.log(called);

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
                  {/* <Card.Subtitle style={{ height: 100, overflow: "hidden" }}>
                    {post.excerpt}
                  </Card.Subtitle> */}
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
      </div>
      <div style={{ marginTop: 5 }}>
        <Button
          onClick={() =>
            mutationFunction({
              variables: {
                post: {
                  title: "title" + new Date().toISOString(),
                  slug: "slug" + new Date().toISOString(),
                  html: "html" + new Date().toISOString(),
                  feature_image: "feature_image" + new Date().toISOString(),
                  authors: "authors" + new Date().toISOString(),
                  excerpt: "excerpt" + new Date().toISOString(),
                },
              },
            })
          }
        >
          Create one now
        </Button>
      </div>
    </div>
  );
}

export default App;
