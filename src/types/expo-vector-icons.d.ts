declare module "@expo/vector-icons" {
  import { Component } from "react";
  import { TextProps } from "react-native";

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export const Fontisto: React.ComponentType<IconProps>;
  export const AntDesign: React.ComponentType<IconProps>;
}
