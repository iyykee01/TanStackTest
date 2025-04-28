import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { requestData } from "@/libs/api/requests";
import { add_user } from "@/constants/auth";
import { useRouter } from "expo-router";
import { ButtonComponent } from "@/components/button/button";
import { useErrorStore } from "@/store/errorStore";
import { AlertBox } from "@/components/alerts/alert";

const SignupScreen = () => {
  const router = useRouter();

  const { isSuccess, setSuccess } = useErrorStore();

  //TODO: Use form hook for this

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Connecting to the back end login function
  const signupMutation = useMutation({
    mutationFn: () =>
      requestData("post", add_user, {
        email,
        password,
        firstName,
        lastName,
        username,
      }),

    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error) => {
      console.log("Login failed", error);
    },
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleSuccessLogin = () => {
    router.push("/login");
    setSuccess(false);
  };

  return (
    <>
      <FormControl className="p-4 m-4 border rounded-lg border-outline-300">
        <VStack space="xl" className="justify-center ">
          <Heading className="text-typography-900">Sign up</Heading>

          <VStack space="xl">
            <Text className="text-typography-500">First Name</Text>
            <Input className="min-w-[250px]">
              <InputField
                type="text"
                onChangeText={(text) => setFirstName(text)}
              />
            </Input>
          </VStack>

          <VStack space="xl">
            <Text className="text-typography-500">Last Name</Text>
            <Input className="min-w-[250px]">
              <InputField
                type="text"
                onChangeText={(text) => setLastName(text)}
              />
            </Input>
          </VStack>

          <VStack space="xl">
            <Text className="text-typography-500">Email</Text>
            <Input className="min-w-[250px]">
              <InputField type="text" onChangeText={(text) => setEmail(text)} />
            </Input>
          </VStack>

          <VStack space="xl">
            <Text className="text-typography-500">Username</Text>
            <Input className="min-w-[250px]">
              <InputField
                type="text"
                onChangeText={(text) => setUsername(text)}
              />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input className="text-center">
              <InputField
                type={showPassword ? "text" : "password"}
                onChangeText={(text) => setPassword(text)}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>

          <ButtonComponent
            title="Sign Up"
            isLoading={signupMutation.isPending}
            variant="outline"
            className="my-4"
            onPress={() => signupMutation.mutate()}
          />
        </VStack>
      </FormControl>
      {isSuccess && <AlertBox onPress={handleSuccessLogin} />}
    </>
  );
};

export default SignupScreen;
