import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";



const BASE_URL = "http://65.2.139.35";

export default function Login() {
  const navigator = useNavigation();
  const {setIsLoggedIn} = useContext(AuthContext)
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const userData = JSON.stringify({
            'user':phone,
            'status':'loggedIn'
        })

    const login = async () => {
        const res = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone_num: phone, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            Alert.alert("Login Failed", data.detail || "Invalid credentials");
            return;
        }
const setUser = async() => {
            try{
 const detail = await  AsyncStorage.setItem('userDetails',userData);
               console.log(detail);
            }catch(e){
                console.log(e)
            }
        };
        setUser();
        setIsLoggedIn(true);
        
       
    };

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.iconText}>🔔</Text>
                        </View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to manage your alarms</Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formSection}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#999"
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                autoComplete="tel"
                                value={phone}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#999"
                                secureTextEntry
                                onChangeText={setPassword}
                                autoComplete="password"
                                value={password}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={login}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.btnText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer Section */}
                    <View style={styles.footerSection}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() =>navigator.navigate("Register")}>
                            <Text style={styles.link}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        maxWidth: 500,
        width: "100%",
        alignSelf: "center",
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 48,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    iconText: {
        fontSize: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    formSection: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: "#E5E5E5",
        backgroundColor: "#FAFAFA",
        padding: 16,
        fontSize: 16,
        borderRadius: 12,
        color: "#1A1A1A",
    },
    btn: {
        backgroundColor: "#2ec4a6",
        padding: 18,
        alignItems: "center",
        borderRadius: 12,
        marginTop: 12,
        shadowColor: "#2ec4a6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    btnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    footerSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    footerText: {
        fontSize: 16,
        color: "#666",
    },
    link: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2ec4a6",
    },
});