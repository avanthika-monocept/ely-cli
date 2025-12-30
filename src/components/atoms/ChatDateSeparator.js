import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { spacing } from "../../constants/Dimensions";
import colors from "../../constants/Colors";
import { fontStyle } from "../../constants/Fonts";

const ChatDateSeparator = React.memo(({ date }) => {
  return (
    <View
      testID="chat-date-separator-container"
      style={styles.container}
    >
      <View style={styles.dateWrapper}>
        <Text
          testID="chat-date-separator-text"
          style={styles.text}
        >
          {date || ""}
        </Text>
      </View>
    </View>
  );
});

ChatDateSeparator.propTypes = {
  date: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: spacing.space_10,
    paddingHorizontal: spacing.space_m4
  },
  dateWrapper: {
    backgroundColor: colors.lightNeutrals.n50,
    paddingHorizontal: spacing.space_10,
    paddingVertical: spacing.space_s2,
    borderRadius: 4,
  },
  text: {
   paddingHorizontal: spacing.space_10,
    color: colors.primaryColors.black,
    ...fontStyle.bodyBold2,
  },
});

export default ChatDateSeparator;
