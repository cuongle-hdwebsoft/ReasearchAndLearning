import { Skeleton, TableCell, TableRow } from "@mui/material";

interface IFakeTableLoading {
  children?: React.ReactElement | React.ReactElement[];
  cols: number;
}

export default function FakeTableLoading(props: IFakeTableLoading) {
  return (
    <>
      {Array.from({ length: 10 }).map((i: unknown) => {
        return (
          <TableRow key={`row ${i}`}>
            {Array.from({ length: props.cols }).map((j: unknown) => (
              <TableCell key={`col ${j}`}>
                <Skeleton></Skeleton>
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
}
