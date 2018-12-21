<!--
Copyright 2018 SpinalCom - www.spinalcom.com

This file is part of SpinalCore.

Please read all of the following terms and conditions
of the Free Software license Agreement ("Agreement")
carefully.

This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.

If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
  <div>
    <md-table v-if="this.selectedType === ''"
              v-model="types">
      <md-table-row slot="md-table-row"
                    slot-scope="{ item }"
                    md-selectable="single"
                    @md-selected="onSelect">
        <md-table-cell md-label="Type">
          {{item}}
        </md-table-cell>
      </md-table-row>
    </md-table>

    <div v-else
         id="div-display-type">
      <h2 id="header-name-type">
        {{selectedType}}
      </h2>

      <md-button @click="clearType">
        <md-icon>clear</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import { SpinalContext } from "spinal-env-viewer-graph-service";

export default {
  name: "chooseType",
  props: {
    active: {
      type: Boolean,
      required: true
    },
    context: {
      validator(value) {
        return value instanceof SpinalContext || value === null;
      },
      required: true
    },
    selectedType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      types: []
    };
  },
  watch: {
    active: {
      immediate: true,
      handler() {
        if (this.active) {
          this.loadAvailableTypes();
        }
      }
    }
  },
  methods: {
    async loadAvailableTypes() {
      this.types = [];

      await this.context.forEachInContext(this.context, node => {
        const type = node.getType().get();

        if (!this.types.includes(type)) {
          this.types.push(type);
        }
      });
    },
    onSelect(type) {
      this.$emit("choseType", type);
    },
    clearType() {
      this.loadAvailableTypes();
      this.$emit("choseType", "");
    }
  }
};
</script>

<style scoped>
#div-display-type {
  display: flex;
}

#header-name-type {
  width: 100%;
  text-align: center;
}
</style>
