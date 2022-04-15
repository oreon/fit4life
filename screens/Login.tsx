//mport { useState } from "@hookstate/core";
import { Formik } from "formik";
import React, { useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import store, { useStoreActions, useStoreState } from "../lib/Store";
import { loginValidationSchema } from "./authflow/schema";

export default function Login({ navigation }) {
  const user = useStoreState((state) => state.user);
  const login = useStoreActions((actions) => actions.apilogin);

  const [error, seterror] = useState(null);
  return (
    <View style={styles.loginContainer}>
      <Text>Login Screen</Text>
      {error && <Text style={{ fontSize: 20, color: "red" }}>{error}</Text>}
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "singhjess@gmail.com", password: "mohali76" }}
        onSubmit={async (values) => {
          const data = {
            username: values.email,
            password: values.password,
          };

          const res = await login(data);
          console.log("got res", res);
          if (!res) {
            console.log("error occured loggin");
            seterror("Cannot login with the given credentials !");
          }

          console.log(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.password}
              </Text>
            )}
            <Button onPress={handleSubmit} disabled={!isValid}>
              {" "}
              Log me In{" "}
            </Button>

            <Button onPress={() => navigation.push("Signup")}>Sign up</Button>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    width: "80%",
    alignItems: "center",
    //backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
