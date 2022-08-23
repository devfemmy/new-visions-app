import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import * as Yup from "yup";
import AppForm from "../../components/forms/Form";
import AppFormField from "../../components/forms/FormField";
import SubmitButton from "../../components/forms/SubmitButton";
import i18n from "i18n-js";
import { AppContext } from "../../context/AppState";
import { useNavigation } from "@react-navigation/native";
import colors from "../../helpers/colors";

const validateLoginForm = Yup.object().shape({
  email: Yup.string().email().required("البريد الالكتروني الزامي"),
  password: Yup.string().required("كلمة المرور الزامية"),
});

function LoginForm({ submitLogin }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{ email: "", password: "" }}
        validationSchema={validateLoginForm}
        onSubmit={(values) => submitLogin(values, navigation)}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          AntDesignIcon="mail"
          name="email"
          keyboardType="email-address"
          labelName={i18n.t("Email")}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          AntDesignIcon="lock"
          name="password"
          secureTextEntry
          keyboardType="numeric"
          labelName={i18n.t("Password")}
        />
        
        <View style={{ height: 50 }}></View>
        <SubmitButton style={styles.LoginBtn} title={i18n.t("login")} />
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'90%',
  },
});

export default LoginForm;
