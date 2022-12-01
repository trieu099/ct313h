<script>
export default {
  props: {
    cuss: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>
<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(cus, index) in cuss"
      :key="cus.listId"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)">
    
      {{cus.listId}} -- {{cus.cusName}} -- {{cus.bookCode}}
    </li>
  </ul>
</template>