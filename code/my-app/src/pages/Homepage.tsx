import { Link } from "react-router-dom";

import HelloComponent from "../common/components/HelloComponent";

import logo from "../common/images/shin.jpg";

export default function Homepage() {
  return (
    <div>
      <h1>Welcome to homepage</h1>
      <HelloComponent name="Lê Minh Cường" age={23} gender="male" img={logo}></HelloComponent>
      <h2>Demo</h2>
      <ol>
        <li>
          <Link to="/component-and-class">Class components vs functional components</Link>
        </li>
        <li>
          <Link to="/usecallback-usememo">useCallback and useMemo</Link>
        </li>
        <li>
          <Link to="/params-page">Params id</Link>
        </li>
        <li>
          <Link to="/private-1">Private page</Link>
        </li>
        <li>
          <Link to="/admin">Nested route Admin</Link>
        </li>
        <li>
          <Link to="/connect-page">Connect redux with class</Link>
        </li>
        <li>
          <Link to="/hook-page">Connect redux with functional</Link>
        </li>
        <li>
          <Link to="/saga-page">Saga page</Link>
        </li>
      </ol>
    </div>
  );
}
