import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { CloseIcon, Icon, CheckIcon } from "@/components/ui/icon";
import React, { useEffect, useState } from "react";
import { useErrorStore } from "@/store/errorStore";

type AlertBoxProps = {
  onPress?: () => void;
};

export const AlertBox = ({ onPress }: AlertBoxProps) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { error, isError, clearError, isSuccess } = useErrorStore();

  const handleClose = () => clearError();

  useEffect(() => {
    if (isError || isSuccess) {
      setShowAlertDialog(true);
    }
  }, [isError, isSuccess]);

  return (
    <AlertDialog
      isOpen={showAlertDialog}
      onClose={handleClose}
      className="px-10"
    >
      <AlertDialogBackdrop />
      <AlertDialogContent className="items-center w-full gap-4 mx-4">
        <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
          {isSuccess ? (
            <Icon as={CheckIcon} size="lg" className="stroke-error-500" />
          ) : (
            <Icon as={CloseIcon} size="lg" className="stroke-error-500" />
          )}
        </Box>
        <AlertDialogHeader className="mb-2">
          {isSuccess ? (
            <Heading size="md">Success</Heading>
          ) : (
            <Heading size="md">Oops!</Heading>
          )}
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm" className="text-center">
            {isSuccess ? "Your request was successful." : error}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className="mt-5">
          <Button
            action="secondary"
            onPress={onPress ? onPress : handleClose}
            size="lg"
            className="px-[30px] bg-red-800"
          >
            <ButtonText className="text-white">Close</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
