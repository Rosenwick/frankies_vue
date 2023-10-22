<template>
  <div>
    <div class="d-flex" id="wrapper">
      <!-- Sidebar-->
      <div class="border-end bg-white" id="sidebar-wrapper">
        <div class="sidebar-heading border-bottom">
          <span class="brand">Frankies Vue Examples</span>
        </div>

        <div class="list-group list-group-flush">
          <router-link
            to="/"
            class="list-group-item list-group-item-action list-group-item-light p-3"
            >Home</router-link
          >
          <router-link
            to="/treeview"
            class="list-group-item list-group-item-action list-group-item-light p-3"
            >TreeView</router-link
          >
          <router-link
            to="/ToggleData"
            class="list-group-item list-group-item-action list-group-item-light p-3"
            >Data Toggle</router-link
          >
        </div>
      </div>
      <!-- Page content wrapper-->
      <div id="page-content-wrapper">
        <!-- Top navigation-->
        <nav
          class="navbar navbar-expand-lg navbar-light bg-light border-bottom"
        >
          <div class="container-fluid">
            <button
              class="btn btn-primary d-none"
              id="sidebarToggle"
              @click="[(isOpen = !isOpen)]"
            >
              <span
                class="mdi"
                :class="[
                  isOpen ? 'mdi-arrow-collapse-left' : 'mdi-arrow-expand-right',
                ]"
              ></span>
            </button>
          </div>
        </nav>
        <!-- Page content-->
        <div class="container-fluid mt-50">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FraenkiesTreeview",
  props: {
    myData: {
      type: Array,
    },
    showbyChecked: {
      type: Boolean,
      default: false,
    },
    disablingSaveBtn: {
      typ: Boolean,
      default: true,
    },
    allCheckedOnStart: {
      typ: Boolean,
      default: false,
    },
  },
  data() {
    return {
      treeData: [],
      isOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/style.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

.navbar {
  height: 58px;
}

.sidebar-heading {
  background-color: #1565c0;
  .brand {
    font-family: "Koh Santepheap";
    color: #fff;
  }
}
.mt-50 {
  margin-top: 50px;
}
</style>
