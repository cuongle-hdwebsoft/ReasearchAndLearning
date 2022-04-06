/** @jsxImportSource @emotion/react */

import { Breadcrumbs, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductListBreadCrums() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Breadcrumbs
      separator=">"
      css={css`
        margin-left: 10px;
      `}
    >
      <Link
        to="/"
        css={css`
          color: ${theme.palette.text.secondary};
          text-decoration: none;
        `}
      >
        {t("Dashboard")}
      </Link>
      <Link
        css={css`
          color: ${theme.palette.text.secondary};
          font-weight: bold;
        `}
        to="/products"
      >
        {t("Products")}
      </Link>
    </Breadcrumbs>
  );
}
