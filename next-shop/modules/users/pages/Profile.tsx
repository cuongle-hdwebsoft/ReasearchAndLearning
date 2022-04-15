import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import useGetProfile from "../hooks/useGetProfile";

export default function Profile() {
  const { data, isError } = useGetProfile();
  const router = useRouter();

  if (isError) {
    return <div>Fail to load</div>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p>
        <span style={{ fontWeight: "bold" }}>Name:</span> {data?.firstName} +{" "}
        {data?.lastName}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Age:</span> {data?.age}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Address:</span> {data?.address}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Gender:</span> {data?.gender}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Male:</span> {data?.mail}
      </p>
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
    </div>
  );
}
