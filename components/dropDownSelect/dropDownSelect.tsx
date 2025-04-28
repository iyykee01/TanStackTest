import { Box } from "@/components/ui/box";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalBody,
} from "@/components/ui/modal";
import { Center } from "@/components/ui/center";

type MyCalendarProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

export const MyCalendar = ({ showModal, setShowModal }: MyCalendarProps) => {
  const [selected, setSelected] = useState("");

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <ModalBackdrop />
      <ModalContent className="w-[85%]">
        <ModalBody>
          <Box>
            <Calendar
              onDayPress={(day: any) => {
                setSelected(day.dateString);
                setShowModal(false);
              }}
              onCalendarToggled
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#b6c1cd",
                selectedDayBackgroundColor: "#00adf5",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "green",
                dayTextColor: "#2d4150",
                textDisabledColor: "#dd99ee",
              }}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
