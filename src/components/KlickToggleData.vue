<template>
  <div>
    <div class="row justify-content-md-center text-center">
      <div class="col-md-12">
        <h2 class="mb-2">Objekte einfügen/entfernen per Klick</h2>
      </div>
      <router-link to="/ItemDragAndDrop" class="link link-primary"
        >Objekte einfügen/entfernen per Drag & Drop</router-link
      >
      <router-link to="/RemoveAndInsert" class="link link-primary"
        >Klick & Move Elemente</router-link
      >
    </div>
    <div class="row mt-3 justify-content-md-center text-center">
      <div class="col-md-3">
        <div id="box1" class="card">
          <div class="card-header">
            <h4 class="mb-0">Quelle</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li
              :id="item.id"
              v-for="item in sourceList"
              :key="item.id"
              class="list-group-item"
              @click.prevent="clickSourceItem($event)"
            >
              {{ item.name
              }}<span class="badge bg-secondary bg-opacity-50">{{
                item.id
              }}</span>
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
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <div id="box2" class="card">
          <div class="card-header">
            <h4 class="mb-0">Meine Auswahl</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li
              :id="item.id"
              v-for="item in targetList"
              :key="item.id"
              class="list-group-item"
              @click.prevent="clickTargetItem($event)"
            >
              {{ item.name
              }}<span class="badge bg-secondary bg-opacity-50">{{
                item.id
              }}</span>
            </li>
          </ul>
          <div class="card-footer">
            <button
              v-if="targetList.length > 0"
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
          >Quelle: /components/KlickToggleData.vue</code
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
  data() {
    return {
      basicList: [],
      sourceList: [],
      targetList: [],
      result: "",
    };
  },
  computed: {},
  created() {
    this.fetchData();
  },
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
          this.sourceList = this.basicList.filter((item) => item.id);
        })
        .catch((error) => {
          this.result = error;
        });
    },

    clickSourceItem(evt) {
      let itemID = parseInt(evt.target.id, 16);
      // Aus dem Quell-Array wird das verschobene Objekt herausgefiltert
      this.sourceList = this.sourceList.filter((item) => item.id !== itemID);
      // Das Ziel-Array wird gebildet, indem das Quell-Array mit dem Basis-Array abgeglichen wird.
      // Das bedeuted, die Objekte vom Basis-Array, die nicht im Quell-Array enthalten sind , bilden das Ziel-Array
      this.targetList = this.basicList.filter(
        (baseItem) =>
          !this.sourceList.some((sourceItem) => baseItem.id === sourceItem.id)
      );
    },
    clickTargetItem(evt) {
      let itemID = parseInt(evt.target.id, 16);
      // wie bei clickSourceItem() nur umgekehrt
      this.targetList = this.targetList.filter((item) => item.id !== itemID);
      this.sourceList = this.basicList.filter(
        (baseItem) =>
          !this.targetList.some((targetItem) => baseItem.id === targetItem.id)
      );
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
