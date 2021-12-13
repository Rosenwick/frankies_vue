<template>
  <div>
    <div class="row justify-content-md-center text-center">
      <div class="col-md-12">
        <h2 class="mb-2">Klick & Move Elemente</h2>
      </div>
      <router-link to="/ItemDragAndDrop" class="link link-primary"
        >Objekte einfügen/entfernen per Drag & Drop</router-link
      >
      <router-link to="/KlickToggleData" class="link link-primary"
        >Objekte einfügen/entfernen per Klick</router-link
      >
    </div>
    <div class="row mt-3 justify-content-md-center text-center mt-3">
      <div class="col-xl-3">
        <div id="box1" class="drop-zone">
          <div
            :id="item.id"
            v-for="item in listOne"
            :key="item.id"
            class="drag-el"
            @click.prevent="move($event)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-3">
        <div id="box2" class="drop-zone"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3 text-center mt-2">
        <code class="font-italic text-black-50"
          >Quelle: /components/RemoveAndInsert.vue</code
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RemoveAndInsert",
  data() {
    return {
      items: [
        {
          id: 0,
          title: "Item A",
          listNo: 1,
        },
        {
          id: 1,
          title: "Item B",
          listNo: 1,
        },
        {
          id: 3,
          title: "Item C",
          listNo: 1,
        },
      ],
      source: [],
    };
  },
  computed: {
    listOne() {
      return this.items.filter((item) => item.listNo === 1);
    },
  },
  methods: {
    move: (evt) => {
      let itemID = evt.target.id;
      let targetBoxID;

      // Wird das click-Event von dem übergeordneten Knoten "box2" ausgelöst, ...
      evt.target.parentNode.id == "box2"
        ? (targetBoxID = "box1") // ... ist der Zielknoten die ID box1
        : (targetBoxID = "box2"); // ... ansonsten ausgelöst von "box1" und der Zielknoten ist die ID box2

      const myobj = document.getElementById(itemID);
      myobj.remove(); // Enfernt das angeklickte Element
      document.getElementById(targetBoxID).appendChild(myobj); // Fügt das angeklickte Element in die Zielbox ein
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-zone {
  min-height: 100px;
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
  div:not(:last-child) {
    margin-bottom: 0.4rem;
  }
}

.drag-el {
  background-color: #fff;
  padding: 5px;
}
</style>
