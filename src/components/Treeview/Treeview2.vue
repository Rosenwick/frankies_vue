<template>
  <div>
    <ul class="tree">
      <li v-for="(item, idx) in myData" :key="item.name">
        <span class="d-inline-block">
          <span
            v-if="item.children && item.children.length > 0"
            :class="[iconClass, item.expanded ? openClass : '']"
            @click="toggleNode(item)"
          ></span>

          <span class="form-check d-inline-block">
            <input
              type="checkbox"
              class="form-check-input"
              :id="'item.name_' + idx"
            />
            <label class="form-check-label" :for="'item.name_' + idx">{{
              item.name
            }}</label>
          </span>

          <ul v-if="item.expanded && item.children">
            <tree-node :myData="item.children"></tree-node>
          </ul>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TreeNode",
  props: {
    myData: Array,
  },
  data() {
    return {
      iconClass: "toggle-icon",
      openClass: "open",
      expandedNodes: [],
      myDataClone: [],
    };
  },
  methods: {
    toggleNode(node) {
      if (node.children) {
        node.expanded = !node.expanded;
        if (node.expanded) {
          this.expandedNodes.push(node);
        } else {
          const index = this.expandedNodes.indexOf(node);
          if (index > -1) {
            this.expandedNodes.splice(index, 1);
          }
        }
      }
    },
  },
  created() {
    this.myData.forEach((item) => {
      this.$set(item, "expanded", false);
      this.$set(item, "checked", false);
      if (item.children) {
        item.children.forEach((child) => {
          this.$set(child, "expanded", false);
          this.$set(child, "checked", false);
        });
      }
    });
  },
};
</script>
<style scoped lang="scss">
ul.tree {
  list-style: none;
  padding-left: 0;
  text-align: left;

  > li {
    margin-bottom: 15px;

    .node-name {
      display: inline-block;
      font-weight: normal;
      font-size: 21px;
      margin-left: 20px;
    }

    .toggle-icon {
      position: absolute;
      margin-top: 5px;
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
