<template>
  <div class="row">
    <fraenkies-treeview
      v-show="true"
      v-on:event-child="getTreeData"
      :myData="myData"
      :showbyChecked="true"
      :disablingSaveBtn="true"
      :allCheckedOnStart="true"
    />
    <div class="col-lg-12 pt-3 text-center">
      <code>{{ selectedTreeValues }}</code>
    </div>
  </div>
</template>

<script>
import FraenkiesTreeview from "@/components/FrankieTreeview.vue";

export default {
  name: "Treeview",
  components: {
    FraenkiesTreeview,
  },
  data() {
    return {
      showbyChecked: false,
      selectedTreeValues: null,
      myData: [
        {
          name: "Type A",
          children: [
            { name: "A1" },
            { name: "A2" },
            { name: "A3" },
            { name: "A4" },
            { name: "A5" },
          ],
        },
        {
          name: "Type B",
          children: [
            { name: "B1" },
            { name: "B2" },
            { name: "B3" },
            { name: "B4" },
            { name: "B5" },
          ],
        },
        {
          name: "Type C",
          children: [
            { name: "C1" },
            { name: "C2" },
            { name: "C3" },
            { name: "C4" },
            { name: "C5" },
          ],
        },
        {
          name: "Type D",
          children: [
            { name: "D1" },
            { name: "D2" },
            { name: "D3" },
            { name: "D4" },
            { name: "D5" },
          ],
        },
      ],
    };
  },
  created() {
    // fetch('https://fakestoreapi.com/products')
    //   .then((response) => response.json())
    //   .then((data) => this.users = data);
  },
  methods: {
    getTreeData: function (val) {
      if (val.length > 0) {
        this.selectedTreeValues = val;
      } else {
        this.selectedTreeValues = null;
      }
    },
  },
};
</script>
