import { IBaseFilter, IBasePagination } from "../../../common/interface";

export interface IPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  feature_image: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  tags: {
    id: string;
    name: string;
    slug: string;
  };
  authors: string;
  excerpt: string;
}

export interface IFilterPost extends IBaseFilter {
  q?: string;
  "tags.id"?: string;
}

export interface IPostPaginationFilter extends IBasePagination, IFilterPost {}
