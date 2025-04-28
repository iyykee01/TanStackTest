import { get_products } from "@/constants/products";
import { requestData } from "@/libs/api/requests";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

//Get All Products
export const useGetProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => requestData("get", get_products),
  });

//Get Product By Id
export const useGetProductById = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => requestData("get", `${get_products}/${id}`),
  });

//Get Products by params
export const useGetProductWithParams = () =>
  useInfiniteQuery({
    queryKey: ["products"],
    queryFn: () => requestData("get", `${get_products}?limit=${30}`),
    initialPageParam: 30,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
