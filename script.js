// variable to keep track of the current active format mode
let is24HourFormat = true;

const toggleButton = document.getElementById('format-toggle');

// this listen for mouse click events on our format button
toggleButton.addEventListener('click', () => {
  is24HourFormat = !is24HourFormat; // invert mode state
  
  // update button text to guide the next click
  toggleButton.textContent = is24HourFormat ? 'Switch to 12H' : 'Switch to 24H';
  
  // instantly sync visual layouts
  runClock(); 
});

function updateDigitColumn(id, targetValue) {
  const element = document.getElementById(id);
  if (element) {
    // shifts the column up by 70px multiplied by the single digit number
    element.style.transform = `translateY(-${targetValue * 70}px)`;
  }
}

function runClock() {
  const now = new Date();
  let hours = now.getHours();

  // if 12hr layout is enabled, convert military numbers
  if (!is24HourFormat) {
    hours = hours % 12;
    hours = hours ? hours : 12; // evaluates hour '0' to be displayed as '12'
  }
  
  // pad strings with leading zeros (e.g., "14", "05", "09")
  const hStr = String(hours).padStart(2, '0');
  const mStr = String(now.getMinutes()).padStart(2, '0');
  const sStr = String(now.getSeconds()).padStart(2, '0');

  // isolating specific index locations using bracket notation ([0] and [1])
  updateDigitColumn('h-tens', hStr[0]);
  updateDigitColumn('h-ones', hStr[1]);
  updateDigitColumn('m-tens', mStr[0]);
  updateDigitColumn('m-ones', mStr[1]);
  updateDigitColumn('s-tens', sStr[0]);
  updateDigitColumn('s-ones', sStr[1]);
}

// Start sequence loop
runClock();
setInterval(runClock, 1000);
