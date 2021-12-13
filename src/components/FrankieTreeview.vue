<template>
  <div class="col-lg-4 offset-lg-4 text-center">
    <h2 class="border-bottom mb-4 pb-2">Treeview</h2>
    <input id="hf_msg" type="hidden" runat="server" />
    <button
      v-on:click="emit"
      :disabled="enabledSaveBtn"
      class="btn btn-primary"
    >
      Speichern
    </button>
    <div class="border-bottom mb-4 mt-4"></div>
    <div class="border-bottom">
      <ul id="tree" class="mt-3 mb-0">
        <li v-for="(parent, parentidx) in treeData" :key="parentidx">
          <span class="d-inline-block">
            <span
              :class="[iconClass, parent.visibleChild ? openClass : '']"
              v-on:click="parent.visibleChild = !parent.visibleChild"
            ></span>
            <span class="form-check d-inline-block">
              <input
                type="checkbox"
                :indeterminate.prop="parent.indeterminate"
                class="form-check-input"
                :id="'parent_' + parentidx"
                :checked="parent.checked"
                @click="
                  changeParentChkbx(parent.checked, parent.children, parentidx)
                "
              />
              <label class="form-check-label" :for="'parent_' + parentidx">{{
                parent.name
              }}</label>
            </span>
          </span>
          <transition name="list">
            <ul v-show="parent.visibleChild">
              <li v-for="(child, childIdx) in parent.children" :key="childIdx">
                <span class="form-check d-inline-block">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="'child_' + parentidx + childIdx"
                    :checked="child.checked"
                    @click="
                      changeChildChkbx(
                        child.checked,
                        parent.children,
                        parentidx,
                        childIdx
                      )
                    "
                  />
                  <label
                    class="form-check-label"
                    :for="'child_' + parentidx + childIdx"
                    >{{ child.name }}</label
                  >
                </span>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
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
      iconClass: "toggle-icon",
      openClass: "open",
      selectedValues: [],
    };
  },
  computed: {
    enabledSaveBtn() {
      if (this.disablingSaveBtn === true) {
        if (this.selectedValues.length > 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
  },
  created() {
    this.myData.forEach((parentItem) => {
      this.treeData.push({
        ...parentItem,
        visibleChild: false,
        indeterminate: false,
        checked: this.allCheckedOnStart,
      });
    });

    this.treeData.forEach((parentItem) => {
      parentItem.children.forEach((childItem) => {
        childItem.checked = this.allCheckedOnStart;
      });
    });

    if (this.allCheckedOnStart === true) {
      this.getSelectedChkbx();
    }
  },
  methods: {
    emit: function () {
      this.$emit("event-child", this.selectedValues);
    },
    changeParentChkbx(parentChecked, children, parentIdx) {
      var parentNode = this.treeData[parentIdx];
      parentNode.checked = !parentChecked;

      parentNode.indeterminate = false;

      // show/hide child-items by checked/unchecked parent-item
      if (this.showbyChecked === true) {
        parentNode.visibleChild = parentNode.checked;
      }

      // checked all child checkboxes
      for (let index = 0; index < parentNode.children.length; index++) {
        parentNode.children[index].checked = parentNode.checked;
      }

      this.getSelectedChkbx();
    },
    changeChildChkbx(childrenChecked, children, parentIdx, childIdx) {
      var parentNode = this.treeData[parentIdx];
      parentNode.children[childIdx].checked = !childrenChecked;

      // set indeterminate
      var counter = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i].checked) {
          counter++;
        }
      }

      // parentNode.indeterminate = !parentNode.indeterminate;

      if (counter === 0) {
        parentNode.indeterminate = false;
        parentNode.checked = false;
      } else {
        if (counter < children.length) {
          parentNode.indeterminate = true;
          parentNode.checked = false;
        } else {
          parentNode.indeterminate = false;
          parentNode.checked = true;
        }
      }

      this.getSelectedChkbx();
    },
    getSelectedChkbx() {
      const parentNode = this.treeData;
      this.selectedValues = [];

      for (let idx = 0; idx < parentNode.length; idx++) {
        var childNode = parentNode[idx].children;

        for (let idx2 = 0; idx2 < childNode.length; idx2++) {
          if (childNode[idx2].checked) {
            this.selectedValues.push(childNode[idx2].name);
          }
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-enter,
.list-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}

ul#tree {
  list-style: none;
  padding-left: 0;
  text-align: left;

  > li {
    margin-bottom: 15px;

    .toggle-icon {
      position: absolute;
      margin-top: 4px;
      display: block;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .toggle-icon::before {
      position: absolute;
      font-family: "Material Design Icons";
      content: "\F0415";
      font-size: 21px;
      top: -5px;
      margin-left: -1px;
      color: #90a4ae; // md Blue Grey 300
      left: 1px;
    }

    .toggle-icon.open::before {
      content: "\F0374";
    }

    span.form-check {
      font-weight: normal;
      font-size: 21px;
      margin-left: 40px;
    }
    > ul {
      list-style: none;
      padding-left: 3em;
      > li {
        margin-left: 0;

        > span.form-check {
          margin-left: 25px;
        }
      }
    }
  }
}
</style>
