import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { spacing } from "../../constants/Dimensions";
import colors from "../../constants/Colors";
import { fontStyle } from "../../constants/Fonts";

const UnreadMessageBanner = React.memo(({ count }) => {
  const displayCount = count > 99 ? "99+" : count;

  return (
    <View
      testID="unread-message-banner-container"
      style={styles.container}
    >
      <View style={styles.pill}>
        <Text
          testID="unread-message-banner-text"
          style={styles.text}
        >
          {displayCount} unread message{displayCount > 1 ? "s" : ""}
        </Text>
      </View>
    </View>
  );
});

UnreadMessageBanner.propTypes = {
  count: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: spacing.space_10,
  },
  pill: {
    backgroundColor: colors.lightNeutrals.n50,
    paddingHorizontal: spacing.space_10,
    paddingVertical: spacing.space_s2,
    borderRadius: 20,
},
  text: {
    paddingHorizontal: spacing.space_10,
    color: colors.primaryColors.black,
   ...fontStyle.bodyBold2,
  },
});

export default UnreadMessageBanner;
