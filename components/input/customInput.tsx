import { FormControl } from "@/components/ui/form-control";
import { Text } from "@/components/ui/text";
import { Controller } from "react-hook-form";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import React from "react";

type InputFieldPros = {
  errors: boolean;
  name: string;
  label: string;
  control: any;
  onPress?: () => void;
  hasIcon?: boolean;
  icon?: any;
  type: "text" | "password";
  placeholder?: string;
  errorMsg: string | undefined;
};

export const CustomInput = ({
  errors,
  control,
  name,
  onPress,
  hasIcon,
  icon,
  type,
  placeholder,
  label,
  errorMsg,
}: InputFieldPros) => {
  return (
    <FormControl isInvalid={errors}>
      <Text className="text-typography-500">{label}</Text>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input className="text-center">
            <InputField
              type={type}
              value={value}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
            />
            <>
              {hasIcon && (
                <InputSlot className="pr-3" onPress={onPress}>
                  <InputIcon as={icon} />
                </InputSlot>
              )}
            </>
          </Input>
        )}
      />

      {errors && <Text className="text-red-500">{errorMsg}</Text>}
    </FormControl>
  );
};
