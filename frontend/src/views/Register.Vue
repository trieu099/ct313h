<template>
    <div class="page">
      <h4>Thêm tài khoản quản trị viên</h4>
      <AccForm :acc="acc" @submit:acc="onUpdateAcc" />
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import AccForm from "@/components/AccForm.vue";
  import { accountService } from "@/services/account.service";
  export default {
    components: {
      AccForm,
    },
    props: {
      accUsername: { type: Text, required: false },
    },
    data() {
      return {
        book: null,
        message: "",
      };
    },
    methods: {
      async onUpdateAcc(acc) {
        try {
          await accountService.create(acc);
          this.message = "Thêm tài khoản.";
        } catch (error) {
          console.log(error);
        }
      },
    },
    created() {
      this.acc = {
        accId: "",
        accUsername: "",
        accPassword: "",
      };
      this.message = "";
    },
  };
  </script>