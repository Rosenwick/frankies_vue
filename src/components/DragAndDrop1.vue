<template>
  <div>
    <div class="row justify-content-md-center text-center">
      <div class="col-md-12">
        <h2 class="mb-2">Objekte einfügen/entfernen per Drag & Drop</h2>
      </div>
      <router-link to="/KlickToggleData" class="link link-primary"
        >Objekte einfügen/entfernen per Klick</router-link
      >
      <router-link to="/RemoveAndInsert" class="link link-primary"
        >Klick & Move Elemente</router-link
      >
    </div>
    <div class="row mt-3 justify-content-md-center text-center">
      <div class="col-xl-3">
        <div class="card">
          <div class="card-header"><h4 class="mb-0">Quelle</h4></div>
          <ul
            class="list-group list-group-flush"
            @drop="onDrop($event, 'source')"
            @dragover.prevent
            @dragenter.prevent
          >
            <li
              v-for="item in sortedArray(sourceList)"
              :key="item.id"
              class="list-group-item"
              draggable
              @dragstart="startDrag($event, item.id)"
              @touchstart="show"
              @touchmove="startDrag($event, item.id)"
            >
              {{ item.username }}
            </li>
          </ul>
          <div class="card-footer">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click.prevent="reset()"
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>
      <div class="col-xl-1"></div>
      <div class="col-xl-3">
        <div class="card">
          <div class="card-header"><h4 class="mb-0">Meine Auswahl</h4></div>
          <ul
            class="list-group list-group-flush"
            @drop="onDrop($event, 'target')"
            @dragover.prevent
            @dragenter.prevent
            @touchend="onDrop($event, 'target')"
          >
            <li
              v-for="item in sortedArray(targetList)"
              :key="item.id"
              class="list-group-item"
              draggable
              @dragstart="startDrag($event, item.id)"
              @touchstart="show"
              @touchmove="startDrag($event, item.id)"
            >
              {{ item.username }}
            </li>
          </ul>
          <div class="card-footer">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click.prevent="doThis()"
            >
              Mach was!
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-3 text-center mt-2">
        <code class="font-italic text-black-50"
          >Quelle: /components/DragAndDrop1.vue</code
        >
      </div>
      <div class="col-md-6 offset-md-3">
        <code class="mt-5 d-block">{{ result }}</code>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemDragAndDrop",
  data() {
    return {
      basicList: [],
      sourceList: [],
      targetList: [],
      result: "",
    };
  },
  created() {
    this.fetchData();
  },
  computed: {},
  methods: {
    fetchData() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(async (response) => {
          const data = await response.json();

          // Prüft ob die Anwort fehlerhaft ist
          if (!response.ok) {
            // Fehlermeldung wird ausgegeben
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.basicList = data;
          this.sourceList = this.basicList.filter((item) => item.id >= 0);
        })
        .catch((error) => {
          this.result = error;
        });
    },

    startDrag: (evt, itemID) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", itemID);
    },
    sortedArray(myArray) {
      return myArray.slice().sort(function (a, b) {
        return a.username > b.username ? 1 : -1;
      });
    },
    onDrop(evt, list) {
      const itemID = parseInt(evt.dataTransfer.getData("itemID"), 16);
      // Eintrag wird zu "Meine Auswahl" verschoben
      if (list === "target") {
        // Aus dem Quell-Array wird das verschobene Objekt herausgefiltert
        this.sourceList = this.sourceList.filter((item) => item.id !== itemID);
        // Das Ziel-Array wird gebildet, indem das Quell-Array mit dem Basis-Array abgeglichen wird.
        // Das bedeuted, die Objekte vom Basis-Array, die nicht im Quell-Array enthalten sind , bilden das Ziel-Array
        this.targetList = this.basicList.filter(
          (baseItem) =>
            !this.sourceList.some((sourceItem) => baseItem.id === sourceItem.id)
        );
      }
      // Eintrag wird zu "Quelle" verschoben
      else if (list === "source") {
        // wie oben nur umgekehrt
        this.targetList = this.targetList.filter((item) => item.id !== itemID);
        this.sourceList = this.basicList.filter(
          (baseItem) =>
            !this.targetList.some((targetItem) => baseItem.id === targetItem.id)
        );
      }
    },
    show() {
      console.log("Hier hin");
    },
    reset() {
      this.targetList = [];
      this.fetchData();
      this.result = "";
    },
    doThis() {
      this.result = JSON.stringify(this.targetList);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  height: 205px;
  overflow-y: scroll;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: repeating-linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee
    ),
    repeating-linear-gradient(
      45deg,
      #eee 25%,
      #fff 25%,
      #fff 75%,
      #eee 75%,
      #eee
    );
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;

  li {
    cursor: pointer;
    background-color: #ddd;
    .badge {
      display: block;
      height: 20px;
      width: 20px;
      line-height: 20px;
      float: left;
      border-radius: 10px;
      padding: 0;
      color: #494949;
      margin-right: 10px;
      margin-top: 2px;
    }
    &:hover {
      background-color: #5e92f3;
      color: #fff;
      .bg-secondary {
        background-color: #fff;
        opacity: 1 !important;
      }
    }
  }
}
.card-footer {
  height: 47px;
}
</style>
