import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React from "react";
import tw from "twrnc";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import ImageWrapper from "@/components/ImageWrapper";

const Question = () => {
  const { numberOfQuestions, currentQuestion, topic } = useLocalSearchParams();

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
              style={tw`bg-white w-[85%] items-center justify-center py-3 rounded-xl`}
            >
              <Text style={tw`font-semibold text-base`}>
                {data?.question.option1}
              </Text>
            </Pressable>
            <Pressable
              style={tw`bg-white w-[85%] items-center justify-center py-3 rounded-xl`}
            >
              <Text style={tw`font-semibold text-base`}>
                {data?.question.option2}
              </Text>
            </Pressable>
            <Pressable
              style={tw`bg-white w-[85%] items-center justify-center py-3 rounded-xl`}
            >
              <Text style={tw`font-semibold text-base`}>
                {data?.question.option3}
              </Text>
            </Pressable>
            <Pressable
              style={tw`bg-white w-[85%] items-center justify-center py-3 rounded-xl`}
            >
              <Text style={tw`font-semibold text-base`}>
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
