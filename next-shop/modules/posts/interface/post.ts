import { IBasePagination } from "../../../common/interface";

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
  tags: [
    {
      id: string;
      name: string;
      slug: string;
    }
  ];
  authors: [
    {
      id: string;
      name: string;
      slug: string;
      profile_image: string;
      cover_image: string;
      bio: string;
      website: string;
      location: string;
      facebook: string;
      twitter: string;
      meta_title: string;
      meta_description: string;
      url: string;
    }
  ];
  excerpt: string;
}

export interface IPostQuery extends IBasePagination {}
