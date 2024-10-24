import { useState, useCallback } from "react";
import { Text, View, Pressable } from "react-native";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";

import ImageWrapper from "@/components/ImageWrapper";
import { topics } from "../constants/topics";

export default function Index() {
  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");

  const handleChange = useCallback(
    (type: "topic" | "numberOfQuestions", value: string) => {
      if (type === "topic") {
        setTopic(value);
      } else if (type === "numberOfQuestions") {
        setNumberOfQuestions(value);
      }
    },
    []
  );
  return (
    <ImageWrapper>
      <Text style={tw`text-white text-3xl font-bold`}>AI QUIZ APP</Text>

      <View style={tw`gap-y-6 w-[90%]`}>
        <View style={tw`border border-white rounded-xl`}>
          <Picker
            dropdownIconColor={"#fff"}
            style={tw`text-white`}
            onValueChange={(value) => handleChange("topic", value)}
            selectedValue={topic}
          >
            <Picker.Item label="Select topic" value={""} />
            {topics.map((topic) => {
              return <Picker.Item label={topic} value={topic} key={topic} />;
            })}
          </Picker>
        </View>

        <View style={tw`border border-white rounded-xl`}>
          <Picker
            dropdownIconColor={"#fff"}
            style={tw`text-white`}
            onValueChange={(value) => handleChange("numberOfQuestions", value)}
            selectedValue={numberOfQuestions}
          >
            <Picker.Item label="Select number of questions" value={""} />
            <Picker.Item label="1" value={"1"} />
            <Picker.Item label="3" value={"3"} />
            <Picker.Item label="5" value={"5"} />
            <Picker.Item label="10" value={"10"} />
            <Picker.Item label="20" value={"20"} />
            <Picker.Item label="25" value={"25"} />
          </Picker>
        </View>
      </View>

      <Pressable
        style={tw`bg-emerald-600 w-[90%] items-center justify-center py-3 rounded-xl`}
      >
        <Text style={tw`text-white text-lg font-medium`}>Start</Text>
      </Pressable>
    </ImageWrapper>
  );
}
