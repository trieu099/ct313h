<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
      <div class="form-group">
        <label for="bookCode">Mã Sách</label>
        <Field
          name="bookCode"
          type="text"
          class="form-control"
          v-model="bookLocal.bookCode"
        />
        <ErrorMessage name="bookCode" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="bookName">Tên Sách</label>
        <Field
          name="bookName"
          type="text"
          class="form-control"
          v-model="bookLocal.bookName"
        />
        <ErrorMessage name="bookName" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="bookCategory">Loại Sách</label>
        <Field
          name="bookCategory"
          type="text"
          class="form-control"
          v-model="bookLocal.bookCategory"
        />
        <ErrorMessage name="bookCategory" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="bookAmount">Số lượng</label>
        <Field
          name="bookAmount"
          type="number"
          class="form-control"
          v-model="bookLocal.bookAmount"
        />
        <ErrorMessage name="bookAmount" class="error-feedback" />
      </div>
      
      <div class="form-group">
        <button class="btn btn-primary">Lưu</button>
        <!-- <button
          v-if="bookLocal.bookCode"
          type="button"
          class="ml-2 btn btn-danger"
          @click="deleteBook"
        >
          Xóa
        </button> -->
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
    emits: ["submit:book", "delete:book"],
    props: {
      book: { type: Object, required: true },
    },
    data() {
      const bookFormSchema = yup.object().shape({
        bookCode: yup
          .string()
          .required("Mã sách phải có giá trị")
          .min(1, "Mã sách phải ít nhất 1 ký tự.")
          .max(10, "Mã sách có nhiều nhất 10 ký tự."),
        bookAmount: yup
            .number("Số lượng sách cần nhập dạng số có giá trị")
            ,
        bookName: yup
            .string()
            .required("Tên sách phải có giá trị")
            .min(1, "Tên sách phải ít nhất 1 ký tự.")
            .max(255, "Tên sách tối đa 255 ký tự."),
        bookCategory: yup
            .string()
            .required("Loại sách phải có giá trị")
            .min(1, "Loại sách phải ít nhất 1 ký tự.")
            .max(255, "Loại sách tối đa 255 ký tự."),
          
      });
      return {
        bookLocal: { ...this.book},
        
        bookFormSchema,
      };
    },
    methods: {
      submitBook() {
        this.$emit("submit:book", this.bookLocal);
      },
      deleteBook() {
        this.$emit("delete:book", this.bookLocal.bookCode);
      },
    },
  };
  </script>
  <style scoped>
  @import "@/assets/form.css";
  </style>