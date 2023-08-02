const MessageListReducer = (state, action) => {
  let draftState = [...state];
  //spreading the state
  switch (action.type) {
    case "addMessage":
      return [...draftState, action.payload];
    default:
      return state;
  }
};

export default MessageListReducer;
