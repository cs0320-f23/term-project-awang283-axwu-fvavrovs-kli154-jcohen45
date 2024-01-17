import {
  ChakraProvider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
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
  const [events, setEvents] = useState<
    {
      title: string;
      start: Date;
      end: Date;
    }[]
  >([]);

  useEffect(() => {
    setIsReady(false);
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      makeEvents();
    }
  }, [isReady]);

  const fetchData = async () => {
    await getUserLikes();
    setIsReady(true);
  };

  const getUserLikes = async () => {
    try {
      const likesResp = await fetch(
        "http://localhost:8080/users/savedPosters/" + profile.id
      );
      if (likesResp.ok) {
        const likes = await likesResp.json();
        setSavedPosters(likes.data);
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const makeEvents = () => {
    const newEvents = [
      ...savedPosters.map((poster) => {
        const startDate = moment(poster.startDate).toDate();

        const endDate = poster.endDate
          ? moment(poster.endDate).toDate()
          : moment(poster.startDate).toDate();

        const event = {
          title: poster.title!,
          start: startDate,
          end: endDate,
        };
        return event;
      }),
    ];
    console.log(newEvents);
    setEvents(newEvents);
  };
  // const events = [
  //   {
  //     title: "hi",
  //     start: new Date(2024, 1, 1, 3, 0),
  //     end: new Date(2024, 1, 1, 4, 0),
  //   },
  // ];

  const customStyle = {
    minHeight: 500,
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
          {events.length > 0 && (
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
