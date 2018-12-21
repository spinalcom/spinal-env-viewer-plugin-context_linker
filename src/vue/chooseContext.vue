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
    <md-table v-if="selectedContext === null"
              v-model="contexts">
      <md-table-row slot="md-table-row"
                    slot-scope="{ item }"
                    md-selectable="single"
                    @md-selected="onSelect">
        <md-table-cell md-label="Name">
          {{item.getName().get()}}
        </md-table-cell>

        <md-table-cell md-label="Type">
          {{item.getType().get()}}
        </md-table-cell>
      </md-table-row>
    </md-table>

    <div v-else
         id="div-display-context">
      <h2 id="header-name-context">
        {{selectedContext.getName().get()}}
      </h2>

      <md-button @click="clearContext">
        <md-icon>clear</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import {
  SpinalGraphService,
  SpinalContext
} from "spinal-env-viewer-graph-service";
import bimObjectService from "spinal-env-viewer-plugin-bimobjectservice";

export default {
  name: "chooseContext",
  props: {
    active: {
      type: Boolean,
      required: true
    },
    selectedContext: {
      validator(value) {
        return value instanceof SpinalContext || value === null;
      },
      required: true
    },
    otherContext: {
      validator(value) {
        return value instanceof SpinalContext || value === null;
      },
      required: true
    }
  },
  data() {
    this.graph = SpinalGraphService.getGraph();
    this.bimObjectContextName =
      bimObjectService.constants.BIM_OBJECT_CONTEXT_TYPE;
    return {
      contexts: []
    };
  },
  watch: {
    active: {
      immediate: true,
      handler() {
        if (this.active) {
          this.loadAvailableContexts();
        }
      }
    }
  },
  methods: {
    async loadAvailableContexts() {
      this.contexts = await this.graph.getChildren("hasContext");
      this.contexts = this.contexts.filter(context => {
        const name = context.getName().get();

        return (
          name !== this.bimObjectContextName && context !== this.otherContext
        );
      });
    },
    onSelect(context) {
      this.$emit("choseContext", context);
    },
    clearContext() {
      this.loadAvailableContexts();
      this.$emit("choseContext", null);
    }
  }
};
</script>

<style scoped>
#div-display-context {
  display: flex;
}

#header-name-context {
  width: 100%;
  text-align: center;
}
</style>
