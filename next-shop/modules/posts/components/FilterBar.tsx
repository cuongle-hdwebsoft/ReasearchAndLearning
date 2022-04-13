import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import useGetCacheCategories from "../hooks/useGetCacheCategories";
import { IFilterPost } from "../interface/post";

interface IProps {
  handleChangeInputFilter: (
    key: string
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelectFilter: (
    key: string
  ) => (event: SelectChangeEvent<string>) => void;
  handleClearFilter: () => void;
  filter: IFilterPost;
  total?: number;
}

export default function FilterBar(props: IProps) {
  const { categories } = useGetCacheCategories();

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
        <Button onClick={props.handleClearFilter} variant="outlined">
          Clear filter
        </Button>
        <TextField
          label="Post name"
          placeholder="Post name"
          size="small"
          onChange={props.handleChangeInputFilter("q")}
          value={props.filter.q || ""}
        ></TextField>
        <Select
          onChange={props.handleChangeSelectFilter("tags.id")}
          size="small"
          style={{ width: 300 }}
          value={(props.filter["tags.id"] as string) || ""}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            );
          })}
        </Select>
        <p style={{ fontWeight: "bold" }}>
          Total items: {props.total || 0} (items)
        </p>
      </Stack>
    </div>
  );
}
