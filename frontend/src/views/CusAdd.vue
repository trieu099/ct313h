<template>
    <div class="page">
      <h4>Thêm danh sách mượn</h4>
      <CusForm :cus="cus" @submit:cus="onUpdateCus" @delete:cus="onDeleteCus" />
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import CusForm from "@/components/CusForm.vue";
  import { customerService } from "@/services/Customer.service";
  export default {
    components: {
      CusForm,
    },
    props: {
      listId: { type: Number, required: false },
    },
    data() {
      return {
        cus: null,
        message: "",
      };
    },
    methods: {
      async onUpdateCus(cus) {
        try {
          await customerService.create(cus);
          this.message = "Thêm thành công.";
        } catch (error) {
          console.log(error);
        }
      },
      async onDeleteCus(cus, listId) {
        if (confirm("Bạn muốn xóa người này?")) {
          try {
            await customerService.delete(cus, listId);
            this.$router.push({ name: "cus.edit" });
          } catch (error) {
            console.log(error);
          }
        }
      },
    },
    created() {
      this.cus = {
        listId: "",
        cusName: "",
        bookCode: "",
        date: "",
      };
      this.message = "";
    },
  };
  </script>