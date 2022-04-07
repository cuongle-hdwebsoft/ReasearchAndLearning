/** @jsxImportSource @emotion/react */
import { Button, Stack, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { css } from "@emotion/react";
import useModal from "../../../common/hooks/useModal";
import useDelete from "../hooks/useDelete";

export default function FormDeleteCategory(props: { id: string | number }) {
  const modalContext = useModal();
  const theme = useTheme();
  const { handleDelete } = useDelete();

  return (
    <Box>
      <h3
        css={css`
          color: ${theme.palette.text.primary};
          text-align: center;
          font-weight: bold;
        `}
      >
        Are you sure to delete this item?
      </h3>
      <Stack justifyContent={"space-around"} direction={"row"} spacing="4">
        <Button onClick={modalContext.close} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={() => handleDelete(props.id)} variant="contained" color="primary">
          Yes! Sure
        </Button>
      </Stack>
    </Box>
  );
}
