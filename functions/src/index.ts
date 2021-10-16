import * as functions from "firebase-functions";
import fetch from "node-fetch-commonjs";
import { CourseInfo, get_url, parseResult, sendTG } from "./util";

const url = get_url(
  functions.config().course.number,
  functions.config().course.term
);
export const findSeat = functions.https.onRequest((request, response) => {
  console.log(url);
  fetch(url)
    .then((result) => result.text())
    .then((result) => parseResult(result))
    .then((course: CourseInfo) => {
      console.log(course);
      if (course.availableSeats > 0) {
        sendTG(
          `${course.availableSeats} seats available for ${course.courseNumber} ${course.title}`
        );
      } else if (course.avalibleWaitList > 0) {
        sendTG(
          `${course.avalibleWaitList} seats available on waitlist for ${course.courseNumber} ${course.title}`
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
  response.send("done");
});
