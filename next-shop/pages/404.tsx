import Image from "next/image";
import React from "react";
import img from "../common/images/undraw_Page_not_found_re_e9o6.png";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <Image src={img} width={500} height={500} alt="123"></Image>
    </div>
  );
}
