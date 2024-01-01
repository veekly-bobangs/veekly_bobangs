import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.xLarge,
        height: 300,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: SIZES.small,
    },
});

export default styles;
