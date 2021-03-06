import { useTheme } from "@mui/material";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";

const WrapBody = styled.div<{ bg: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bg};
  opacity: 0.9;
`;

export default function Loading() {
  const theme = useTheme();

  return (
    <WrapBody bg={theme.palette.background.paper}>
      <CircularProgress></CircularProgress>
    </WrapBody>
  );
}
