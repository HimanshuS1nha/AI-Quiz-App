import { ImageBackground } from "react-native";
import React from "react";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";

const ImageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ImageBackground
        source={require("../assets/images/bg.png")}
        resizeMode="stretch"
        style={tw`flex-1 justify-center items-center gap-y-10`}
      >
        {children}
      </ImageBackground>
      <StatusBar style="light" />
    </>
  );
};

export default ImageWrapper;
