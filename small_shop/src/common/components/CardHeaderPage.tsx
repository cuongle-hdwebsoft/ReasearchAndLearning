/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Card } from "@mui/material";
import { ReactElement } from "react";

interface IProps {
  children: ReactElement | ReactElement[];
}

export default function CardHeaderPage(props: IProps) {
  return (
    <Card
      css={css`
        margin-bottom: 30px;
        padding: 20px;
      `}
    >
      {props.children}
    </Card>
  );
}
