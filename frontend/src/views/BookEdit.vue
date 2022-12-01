<template>
    <div v-if="book" class="page">
      <h4>Chỉnh Sửa</h4>
      <BookForm
        :book="book"
        @submit:book="onUpdateBook"
        @delete:book="onDeleteBook"
      />
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import BookForm from "@/components/BookForm.vue";
  import { bookService } from "@/services/Library.service";
  export default {
    components: {
      BookForm,
    },
    props: {
      BookCode: { type: String, required: true },
    },
    data() {
      return {
        book: null,
        message: "",
      };
    },
    methods: {
      async getBook(bookCode) {
        try {
          this.book = await bookService.get(bookCode);
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
      async onUpdateBook(book) {
        try {
          await bookService.update(book.bookCode, book);
          this.message = "Danh sách được cập nhật thành công.";
        } catch (error) {
          console.log(error);
        }
      },
      async onDeleteBook(bookCode) {
        if (confirm("Bạn muốn xóa sách này?")) {
          try {
            await bookService.delete(bookCode);
            this.$router.push({ name: "library" });
          } catch (error) {
            console.log(error);
          }
        }
      },
    },
    created() {
      this.getBook(this.BookCode);
      this.message = "";
    },
  };
  </script>