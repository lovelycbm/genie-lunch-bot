import add from "date-fns/add/index.js";
import format from "date-fns/format/index.js";
import axios from "axios";

import {
  getYear,
  getMonth,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
} from "date-fns";

const SLACK_WEBHOOK_URL = process.env.SLACK_URL;

// create function to send message
const send = async () => {
  const date = new Date();
  const currentTime = format(date, "yyyy-MM-dd");

  const dayLabel = getDay(date);
  // 일요일 토요일이면 return
  // if (dayLabel === 0 || dayLabel === 6) return;

  // if currentTime is friday add two days
  const nextTime = format(
    add(date, {
      days: dayLabel === 5 ? 2 : 1,
    }),
    "yyyy-MM-dd"
  );

  const message = `${currentTime} 점심 조사 입니다. \n 스레드에 댓글로 남겨주세요 마감은 매일 오전 9시까지!`;
  await axios.post(SLACK_WEBHOOK_URL, { text: message });
};

send();
