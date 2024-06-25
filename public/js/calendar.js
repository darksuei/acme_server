const Calendar = tui.Calendar;

const calendar = new Calendar("#calendar", {
  defaultView: "month",
  useDetailPopup: true,
  template: {
    time(event) {
      const { start, end, title } = event;

      return `<span style="color: white;">${formatTime(start)}~${formatTime(end)} ${title}</span>`;
    },
    allday(event) {
      return `<span style="color: gray;">${event.title}</span>`;
    },
  },
  calendars: [
    {
      id: "cal1",
      name: "Personal",
      backgroundColor: "#03bd9e",
    },
  ],
});

// Registering an instance event
calendar.on("beforeCreateEvent", (eventObj) => {
  // Calling the instance method when the instance event is invoked
  calendar.createEvents([
    {
      ...eventObj,
      id: "event1",
      calendarId: "cal1",
      title: "Weekly Meeting",
      start: "2024-06-30T09:00:00",
      end: "2024-06-30T10:00:00",
    },
  ]);
});

// calendar.createEvents([
//   {
//     id: "event1",
//     calendarId: "cal1",
//     title: "Weekly Meeting",
//     start: "2024-06-30T09:00:00",
//     end: "2024-06-30T10:00:00",
//   },
// ]);

// calendar.createEvents([
//   {
//     id: "1",
//     calendarId: "cal1",
//     title: "my event",
//     category: "time",
//     dueDateClass: "",
//     start: "2024-06-25T22:30:00+09:00",
//     end: "2024-06-25T02:30:00+09:00",
//   },
//   {
//     id: "2",
//     calendarId: "cal1",
//     title: "second event",
//     category: "time",
//     dueDateClass: "",
//     start: "2024-06-25T17:30:00+09:00",
//     end: "2024-06-30T17:31:00+09:00",
//   },
// ]);
