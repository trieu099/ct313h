<template>
    <div v-if="cus" class="page">
      <h4>Chỉnh Sửa</h4>
      <CusForm
        :cus="cus"
        @submit:cus="onUpdateCus"
        @delete:cus="onDeleteCus"
      />
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
      listId: { type: String, required: true },
    },
    data() {
      return {
        cus: null,
        message: "",
      };
    },
    methods: {
      async getCus(listId) {
        try {
          this.cus = await customerService.get(listId);
        } catch (error) {
          console.log(error);
          // Redirect to NotFound page and keep URL intact
          this.$router.push({
            name: "notfound",
            params: {
              pathMatch: this.$route.path.split("/").slice(1),
            },
            query: this.$route.query,
            hash: this.$route.hash,
          });
        }
      },
      async onUpdateCus(cus) {
        try {
          await customerService.update(cus.listId, cus);
          this.message = "Danh sách được cập nhật thành công.";
        } catch (error) {
          console.log(error);
        }
      },
      // async onDeleteCus(listId) {
      //   if (confirm("Bạn muốn xoá người này?")) {
      //     try {
      //       await customerService.delete(listId);
      //       this.$router.push({ name: "cus.edit" });
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // },
    },
    created() {
      this.getCus(this.listId);
      this.message = "";
    },
  };
  </script>