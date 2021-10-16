import * as cheerio from "cheerio";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as notiBot from "noti_bot";
import { config } from "firebase-functions";

export interface CourseInfo {
  courseNumber: string;
  title: string;
  availableSeats: number;
  avalibleWaitList: number;
  maxWaitlist: number;
}

// for time to be be validated
function get_time_verifier() {
  const time = Date.now();
  const updated_time = Math.floor(time / 60000) % 1000;
  const verify = (updated_time % 3) + (updated_time % 19) + (updated_time % 42);
  return "&t=" + updated_time.toString() + "&e=" + verify.toString();
}

//courseNumber should be SUBJ-123
export const url =
  "https://vsb.mcgill.ca/vsb/getclassdata.jsp?term=" +
  config().course.term +
  "&course_1_0=" +
  config().course.number +
  "&rq_1_0=null&nouser=1" +
  get_time_verifier();

export function parseResult(xml: string): CourseInfo {
  const $ = cheerio.load(xml);
  return {
    courseNumber: $("course").attr("key")!,
    title: $("course").attr("title")!,
    availableSeats: parseInt($("block").attr("os")!),
    avalibleWaitList: parseInt($("block").attr("ws")!),
    maxWaitlist: parseInt($("block").attr("wc")!),
  };
}

const notifyTelegram = notiBot.telegram;
export function sendTG(message: string) {
  notifyTelegram(
    message,
    config().telegram.bot_token,
    config().telegram.chat_id
  );
}
