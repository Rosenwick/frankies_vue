<template>
  <div class="row">
    <div class="col-xl-5">
      <div
        class="drop-zone"
        @drop="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="item in listOne"
          :key="item.title"
          class="drag-el"
          draggable
          @dragstart="startDrag($event, item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="col-xl-2"></div>
    <div class="col-xl-5">
      <div
        class="drop-zone"
        @drop="onDrop($event, 2)"
        @dragover.prevent
        @dragenter.prevent
        @touchend="onDrop($event, 2)"
      >
        <div
          v-for="item in listTwo"
          :key="item.title"
          class="drag-el"
          draggable
          @dragstart="startDrag($event, item)"
          @touchstart="show"
          @touchmove="startDrag($event, item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 0,
          title: "Item A",
          list: 1,
        },
        {
          id: 1,
          title: "Item B",
          list: 1,
        },
        {
          id: 2,
          title: "Item C",
          list: 2,
        },
      ],
    };
  },
  computed: {
    listOne() {
      return this.items.filter((item) => item.list === 1);
    },
    listTwo() {
      return this.items.filter((item) => item.list === 2);
    },
  },
  methods: {
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.list = list;
    },
  },
};
</script>

<style scoped>
.drop-zone {
  min-height: 100px;
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
</style>
