<script>
export default {
  props: {
    cus: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Mã sách</strong>
      {{ cus.bookCode }}
    </div>
    <div class="p-1">
      <strong>Tên người mượn:</strong>
      {{ cus.cusName }}
    </div>
    <div class="p-1">
      <strong>Ngày mượn:</strong>
      {{ cus.date }}
    </div>
  </div>
</template>