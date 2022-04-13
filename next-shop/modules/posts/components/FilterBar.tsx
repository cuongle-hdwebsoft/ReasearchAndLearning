import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { IFilterPost } from "../interface/post";

interface IProps {
  handleChangeInputFilter: (
    key: string
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelectFilter: (
    key: string
  ) => (event: SelectChangeEvent<string>) => void;
  filter: IFilterPost;
}

export default function FilterBar(props: IProps) {
  return (
    <div
      style={{
        paddingRight: 15,
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 10,
      }}
    >
      <Stack direction={"row"} spacing={2} alignItems="center">
        <TextField
          label="Post name"
          placeholder="Post name"
          size="small"
          onChange={props.handleChangeInputFilter("q")}
          value={props.filter.q || ""}
        ></TextField>
        <Select
          onChange={props.handleChangeSelectFilter("tags.id")}
          placeholder="Category"
          size="small"
          style={{ width: 300 }}
          value={(props.filter["tags.id"] as string) || ""}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="5979a779df093500228e9587">Fiction</MenuItem>
        </Select>
        <p>Total items: 12 (items)</p>
      </Stack>
    </div>
  );
}
