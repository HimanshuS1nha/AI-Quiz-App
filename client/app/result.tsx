import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { router } from "expo-router";

import ImageWrapper from "@/components/ImageWrapper";

const Result = () => {
  return (
    <ImageWrapper>
      <View style={tw`items-center gap-y-6 w-full`}>
        <Text style={tw`text-white text-lg font-medium`}>
          Your final score is
        </Text>
        <View
          style={tw`bg-emerald-600 rounded-full w-28 h-28 items-center justify-center`}
        >
          <Text style={tw`text-white text-4xl font-bold`}>60%</Text>
        </View>

        <Text style={tw`text-white text-base font-medium`}>
          You correctly answered 2 questions out of 5
        </Text>

        <Pressable
          style={tw`bg-emerald-600 w-[90%] items-center justify-center py-3 rounded-xl`}
          onPress={router.back}
        >
          <Text style={tw`text-white text-lg font-medium`}>Go back</Text>
        </Pressable>
      </View>
    </ImageWrapper>
  );
};

export default Result;