import moment from "moment";
//Moment. js is a powerful library that provides a simple way to manipulate and format dates and times in JavaScript. You have learned how to manipulate, display, and parse dates and times in React using Moment.
export const formatDate = (timestamp) => {
  return moment(timestamp).format("h:mm A");
};
