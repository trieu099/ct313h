<template>
  <div class="page row">
    <div class="col-md-10">
      <BookSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Kho Sách
        <i class="fa fa-book"/>
      </h4>
      <BookList
        v-if="filteredBooksCount > 0"
        :Books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Kho Trống!.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo" /> Refresh
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddBook">
          <i class="fas fa-plus" /> Thêm Sách
        </button>
        <button class="btn btn-sm btn-danger" @click="onDeleteBooks">
          <i class="fas fa-trash" /> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeBook">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card" />
        </h4>
        <ContactCard :book="activeBook" />
        <router-link
          :to="{
            name: 'contact.edit',
            params: { id: activeContact.id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit" /> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import BookSearch from "@/components/BookSearch.vue";
import BooktList from "@/components/BookList.vue";
import { bookService } from "@/services/Library.service";
export default {
  components: {
    BookSearch,
    BooktList,
  },
  // The full code will be presented below
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Monitor changes on searchText.
    // Release the currently selected contact.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Map boook to strings for searching.
    booksAsStrings() {
      return this.contacts.map((contact) => {
        const { bookCode, bookName, bookCategory } = contact;
        return [bookCode, bookName, bookCategory].join("");
      });
    },
    // Return contacts filtered by the search box.
    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((contact, index) =>
        this.booksAsStrings[index].includes(this.searchText)
      );
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        const booksList = await bookService.getMany();
        this.books = booksList.sort((current, next) =>
          current.name.localeCompare(next.name)
        );
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrievebooks();
      this.activeIndex = -1;
    },
    async onDeleteBooks() {
      if (confirm("Xoá hết tất cả sách ?")) {
        try {
          await bookService.deleteMany();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddBook() {
      this.$router.push({ name: "book.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 900px;
}
</style>