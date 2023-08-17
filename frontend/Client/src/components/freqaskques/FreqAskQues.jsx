import React, { useState } from "react";
import { questions } from "./questions";

export const FreqAskQues = () => {
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleAnswer = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-5">
      {questions.map((q, index) => (
        <div
          key={q.ques}
          className="bg-white p-4 mb-4 rounded-lg shadow-md border"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAnswer(index)}
          >
            <div className="text-lg font-semibold">{q.ques}</div>
            <button className="text-xl font-bold text-gray-500">
              {openQuestions[index] ? "-" : "+"}
            </button>
          </div>
          {openQuestions[index] && (
            <div className="mt-2 text-gray-700">{q.ans}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FreqAskQues;
