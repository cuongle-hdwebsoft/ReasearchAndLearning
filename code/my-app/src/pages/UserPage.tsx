import { useParams } from "react-router-dom";

export default function UserPage() {
  const param = useParams();

  console.log(param);

  return <div>User</div>;
}
