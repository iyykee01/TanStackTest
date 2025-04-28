import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { get_products } from "@/constants/products";
import { requestData } from "@/libs/api/requests";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const addProduct = useCart((state) => state.addProduct);

  //Path with id
  const path_id = `${get_products}/${id}`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: () => requestData("get", path_id),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const addProductToCart = () => {
    addProduct(data);
  };

  return (
    <Card className="flex-1 w-full p-5 rounded-lg" variant="elevated">
      <Image
        source={{
          uri: data?.thumbnail,
        }}
        className="mb-6 h-[240px] w-full rounded-md"
        alt={`${data?.title} image`}
        resizeMode="contain"
      />
      <Text className="mb-2 text-sm font-normal text-typography-700">
        {data?.title}
      </Text>
      <VStack className="mb-6 ">
        <Heading size="md" className="mb-4">
          ${data?.price}
        </Heading>
        <Text size="sm">{data?.description}</Text>
      </VStack>

      <HStack className="justify-between flex-1 mb-6 ">
        <Heading size="xl" className="mb-4">
          ${data?.price}
        </Heading>

        <Button
          onPress={addProductToCart}
          className="flex-row items-center px-4 py-2"
        >
          <ButtonText size="md" className="mr-2">
            Add to cart
          </ButtonText>
          <Icon as={ShoppingCart} size="md" color="#fff" />
        </Button>
      </HStack>
    </Card>
  );
};

export default ProductDetails;
