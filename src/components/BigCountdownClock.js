import React from "react";
import { totalSecondsToHoursMinutesSeconds } from "../TimeConverter"


function BigCountdownClock({ totalSeconds }) {
const { hours, minutes, seconds } = totalSecondsToHoursMinutesSeconds(
    totalSeconds
);
const padTwoDigits = value => value.toString().padStart(2, "0");
return (
    <div className="BigCountdownClock">
    <span>{hours}</span>:<span>{padTwoDigits(minutes)}</span>:<span>
        {padTwoDigits(seconds)}
    </span>
    </div>
);
}

export default BigCountdownClock;