import { create } from "zustand";

type UseNumberOfRightAnswersType = {
  numberOfRightAnswers: number;
  setNumberOfRightAnswers: (numberofRightAnswers: number) => void;
};

export const useNumberOfRightAnswers = create<UseNumberOfRightAnswersType>(
  (set) => ({
    numberOfRightAnswers: 0,
    setNumberOfRightAnswers: (numberOfRightAnswers) =>
      set({ numberOfRightAnswers }),
  })
);
