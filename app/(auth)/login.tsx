import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Redirect, useRouter } from "expo-router";
import { useErrorStore } from "@/store/errorStore";
import { ButtonComponent } from "@/components/button/button";
import { useUserStore } from "@/store/userStore";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLoginMutation } from "@/hooks/apiHooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput } from "@/components/input/customInput";

const formSchema = z.object({
  username: z.string().min(6, "Minimum 6 characters"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type LoginFormData = z.infer<typeof formSchema>;

const LoginScreen = () => {
  //router
  const router = useRouter();

  //form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
  });

  //local state for password
  const [showPassword, setShowPassword] = useState(false);

  //global state
  const { setError } = useErrorStore();
  const { setUser, setToken, token } = useUserStore();

  //local variable to check if token exists on global state.
  const isLoggedIn = !!token;

  //login mutation
  const { mutate, isPending } = useLoginMutation();

  //Check if the user is logged in and redirect to the home page
  isLoggedIn && <Redirect href="/" />;

  //handle login
  const handleOnSubmitHandler = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (data) => {
        setToken(data.accessToken);
        setUser(data);
        router.push("/");
      },

      onError: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <VStack space="xl" className="p-4 m-4 border rounded-lg border-outline-300">
      <Heading className="text-typography-900">Login</Heading>

      <VStack space="xs">
        <CustomInput
          control={control}
          errors={!!errors.username}
          name="username"
          label="Username"
          type="text"
          errorMsg={errors.username?.message}
          placeholder="Enter username"
        />
      </VStack>

      <VStack space="xs">
        <CustomInput
          control={control}
          errors={!!errors.password}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onPress={() => setShowPassword(!showPassword)}
          hasIcon
          icon={showPassword ? EyeIcon : EyeOffIcon}
          errorMsg={errors.password?.message}
          placeholder="Enter password"
        />
      </VStack>

      <HStack space="sm">
        <ButtonComponent
          title="Sign Up"
          className="flex-1"
          onPress={() => router.push("/signup")}
          variant="outline"
        />

        <ButtonComponent
          title="Login"
          className="flex-1"
          onPress={handleSubmit(handleOnSubmitHandler)}
          isLoading={isPending}
        />
      </HStack>
    </VStack>
  );
};

export default LoginScreen;
