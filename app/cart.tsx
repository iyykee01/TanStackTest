import { Avatar } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import React from "react";
import { FlatList } from "react-native";

const CartItem = () => {
  const cartItems = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);
  const cartTotalPrice = useCart((state) =>
    state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  const handleCheckout = () => {
    resetCart();
  };

  const _renderItem = ({ item }) => {
    return (
      <HStack className="p-4 bg-white rounded-lg">
        <VStack className="flex-1">
          <Text bold>{item?.product?.title}</Text>
          <Text>Quantity: {item?.quantity}</Text>
        </VStack>
        <Text bold className="text-lg text-center text-bold ">
          ${item?.product?.price}
        </Text>
      </HStack>
    );
  };
  return (
    <Box className="flex-1 w-full mb-10 rounded-lg">
      <FlatList
        keyExtractor={(item) => item?.product?.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-3"
        data={cartItems}
        renderItem={_renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Box className="items-center justify-center flex-1">
            <Text className="text-lg">Your cart is empty</Text>
          </Box>
        }
      />

      <VStack className="gap-3 mx-4 ">
        <Text bold className="text-xl text-black">
          ${cartTotalPrice}
        </Text>
        <Button className="h-16 rounded-xl" onPress={handleCheckout}>
          <ButtonText className="text-lg bold">Checkout</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default CartItem;
