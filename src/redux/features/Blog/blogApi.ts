import { ParamSerialization } from "@/lib/ParamsSerialization";
import { apiSlice } from "@/redux/api/apiSlice";
import { IBlog } from "@/types/Blog";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //add or create blog
    createBlog: builder.mutation({
      query: (data: IBlog) => ({
        url: "/blog",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["blog"],
    }),

    //get all the blogs
    getAllBlogs: builder.query({
      query: (args: Record<string, unknown>) => {
        const query = args ? ParamSerialization(args) : "";
        return `/blog?${query}`;
      },
      providesTags: ["blog"],
    }),
  }),
});

export const { useCreateBlogMutation, useGetAllBlogsQuery } = blogApi;
