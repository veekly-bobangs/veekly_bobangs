import { StyleSheet, Dimensions } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  // container: (selectedDeal, item) => ({
  //   width: 0.85 * screenWidth, 
  //   height: 0.2 * screenHeight,
  //   margin: 10,
  //   padding: SIZES.xLarge,
  //   backgroundColor: selectedDeal === item.id ? COLORS.primary : "#FFF",
  //   borderRadius: SIZES.medium,
  //   justifyContent: "space-between",
  //   ...SHADOWS.medium,
  //   shadowColor: COLORS.white,
  // }),
  container: (selectedDeal, item) => ({
    width: 0.92 * screenWidth, 
    height: 0.25 * screenHeight,
    padding: SIZES.small,
    backgroundColor: COLORS.lightGray,  // Use a light gray background for the entire card
    borderRadius: SIZES.medium,
  }),
  backgroundImage: {
    
    flex: 1,
    borderRadius: SIZES.small,
    overflow: 'hidden',  // This will ensure the image takes the borderRadius
    marginBottom: SIZES.small,  // Margin at the bottom to separate the image and the texts
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',  // Semi-transparent black background
    padding: SIZES.small,  // Padding for the text
    borderRadius: SIZES.small,  // Rounded corners for the text background
  },
  logoContainer: (selectedDeal, item) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedDeal === item.id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  dealName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
    marginBottom: SIZES.tiny,  // Add a small margin at the bottom for separation
  },
  address: {
    fontSize: SIZES.small,
    fontFamily: "DMRegular",
    color: COLORS.primary,
  },
  dealType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;
