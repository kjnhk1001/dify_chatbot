"use client";
import React from "react";
import { useFormState } from "react-dom";
import { State, countAction } from "./action";

export const CounterScreen = () => {
  const initialState: State = { count: 0 };
  const [state, dispatch] = useFormState(countAction, initialState);

  return (
    <form action={dispatch}>
      <div>{state.count}</div>
      <button type="submit" name="action" value="increment">
        Increment
      </button>
      <button type="submit" name="action" value="decrement">
        Decrement
      </button>
    </form>
  );
};
