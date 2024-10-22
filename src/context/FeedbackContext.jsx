import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "this is item n1",
      rating: 10,
    },
    {
      id: 2,
      text: "this is item n2",
      rating: 10,
    },
    {
      id: 3,
      text: "this is item n3",
      rating: 10,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
  // delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("are u sure?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => {
        item.id === id ? { ...item, ...updItem } : item;
      })
    );
  };

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback, //the function
        feedbackEdit, // the actual piece of state that holds the item and the boolean
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
