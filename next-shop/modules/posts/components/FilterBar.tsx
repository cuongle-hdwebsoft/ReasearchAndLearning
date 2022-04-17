import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import useGetCacheCategories from "../hooks/useGetCacheCategories";
import { IFilterPost } from "../interface/post";

interface IProps {
  filter: IFilterPost;
  total?: number;
  order: string;
  sort: string;
  handleChangeInputFilter: (
    key: string
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelectFilter: (
    key: string
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleClearFilter: () => void;
  handleSortFilter: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
      <Stack
        direction={"row"}
        spacing={2}
        alignItems="center"
        flexWrap={"wrap"}
        justifyContent="center"
        className="filter-bar"
      >
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
        <TextField
          id="categories"
          onChange={props.handleChangeSelectFilter("tags.id")}
          size="small"
          style={{ width: 300 }}
          value={(props.filter["tags.id"] as string) || ""}
          label="Categories"
          select
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          value={`${props.sort}-${props.order}`}
          label="Sort"
          select
          size="small"
          style={{ width: 300 }}
          onChange={props.handleSortFilter}
        >
          <MenuItem value="-">All</MenuItem>
          <MenuItem value="title-asc">Name ascending ↓</MenuItem>
          <MenuItem value="title-desc">Name descending ↑</MenuItem>
          <MenuItem value="tags.id-asc">Categories ascending ↓</MenuItem>
          <MenuItem value="tags.id-desc">Categories descending ↑</MenuItem>
        </TextField>
        <p style={{ fontWeight: "bold" }}>
          Total items: {props.total || 0} (items)
        </p>
      </Stack>
    </div>
  );
}
