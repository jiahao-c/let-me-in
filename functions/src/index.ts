import * as functions from "firebase-functions";
import fetch from "node-fetch-commonjs";
import { CourseInfo, url, parseResult, sendTG } from "./util";

export const auto_find = functions
  .region("northamerica-northeast1")
  .pubsub.schedule("every 5 minutes")
  .onRun(() => {
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
    return null;
  });

// export const manual_find = functions.https.onRequest((request, response) => {
//   console.log(url);
//   fetch(url)
//     .then((result) => result.text())
//     .then((result) => parseResult(result))
//     .then((course: CourseInfo) => {
//       console.log(course);
//       if (course.availableSeats > 0) {
//         sendTG(
//           `${course.availableSeats} seats available for ${course.courseNumber} ${course.title}`
//         );
//       } else if (course.avalibleWaitList > 0) {
//         sendTG(
//           `${course.avalibleWaitList} seats available on waitlist for ${course.courseNumber} ${course.title}`
//         );
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   response.send("done");
// });
