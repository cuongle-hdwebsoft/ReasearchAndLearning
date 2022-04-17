import Link from "next/link";
import React from "react";

export default function CustomLink(props: { children: any; href: string }) {
  return (
    <Link href={props.href} passHref>
      <div style={{ color: "#fff", margin: "0px 10px", cursor: "pointer" }}>
        {props.children}
      </div>
    </Link>
  );
}
