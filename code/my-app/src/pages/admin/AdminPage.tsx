import { Link, useRouteMatch } from "react-router-dom";

export default function AdminPage() {
  const { path } = useRouteMatch();

  console.log(path);

  return (
    <div>
      <h1>Welcome to admin page</h1>
      <ul>
        <li>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/admin/todo"}>Manage todo</Link>
        </li>
        <li>
          <Link to={"/admin/users"}>Manage users</Link>
        </li>
      </ul>
    </div>
  );
}
