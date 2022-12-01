<template>
    <Form @submit="submitAcc" :validation-schema="accFormSchema">
      <div class="form-group">
        <label for="accUsername">User Name: </label>
        <Field
          name="accUsername"
          type="text"
          class="form-control"
          v-model="accLocal.accUsername"
        />
        <ErrorMessage name="accUsername" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="accPassword">Password: </label>
        <Field
          name="accPassword"
          type="password"
          class="form-control"
          v-model="accLocal.accPassword"
        />
        <ErrorMessage name="accPassword" class="error-feedback" />
      </div>
      
      
      
      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        
      </div>
    </Form>
  </template>
  <script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    emits: ["submit:acc", "delete:acc"],
    props: {
      acc: { type: Object, required: true },
    },
    data() {
      const accFormSchema = yup.object().shape({
        
        accUsername: yup
            .string()
            .required("Phải nhập tên đăng nhập")
            .min(8, "Tên đăng nhập phải ít nhất 8 ký tự.")
            .max(32, "Tên sách tối đa 32 ký tự."),
        accPassword: yup
            .string()
            .required("Phải nhập mật khẩu")
            .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
            .max(32, "Mật khẩu tối đa 32 ký tự."),
          
      });
      return {
        accLocal: { ...this.acc},
        
        accFormSchema,
      };
    },
    methods: {
      submitAcc() {
        this.$emit("submit:acc", this.accLocal);
      },
    },
  };
  </script>
  <style scoped>
  @import "@/assets/form.css";
  </style>