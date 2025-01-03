const React = require("react");
const { Text } = require("react-native");

// Mocking each specific icon component
export const Ionicons = ({ name, size, color, style }) => (
  <Text style={[{ fontSize: size, color }, style]}>{name}</Text>
);

export const MaterialIcons = ({ name, size, color, style }) => (
  <Text style={[{ fontSize: size, color }, style]}>{name}</Text>
);

// Default export
export default {
  Ionicons,
  MaterialIcons,
};
