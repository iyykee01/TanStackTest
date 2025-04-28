import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { Spinner } from "../ui/spinner";

export const ProductListComponent = ({ product }: any) => (
  <Link href={`/product/${product?.id}`} asChild>
    <Pressable className="flex-1">
      <Card className="p-5 rounded-lg max-w-[360px]" variant="elevated">
        <Image
          source={{
            uri: product?.thumbnail,
          }}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt={`${product?.title} image`}
          resizeMode="contain"
        />
        <Text className="mb-2 text-sm font-normal text-typography-700">
          {product?.title}
        </Text>
        <Heading size="md" className="mb-4">
          ${product?.price}
        </Heading>
      </Card>
    </Pressable>
  </Link>
);

type ListFooterProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const ListFooter = ({
  hasNextPage,
  isFetchingNextPage,
}: ListFooterProps) => (
  <>
    {hasNextPage && isFetchingNextPage ? (
      <Spinner />
    ) : (
      <Card className="w-full p-5 rounded-lg" variant="elevated">
        <Text className="mb-2 text-sm font-normal text-typography-700">
          No more products to load
        </Text>
      </Card>
    )}
  </>
);
