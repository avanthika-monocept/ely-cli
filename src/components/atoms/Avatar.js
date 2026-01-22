import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { borderRadius, flex, size, spacing } from "../../constants/Dimensions";
import colors from "../../constants/Colors";
import { fontStyle } from "../../constants/Fonts";
import PropTypes from "prop-types";
import { useNetInfo } from "@react-native-community/netinfo";
import { isTabletView } from "../../common/tabletUtils";
import ElyNewIcon from "../../../assets/ElyNewIcon.png";
const isTablet = isTabletView();
const Avatar = ({ botName = "ELY"}) => {
  Avatar.propTypes = {
    botName: PropTypes.string,
  };
  const netInfo = useNetInfo();
  const onlineStatus = netInfo.isConnected;
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarWrapper}>
        <View style={styles.imageContainer}>
           <Image
            testID="avatar-logo"
            source={ElyNewIcon}
            style={[
              styles.avatarImage,
              {
                width: isTablet ? size.width_32 : size.width_52,
                height: isTablet ? size.width_32 : size.width_52,
              },
            ]}
            resizeMode="contain"
          />
        </View>
        <View
          testID="status-dot"
          style={[
            styles.statusDot,
            onlineStatus ? styles.online : styles.offline,
          ]}
        />
      </View>
      <Text style={styles.avatarText}>{botName}</Text>
    </View>
  );
};
export default Avatar;
const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  avatarWrapper: {
    position: "relative",
    width: size.width_30,
    height: isTablet?  size.height30 : size.height36,
  },
  imageContainer: {
     justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    marginLeft: isTablet ? size.width_8 : size.width_2,
    alignSelf: "center",
  },
  statusDot: {
    position: "absolute",
    top: isTablet ? 8 : spacing.space_s2,
    right: isTablet ? 9 : spacing.space_s1,
    width: isTablet ? size.width_5 : size.width_8,
    height: isTablet ? size.width_5 : size.height_8,
    borderRadius: isTablet ? borderRadius.borderRadius10 : borderRadius.borderRadius4,
  },
  online: {
    backgroundColor: colors.primaryColors.green,
  },
  offline: {
    backgroundColor: colors.secondaryColors.punch,
  },
  avatarText: {
    ...fontStyle.bodyBold0,
    color: colors.primaryColors.white,
  },
});
