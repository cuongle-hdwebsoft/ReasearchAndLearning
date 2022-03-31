import { Skeleton, TableCell, TableRow } from "@mui/material";

interface IFakeTableLoading {
  children?: React.ReactElement | React.ReactElement[];
  cols: number;
}

export default function FakeTableLoading(props: IFakeTableLoading) {
  return (
    <>
      {Array.from({ length: 10 }).map((i: unknown, index1) => {
        return (
          <TableRow key={`row ${index1}`}>
            {Array.from({ length: props.cols }).map((j: unknown, index2) => (
              <TableCell key={`col-${index1}-${index2}`}>
                <Skeleton></Skeleton>
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
}
