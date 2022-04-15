import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import photo from "../images/undraw_access_denied_re_awnf.png";

export default function NotPermission() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>You don&apos;t have permission to view this page</h1>
      <Image height={400} width={400} src={photo} alt="" />
      <div>
        <Button variant="outlined" onClick={() => router.push("/login")}>
          Login now
        </Button>
      </div>
    </div>
  );
}
