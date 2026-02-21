import { Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 15,
        backgroundColor: "#f5f5f5",
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        width: "100%",
        height: 50,
        paddingHorizontal: 15,
    },
    inputWrapperFocused: {
        borderColor: "#000",
        borderWidth: 2,
    },
    textInput: {
        flex: 1,
        height: "100%",
        fontSize: 16,
        ...Platform.select({
            web: {
                outlineStyle: "none",
                outlineWidth: 0,
            } as any,
        }),
    },
    button: {
        width: "100%",
        height: 50,
        borderRadius: 8,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    iconContainer: {
        padding: 5,
    },
    linkButton: {
        marginTop: 15,
    },
    linkText: {
        color: "#007AFF",
        fontSize: 14,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    }
});
