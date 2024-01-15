import {
  ChakraProvider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { IPoster } from "./CreateImageModal";
import { useRecoilState } from "recoil";
import { profileState } from "./atoms/atoms";

export default function CalendarModal({ onClose }) {
  const [savedPosters, setSavedPosters] = useState<IPoster[]>([]);
  const [profile] = useRecoilState(profileState);
  const localizer = momentLocalizer(moment);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (profile) {
      getUserLikes();
      setIsReady(true);
    }
  }, []);

  const getUserLikes = async () => {
    const likesResp = await fetch(
      "http://localhost:8080/users/savedPosters/" + profile.id
    );
    if (likesResp.ok) {
      const likes = await likesResp.json();
      setSavedPosters(likes.data);
    }
  };

  const events = [
    ...savedPosters.map((poster) => {
      const startDateArray = poster.startDate!;

      const startDate = new Date(
        startDateArray[0],
        parseInt(startDateArray[1]) - 1,
        startDateArray[2],
        startDateArray[3],
        startDateArray[4]
      );

      const endDateArray = poster.endDate ? poster.endDate : startDateArray;
      const endDate = new Date(
        endDateArray[0],
        parseInt(endDateArray[1]) - 1,
        endDateArray[2],
        endDateArray[3],
        endDateArray[4]
      );

      const event = {
        title: poster.title,
        start: startDate,
        end: endDate,
      };
      return event;
    }),
  ];
  const customStyle = {
    height: 600,
    width: 700,
    fontFamily: "'quicksand', sans-serif",
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      border: "none",
      borderRadius: "0",
      backgroundColor: isSelected
        ? "var(--dark-purple70)"
        : "var(--dark-purple100)",
    };
    return {
      style,
    };
  };

  const dayPropGetter = (date) => {
    return {
      style: {
        backgroundColor: "transparent !important",
      },
    };
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={"fit-content"}>
        <ModalCloseButton
          className="close-button"
          onClick={onClose}
          style={{ backgroundColor: "var(--dark-purple100)" }}
        />
        <ModalBody width={"fit-content"}>
          {isReady && (
            <ChakraProvider>
              <Calendar
                localizer={localizer}
                events={events}
                defaultView="week"
                views={["day", "week", "month"]}
                startAccessor="start"
                endAccessor="end"
                style={customStyle}
                dayPropGetter={dayPropGetter}
                eventPropGetter={eventStyleGetter}
              />
            </ChakraProvider>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
