/* eslint-disable  @typescript-eslint/no-non-null-assertion */
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
export function get_time_verifier() {
  const time = Date.now();
  const updated_time = Math.floor(time / 60000) % 1000;
  const verify = (updated_time % 3) + (updated_time % 19) + (updated_time % 42);
  return "&t=" + updated_time.toString() + "&e=" + verify.toString();
}
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

export const course_term = config().course.term;
export const course_number = config().course.number;
