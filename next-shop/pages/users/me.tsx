import PrivatePage from "../../common/hocs/PrivatePage";
import Profile from "../../modules/users/pages/Profile";

export default function Index() {
  return (
    <PrivatePage>
      <Profile></Profile>
    </PrivatePage>
  );
}
