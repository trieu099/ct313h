<template>
  <div class="page row">
    <div class="col-md-10">
      <BookSearch v-model="searchText" />
    </div>
    <div class="column">
    <div class="mt-3 col-md-6" style="margin-right: 5px">
      <h4>
        Kho Sách
        
      </h4>
      <BookList
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Kho Trống!.</p>
    </div></div>
    <div class="column">
    <div class="mt-3 col-md-6">
      <div v-if="activeBook">
        <h4>
          Thông Tin Chi Tiết Sách:
          
        </h4>
        <BookCard :book="activeBook" />
        <router-link
          :to="{
            name: 'book.edit',
            params: { bookCode: activeBook.bookCode },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit" /> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
    <div class="bton">
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          Refresh
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddBook">
          <i class="fas fa-plus" /> Thêm Sách
        </button>

        <button class="btn btn-sm btn-success" @click="goToAddCustomer">
          <i /> Mượn sách
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddAccount">
          <i class="fas fa-plus" /> Thêm tài khoản quản trị viên
        </button>
      </div>
      </div>
    </div>

      <div class="column">
        <h4>
          Danh Sách Mượn
          
        </h4>
        <CusList
          v-if="filteredCussCount > 0"
          :cuss="filteredCuss"
          v-model:aactiveIndex="aactiveIndex"
        />
        <p v-else>Danh Sách Trống!.</p>
      </div>
      
      <!-- <div v-if="aactiveCus">
        <h4>
          Thông Tin Chi Tiết:
          <i class="fas fa-address-card" />
        </h4>
        <CusCard :cus="aactiveCus" />
        <router-link
          :to="{
            name: 'cus.edit',
            params: { listId: aactiveCus.listId },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit" /> Hiệu chỉnh</span
          >
        </router-link>
      </div> -->
    
  </div>
</template>
<script>
import BookCard from "@/components/BookCard.vue";

import BookSearch from "@/components/BookSearch.vue";
import BookList from "@/components/BookList.vue";
import CusList from "@/components/CusList.vue";
// import CusCard from "@/components/CusCard.vue";
import { bookService } from "@/services/Library.service";
import { customerService } from "@/services/Customer.service";

export default {
  components: {
    BookSearch,
    BookList,
    CusList,
    BookCard,
    // CusCard,
  },
  // The full code will be presented below
  data() {
    return {
      books: [],
      cuss: [],
      activeIndex: -1,
      aactiveIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Monitor changes on searchText.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Map boook to strings for searching.
    booksAsStrings() {
      return this.books.map((book) => {
        const { bookCode, bookName, bookCategory } = book;
        return [bookCode, bookName, bookCategory].join("");
      });
    },
    cussAsStrings() {
      return this.cuss.map((cus) => {
        const { cusName, bookCode, date } = cus;
        return [cusName, bookCode, date].join("");
      });
    },
    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((book, index) =>
        this.booksAsStrings[index].includes(this.searchText)
      );
    },
    filteredCuss() {
      if (!this.searchText) return this.cuss;
      return this.cuss.filter((cus, index) =>
        this.cussAsStrings[index].includes(this.searchText)
      );
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    aactiveCus() {
      if (this.aactiveIndex < 0) return null;
      return this.filteredCuss[this.aactiveIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
    filteredCussCount() {
      return this.filteredCuss.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        const booksList = await bookService.getMany();
        this.books = booksList.sort((current, next) =>
          current.bookName.localeCompare(next.bookName)
        );
      } catch (error) {
        console.log(error);
      }
    },
    async retrieveCuss() {
      try {
        const cussList = await customerService.getMany();
        this.cuss = cussList.sort((current, next) =>
          current.cusName.localeCompare(next.cusName)
        );
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.retrieveCuss();
      this.activeIndex = -1;
      this.aactiveIndex = -1;
    },

    // async onDeleteBooks() {
    //   if (confirm("Xoá hết tất cả sách ?")) {
    //     try {
    //       await bookService.deleteMany();
    //       this.refreshList();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // },
    goToAddBook() {
      this.$router.push({ name: "book.add" });
    },
    goToAddAccount() {
      this.$router.push({ name: "acc.add" });
    },
    goToAddCustomer() {
      this.$router.push({ name: "cus.add" });
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
  width: 1200px;
  /* height: 600px; */
  color: black;
}
.btn {
  margin: 5px;
}
.column {
  float: left;
  width: 33.33%;
  padding: 10px;
  height: 500px; 
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

/* @media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
} */

h4 {
  color: aqua;
  margin: 10px;
}
</style>
