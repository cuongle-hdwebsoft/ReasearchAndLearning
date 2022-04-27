<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div style="width: 300px">
      <v-text-field
        v-model="filterQ"
        label="Search product name..."
      ></v-text-field>
    </div>
    <div style="width: 300px">
      <v-combobox
        v-model="filterCategoryName"
        label="Categories"
        :items="categories"
      >
      </v-combobox>
    </div>
  </div>
  <div style="display: flex; justify-content: center; margin-bottom: 10px">
    <v-btn @click="handleClearFilter" variant="outlined">Clear filter</v-btn>
  </div>
</template>

<script setup>
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetProductFilter } from "../hooks/useGetProductFilter";

const { categories } = useGetCategories();
const { filterQ, filterCategoryName, handleClearFilter } =
  useGetProductFilter();
</script>