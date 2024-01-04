Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
clock that shows you the current machine time?

Can you make it so that it updates every second, and shows time in the following formats - 

 - HH:MM::SS (Eg. 13:45:23)

 - HH:MM::SS AM/PM (Eg 01:45:23 PM)


// for HH:MM::SS (Eg. 13:45:23)

function displayTime() {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    console.log(hour+':'+min+':'+sec);
}

setInterval(displayTime, 1000);

// for HH:MM::SS AM/PM (Eg 01:45:23 PM)
// for HH:MM::SS AM/PM (Eg 01:45:23 PM)
function displayTime() {
  const now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  let meridiem = 'AM';

  if(hour > 12) {
    hour = hour - 12;
    meridiem = 'PM'
  }

  console.log(hour+':'+min+':'+sec+' '+meridiem);
}

setInterval(displayTime, 1000);
