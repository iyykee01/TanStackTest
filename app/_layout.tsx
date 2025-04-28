import { Link, Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShoppingCart, User } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { useCart } from "@/store/cartStore";
import { useErrorStore } from "@/store/errorStore";
import { AlertBox } from "@/components/alerts/alert";
import { useUserStore } from "@/store/userStore";

const queryClient = new QueryClient();

const Layout = () => {
  const numberOfItems = useCart((state) => state.items.length);
  const { isError } = useErrorStore();

  const { token } = useUserStore();
  const isLoggedIn = !token;

  const headerRight = () => (
    <Link href={"/cart"}>
      <Box className="flex-row gap-2">
        <Icon as={ShoppingCart} size="xl" />
        <Text className="position-absolute">{numberOfItems}</Text>
      </Box>
    </Link>
  );

  const headerLeft = () => (
    <>
      {!isLoggedIn && (
        <Link href={"/login"}>
          <Icon as={User} />
        </Link>
      )}
    </>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="dark">
        <Stack screenOptions={{ headerRight, headerLeft }}>
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen
            name="product/[id]"
            options={{ title: "Product Details" }}
          />

          <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
          <Stack.Screen name="(auth)/signup" options={{ title: "Signup" }} />
        </Stack>

        {isError && <AlertBox />}
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default Layout;
