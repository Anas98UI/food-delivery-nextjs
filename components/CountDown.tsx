"use client";

import Countdown from "react-countdown";

const endingDate = new Date();
endingDate.setHours(endingDate.getHours() + 24);

const CountDown = () => {
  return (
    <Countdown
      className="text-yellow-500 font-bold text-4xl"
      date={endingDate}
    />
  );
};

export default CountDown;