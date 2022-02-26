const minuteHand = document.getElementById("minute-hand");
const hourHand = document.getElementById("hour-hand");
const secondHand = document.getElementById("second-hand");

const yOffsets = {
  hours: -15,
  minutes: -36,
  seconds: -60,
};

/**
 *
 * @param {HTMLElement} el
 * @param {number} offset
 * @param {number} angle
 */
const updateTransform = (el, offset, angle) => {
  const transform = `rotate(${angle}deg) translateY(${offset}px)`;
  el.style.transform = transform;
};

const getTime = () => {
  const date = new Date();

  return {
    hours: date.getHours() % 12,
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

const getAngle = (time) => {
  const { hours, minutes, seconds } = time;

  const angleOfSeconds = seconds * 6;
  const angleOfMinutes = minutes * 6 + seconds * 0.1;
  const angleOfHours = hours * 30 + 0.5 * minutes;

  return {
    hours: angleOfHours,
    minutes: angleOfMinutes,
    seconds: angleOfSeconds,
  };
};

const updateClock = () => {
  const time = getTime();
  const angles = getAngle(time);

  updateTransform(secondHand, yOffsets.seconds, angles.seconds);
  updateTransform(minuteHand, yOffsets.minutes, angles.minutes);
  updateTransform(hourHand, yOffsets.hours, angles.hours);

  requestAnimationFrame(updateClock);
};

updateClock();
