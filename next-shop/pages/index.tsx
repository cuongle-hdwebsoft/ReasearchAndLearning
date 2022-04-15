import { Button } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import img from "../common/images/photo.jpg";

const Home: NextPage = () => {
  const route = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to my blog page</h1>
      <div>
        <Image src={img} alt=""></Image>
      </div>
      <Button variant="outlined" onClick={() => route.push("/posts")}>
        Go to blogs now
      </Button>
    </div>
  );
};

export default Home;
