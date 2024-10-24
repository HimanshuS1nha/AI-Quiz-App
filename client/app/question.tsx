import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { useLocalSearchParams } from "expo-router";

import ImageWrapper from "@/components/ImageWrapper";

const Question = () => {
  const { numberOfQuestions, currentQuestion, topic } = useLocalSearchParams();
  return (
    <ImageWrapper>
      <View style={tw`gap-y-3 items-center`}>
        <Text style={tw`text-gray-300`}>
          Question {currentQuestion} of {numberOfQuestions}
        </Text>
        <Text style={tw`text-white text-4xl font-medium text-center`}>
          What is the use of functions?
        </Text>
      </View>

      <View style={tw`gap-y-6 w-full items-center mt-10`}>
        <Pressable
          style={tw`bg-white w-[85%] items-center justify-center py-3 rounded-xl`}
        >
          <Text style={tw`font-semibold text-base`}>No Use</Text>
        </Pressable>
        <Pressable
          style={tw`bg-white w-[85%] items-center justify-center py-3 rounded-xl`}
        >
          <Text style={tw`font-semibold text-base`}>Very Useful</Text>
        </Pressable>
        <Pressable
          style={tw`bg-white w-[85%] items-center justify-center py-3 rounded-xl`}
        >
          <Text style={tw`font-semibold text-base`}>Little use</Text>
        </Pressable>
        <Pressable
          style={tw`bg-white w-[85%] items-center justify-center py-3 rounded-xl`}
        >
          <Text style={tw`font-semibold text-base`}>I do not know</Text>
        </Pressable>
      </View>
    </ImageWrapper>
  );
};

export default Question;
