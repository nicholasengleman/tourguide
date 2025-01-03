import React from "react";
import { View, Text } from "react-native";

const Carousel = ({ data, renderItem, ...props }) => (
  <View>
    {data.map((item, index) => (
      <View key={index}>{renderItem({ item, index })}</View>
    ))}
  </View>
);

export default Carousel;
