const createEvent = async () => {
  let name = document.querySelector("[name=eventName]").value.trim();
  let description = document.querySelector("[name=description]").value.trim();
  let location = document.querySelector("[name=location]").value.trim();
  let event_time = document.querySelector("[name=eventTime]").value.trim();
  let event_date = document.querySelector("[name=eventDate]").value.trim();
  let expected_attendance = document
    .querySelector("[name=expAttendance]")
    .value.trim();

  if (
    !name ||
    !description ||
    !location ||
    !event_time ||
    !event_date ||
    !expected_attendance
  ) {
    alert("Please complete your form!");
    return;
  }

  
  let newDate = event_date.replace('/', '-');

  const body = {
    name: name,
    description: description,
    location: location,
    event_time: event_time,
    event_date: newDate,
    expected_attendance: expected_attendance,
  };

  const response = await fetch("/api/events/createEvent", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });


  // console.log('newDate', newDate);

  const message = await response.json().then((data) => data.message);
  if (message) alert(message);

  if (!response.ok) {
    document.querySelector("[name=eventName]").value = "";
    document.querySelector("[name=descirption]").value = "";
    document.querySelector("[name=location]").value = "";
    document.querySelector("[name=eventTime]").value = "";
    document.querySelector("[name=eventDate]").value = "";
    document.querySelector("[name=expAttendance]").value = "";
    return;
  }

  window.alert (`Event created on ${body.event_date} successfully`)

  document.location.replace(`/${newDate}`);
};

document.querySelector("#createEvent").addEventListener("click", createEvent);
