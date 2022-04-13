import { MenuItem, Select, Stack, TextField } from "@mui/material";
import React from "react";

export default function FilterBar() {
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
        ></TextField>
        <Select placeholder="Category" size="small" style={{ width: 300 }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Categories 1">Categories 1</MenuItem>
        </Select>
        <p>Total items: 12 (items)</p>
      </Stack>
    </div>
  );
}
