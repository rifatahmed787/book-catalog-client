import { ParamSerialization } from "@/lib/ParamsSerialization";
import { apiSlice } from "@/redux/api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartBook: builder.query({
      query: (args: Record<string, unknown>) => {
        const query = args ? ParamSerialization(args) : "";
        return `/cart/${query}`;
      },
      providesTags: ["cart"],
    }),

    //   Add Book in cart
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["cart"],
    }),

    //remove from cart
    removeCart: builder.mutation({
      query: (data) => ({
        url: `/cart/${data?._id}`,
        method: "DELETE",
        body: { ...data },
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartBookQuery,
  useAddToCartMutation,
  useRemoveCartMutation,
} = cartApi;
