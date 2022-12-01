<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Mã sách</strong>
      {{ book.bookCode }}
    </div>
    <div class="p-1">
      <strong>Tên Sách:</strong>
      {{ book.bookName }}
    </div>
    <div class="p-1">
      <strong>Thể Loại:</strong>
      {{ book.bookCategory }}
    </div>
    <div class="p-1">
      <strong>Số Lượng:</strong>
      {{ book.bookAmount }}
    </div>
    
  </div>
</template>