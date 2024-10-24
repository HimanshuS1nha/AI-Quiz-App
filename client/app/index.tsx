import { Text, View } from "react-native";
import tw from "twrnc";

import ImageWrapper from "@/components/ImageWrapper";

export default function Index() {
  return (
    <ImageWrapper>
      <Text style={tw`text-white text-3xl font-bold`}>AI QUIZ APP</Text>
    </ImageWrapper>
  );
}
