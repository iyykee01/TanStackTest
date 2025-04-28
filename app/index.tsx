import { FlatList } from "react-native";
import {
  ListFooter,
  ProductListComponent,
} from "../components/productListComponent/productListComponent";
import "@/global.css";
import { Text } from "@/components/ui/text";
import {
  useGetProducts,
  useGetProductWithParams,
} from "@/hooks/apiHooks/useProduct";

const HomeScreen = () => {
  //Get product hooks
  const { data, isLoading, error } = useGetProducts();

  // const {
  //   data,
  //   isLoading,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useGetProductWithParams();

  // const refetchProducts = () => {
  //   console.log("Refetching products.....");
  //   fetchNextPage();
  // };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // const products = data?.pages.flatMap((page) => page.products);

  return (
    <FlatList
      data={data?.products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListComponent product={item} />}
      //   onEndReached={refetchProducts}
      //   onEndReachedThreshold={2.5}
      //   ListFooterComponent={
      //     <ListFooter
      //       hasNextPage={hasNextPage}
      //       isFetchingNextPage={isFetchingNextPage}
      //     />
      //   }
    />
  );
};

export default HomeScreen;
