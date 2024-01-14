import {
  ChakraProvider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { IPoster } from "./CreateImageModal";
import { useRecoilState } from "recoil";
import { profileState } from "./atoms/atoms";

export default function CalendarModal() {
  const [savedPosters, setSavedPosters] = useState<IPoster[]>([]);
  const [profile] = useRecoilState(profileState);
  const localizer = momentLocalizer(moment);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (profile) {
      getUserLikes();
      console.log(events);
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

  // const events = [
  //   {
  //     title: "Event 1",
  //     //year month day hour
  //     start: new Date(2024, 0, 1, 10, 0), // January 1, 2022, 10:00 AM
  //     end: new Date(2024, 0, 1, 12, 0), // January 1, 2022, 12:00 PM
  //   },
  // ];

  const events = [
    ...savedPosters.map((poster) => {
      const startDateArray = poster.startDate!;
      console.log("start");
      console.log(startDateArray);

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
      console.log(event);
      return event;
    }),
    // {
    //   title: "event1",
    //   start: new Date(2024, 1, 10, 2, 0),
    //   end: new Date(2024, 1, 10, 4, 0),
    // },
  ];
  const customStyle = {
    height: 600,
    width: 700,
    fontFamily: "'quicksand', sans-serif",
  };

  const dayPropGetter = (date) => {
    return {
      style: {
        backgroundColor: "transparent !important",
      },
    };
  };

  const customComponents = {
    // You can customize various components here
    toolbar: (props) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'quicksand', sans-serif",
        }}
      >
        <div style={{ padding: "10px" }}>
          {/* Customize your toolbar components */}
          <Button
            color="var(--dark-purple100)"
            backgroundColor="transparent !important"
            onClick={props.onNavigate.bind(null, "TODAY")}
          >
            Today
          </Button>
          <Button
            color="var(--dark-purple100)"
            backgroundColor="transparent !important"
            onClick={props.onNavigate.bind(null, "PREV")}
          >
            Previous
          </Button>
          <Button
            color="var(--dark-purple100)"
            backgroundColor="transparent !important"
            onClick={props.onNavigate.bind(null, "NEXT")}
          >
            Next
          </Button>
        </div>
        <h1
          style={{
            fontSize: "1.8vw",
            fontWeight: "bold",
            fontFamily: "'quicksand', sans-serif",
            width: "30%",
            transform: "translate(-1%, -50%)",
          }}
        >
          {props.label}
        </h1>
        <div>
          <Button
            color="var(--dark-purple100)"
            backgroundColor="transparent !important"
            onClick={() => props.onView("day")}
          >
            Day
          </Button>
          <Button
            color="var(--dark-purple100)"
            backgroundColor="transparent !important"
            onClick={() => props.onView("week")}
          >
            Week
          </Button>
          <Button
            color="var(--dark-purple100)"
            backgroundColor="transparent !important"
            onClick={() => props.onView("month")}
          >
            Month
          </Button>
        </div>
      </div>
    ),
  };

  return (
    <Modal isOpen={true} onClose={false}>
      <ModalOverlay />
      <ModalContent maxWidth={"fit-content"}>
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
                components={customComponents}
                dayPropGetter={dayPropGetter}
              />
            </ChakraProvider>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
