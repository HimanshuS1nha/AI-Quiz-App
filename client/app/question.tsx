import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import ImageWrapper from "@/components/ImageWrapper";
import { useNumberOfRightAnswers } from "@/hooks/useNumberOfRightAnswers";

const Question = () => {
  const { setNumberOfRightAnswers, numberOfRightAnswers } =
    useNumberOfRightAnswers();

  const { numberOfQuestions, currentQuestion, topic } =
    useLocalSearchParams() as {
      numberOfQuestions: string;
      currentQuestion: string;
      topic: string;
    };

  const [selectedAnswer, setSelectedAnswer] = useState<
    "option1" | "option2" | "option3" | "option4"
  >();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: [`get-question-${currentQuestion}`],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/generate-question`,
        { topic }
      );

      return data as {
        question: {
          question: string;
          option1: string;
          option2: string;
          option3: string;
          option4: string;
          rightAnswer: "option1" | "option2" | "option3" | "option4";
        };
      };
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      Alert.alert("Error", error.response.data.error);
    } else {
      Alert.alert("Error", "Some error occured. Please try again later!");
    }
  }

  const checkAnswer = useCallback(
    (selectedAnswer: "option1" | "option2" | "option3" | "option4") => {
      if (!data) {
        return;
      }
      setSelectedAnswer(selectedAnswer);

      if (selectedAnswer === data.question.rightAnswer) {
        setNumberOfRightAnswers(numberOfRightAnswers + 1);
        setIsAnswerCorrect(true);
      } else {
        setIsAnswerCorrect(false);
      }

      setTimeout(() => {
        if (currentQuestion === numberOfQuestions) {
          router.replace({
            pathname: "/result",
            params: { numberOfQuestions },
          });
        } else {
          router.replace({
            pathname: "/question",
            params: {
              currentQuestion: parseInt(currentQuestion) + 1,
              topic,
              numberOfQuestions,
            },
          });
        }
      }, 1500);
    },
    [numberOfQuestions, currentQuestion, data, selectedAnswer]
  );
  return (
    <ImageWrapper>
      {isLoading ? (
        <ActivityIndicator size={50} color={"white"} />
      ) : (
        <>
          <View style={tw`gap-y-3 items-center`}>
            <Text style={tw`text-gray-300`}>
              Question {currentQuestion} of {numberOfQuestions}
            </Text>
            <Text style={tw`text-white text-4xl font-medium text-center`}>
              {data?.question.question}
            </Text>
          </View>

          <View style={tw`gap-y-6 w-full items-center mt-10`}>
            <Pressable
              style={tw`${
                selectedAnswer === "option1"
                  ? isAnswerCorrect
                    ? "bg-emerald-600"
                    : "bg-rose-600"
                  : "bg-white"
              } w-[85%] items-center justify-center py-3 rounded-xl`}
              onPress={() => {
                checkAnswer("option1");
              }}
              disabled={!!selectedAnswer}
            >
              <Text
                style={tw`font-semibold text-base ${
                  selectedAnswer === "option1" ? "text-white" : "text-black"
                }`}
              >
                {data?.question.option1}
              </Text>
            </Pressable>
            <Pressable
              style={tw`${
                selectedAnswer === "option2"
                  ? isAnswerCorrect
                    ? "bg-emerald-600"
                    : "bg-rose-600"
                  : "bg-white"
              } w-[85%] items-center justify-center py-3 rounded-xl`}
              onPress={() => {
                checkAnswer("option2");
              }}
              disabled={!!selectedAnswer}
            >
              <Text
                style={tw`font-semibold text-base ${
                  selectedAnswer === "option2" ? "text-white" : "text-black"
                }`}
              >
                {data?.question.option2}
              </Text>
            </Pressable>
            <Pressable
              style={tw`${
                selectedAnswer === "option3"
                  ? isAnswerCorrect
                    ? "bg-emerald-600"
                    : "bg-rose-600"
                  : "bg-white"
              } w-[85%] items-center justify-center py-3 rounded-xl`}
              onPress={() => {
                checkAnswer("option3");
              }}
              disabled={!!selectedAnswer}
            >
              <Text
                style={tw`font-semibold text-base ${
                  selectedAnswer === "option3" ? "text-white" : "text-black"
                }`}
              >
                {data?.question.option3}
              </Text>
            </Pressable>
            <Pressable
              style={tw`${
                selectedAnswer === "option4"
                  ? isAnswerCorrect
                    ? "bg-emerald-600"
                    : "bg-rose-600"
                  : "bg-white"
              } w-[85%] items-center justify-center py-3 rounded-xl`}
              onPress={() => {
                checkAnswer("option4");
              }}
              disabled={!!selectedAnswer}
            >
              <Text
                style={tw`font-semibold text-base ${
                  selectedAnswer === "option4" ? "text-white" : "text-black"
                }`}
              >
                {data?.question.option4}
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </ImageWrapper>
  );
};

export default Question;
