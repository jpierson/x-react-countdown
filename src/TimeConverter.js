export function totalSecondsToHoursMinutesSeconds(seconds) {
    return {
      hours: Math.floor(seconds / (60 * 60)),
      minutes: Math.floor((seconds / 60) % 60),
      seconds: seconds % 60
    };
  }
  
export function hoursMinutesSecondsToTotalSeconds({ hours, minutes, seconds }) {
    return (hours * 60 + minutes) * 60 + seconds;
}