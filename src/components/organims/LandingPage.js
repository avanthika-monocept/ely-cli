import React, { memo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {LinearGradient} from "react-native-linear-gradient";
import {platformName, stringConstants } from "../../constants/StringConstants";
import { borderRadius, borderWidth, spacing, size, flex } from "../../constants/Dimensions";
import {SuggestionList} from "./SuggestionList";
import Timer from "../../../assets/timer.svg"
import { fontStyle } from "../../constants/Fonts";
import colors from "../../constants/Colors";
import PropTypes from "prop-types";
import ToastMessage from "../atoms/ToastMessage";

 
export const LandingPage = memo(({
  setnavigationPage,
  reconfigApiResponse,
  socket,
  startResponseTimeout,
  token,
  hasMore,
  historyLoading,
}) => {
  let scrollViewRef = null;
  const rawName = reconfigApiResponse?.userInfo?.userName?.split(" ")?.[0] ?? "";
  const firstName = rawName.length > 0 ? rawName[0].toUpperCase() + rawName.slice(1).toLowerCase() : "";
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: flex.one }}
        behavior={Platform.OS === platformName.ios && "padding"}
        keyboardVerticalOffset={100}
        accessible={false}
      >
        <LinearGradient
          colors={colors.gradient.others.landingPageGradient}
          start={{ x: 0.2, y: 0 }}
          end={{ x: -0.3, y: 1 }}
          style={styles.chatBodyContainer}
          accessible={false}
        >
          {hasMore && !historyLoading &&
          <TouchableOpacity
              accessible={true}
              style={styles.recentConvoBtn}
              onPress={() => setnavigationPage(stringConstants.agenda)}
            >
              <Timer width={20} height={20} style={{marginRight: spacing.space_s1}}/>
              <Text style={styles.recentConvoText} testID="recent-convo-text" accessible={true}>{stringConstants.showRecentConversations}</Text>
            </TouchableOpacity>}
         
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            ref={(ref) => {
              scrollViewRef = ref;
            }}
            onContentSizeChange={() => {
              if (scrollViewRef) {
                scrollViewRef.scrollToEnd({ animated: true });
              }
            }}
            accessible={false}
          >
           <View style={styles.textContainer} accessible={false}>
              <Text testID="greeting-text" style={styles.hiTextStyle} accessible={true}>
                {stringConstants.hiThere}{" "}
                {firstName}
                {stringConstants.hiName}
              </Text>
              <View style={{ marginTop: spacing.space_base }} accessible={false}>
                <Text style={styles.hiTextStyle} accessible={true}>
                  {stringConstants.gotQuestion}
                </Text>
                <Text style={styles.hiTextStyle} accessible={true}>
                  {stringConstants.hereToHelp}
                </Text>
              </View>
            </View>
 
            <View style={styles.bottomContainer} accessible={false}>
              <View style={styles.suggestedBtn} accessible={false}>
                <Text testID="suggested-label" style={styles.btnText} accessible={true}>{stringConstants.suggested}</Text>
              </View>
              <SuggestionList
                socket={socket}
                setnavigationPage={setnavigationPage}
                reconfigApiResponse={reconfigApiResponse}
                startResponseTimeout={startResponseTimeout}
                token={token}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
});
 
LandingPage.propTypes = {
  setnavigationPage: PropTypes.func.isRequired,
  reconfigApiResponse: PropTypes.object.isRequired,
  socket: PropTypes.object,
  startResponseTimeout: PropTypes.func,
  token: PropTypes.string,
  hasMore: PropTypes.bool,
  historyLoading: PropTypes.bool,
};
 
const styles = StyleSheet.create({
  chatBodyContainer: {
    flex: flex.one,
    width: size.hundredPercent,
  },
  scrollContent: {
    flexGrow: flex.one,
    justifyContent: "space-between",
    paddingTop: size.thirtyTwoPercent,
  },
  textContainer: {
    alignSelf: "center",
  },
  hiTextStyle: {
    ...fontStyle.bodyLargeBold,
    padding: spacing.space_s0,
    color: colors.Extended_Palette.midnightBlue.midnightBlue,
    textAlign: "center",
  },
  btnText: {
    color: colors.primaryColors.borderBlue,
    textAlign: "center",
    ...fontStyle.bodyMediumBoldSuggeated,
  },
  suggestedBtn: {
    borderRadius: borderRadius.borderRadius200,
    borderWidth: borderWidth.borderWidth1,
    alignSelf: "center",
    borderColor: colors.primaryColors.borderBlue,
    paddingVertical: spacing.space_s2,
    paddingHorizontal: spacing.space_m1,
    marginTop: spacing.space_l2,
  },
  bottomContainer: {
    paddingBottom: spacing.space_m2,
  },
  recentConvoBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: spacing.space_l1,
    paddingVertical: spacing.space_s2,
    paddingHorizontal: spacing.space_m1,
    borderRadius: borderRadius.borderRadius200,
    borderWidth: borderWidth.borderWidth1,
    borderColor: colors.lightNeutrals.n80,
    backgroundColor: colors.primaryColors.white,
  },
  recentConvoText: {
    marginLeft: spacing.space_s2,
    fontWeight: "700",
    color: colors.primaryColors.charcoalGray,
  },
  
});
 
export default LandingPage;