import React from "react";
import { questions } from "./questions";

export const FreqAskQues = () => {
  return (
    <div>
      {questions.map((q) => {
        return (
          <div key={q.ques}>
            <div style={{display: "flex", justifyContent: 'space-between'}}>
              <div>{q.ques}</div>
              <button>+</button>
            </div>
            <div>{q.ans}</div>
          </div>
        );
      })}
    </div>
  );
};
