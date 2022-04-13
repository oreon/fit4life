import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { useStoreActions } from "../lib/Store";
import Navigation from "../navigation";

const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, "Enter at least 2 names")
    .required("Full name is required"),
  phoneNumber: yup
    .string()
    //.matches(/(01)(\d){8}\b/, "Enter a valid phone number")
    .required("Phone number is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    //.matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    // .matches(
    //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //   "Password must have a special character"
    // )
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const Signup = ({ navigation }) => {
  const [registerError, setRegisterError] = useState("");
  const register = useStoreActions((actions) => actions.register);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Text>Sign Up Screen</Text>
          <Text style={{ fontSize: 20, color: "red" }}>{registerError}</Text>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "",
              password: "mohali76",
              confirmPassword: "mohali76",
            }}
            onSubmit={(values) => {
              try {
                values.username = values.email;
                console.log("callig with ", values);
                register(values);
              } catch (e) {
                setRegisterError(e.message);
              }
            }}
          >
            {({ handleSubmit, isValid, values }) => (
              <>
                <Field
                  component={CustomInput}
                  name="name"
                  placeholder="Full Name"
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={CustomInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />

                <Button
                  onPress={handleSubmit}
                  title="SIGN UP"
                  disabled={!isValid || values.email === ""}
                />

                <Button
                  onPress={() => navigation.navigate("Login")}
                  title="Log in"
                />
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signupContainer: {
    width: "80%",
    alignItems: "center",
    //backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
});

export default Signup;
