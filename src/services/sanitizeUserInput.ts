// import sanitizeHtml from 'sanitize-html';

// TODO rework
const sanitizeUserInput = (userInput: string): string => userInput;

// const sanitizeUserInput = (userInput: string): string =>
//   sanitizeHtml(userInput, {
//     allowedTags: [],
//     allowedAttributes: {},
//     disallowedTagsMode: 'discard'
//   });

export default sanitizeUserInput;
