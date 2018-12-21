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
  <div v-if="leftContext && rightContext"
       id="panel-container">
    <div id="dual-setting">
      <configure-context class="context-setting"
                         :update="update"
                         :context-config="leftContext"
                         :other-context-config="rightContext" />
      <configure-context class="context-setting"
                         :update="update"
                         :context-config="rightContext"
                         :other-context-config="leftContext" />
    </div>

    <link-context id="footer-confirm"
                  :update="update"
                  :left-context="leftContext"
                  :right-context="rightContext" />
  </div>
</template>

<script>
import { SpinalGraphService } from "spinal-env-viewer-graph-service";

import ContextConfig from "../js/ContextConfig.js";
import configureContext from "./configureContext.vue";
import linkContext from "./linkContext.vue";

export default {
  name: "panel",
  components: {
    configureContext,
    linkContext
  },
  data() {
    return {
      update: null,
      leftContext: null,
      rightContext: null
    };
  },
  methods: {
    opened(option) {
      this.update = new String("opened");
      this.leftContext = new ContextConfig(
        SpinalGraphService.getRealNode(option.context.id.get())
      );
      this.rightContext = new ContextConfig();
    },
    closed() {
      this.update = new String("closed");
    },
    removed() {}
  }
};
</script>

<style scoped>
#panel-container {
  width: 100%;
  height: 100%;
}

#dual-setting {
  width: 100%;
  height: 80%;
  display: flex;
}

.context-setting {
  width: 50%;
  height: 100%;
  overflow: auto;
}

#footer-confirm {
  width: 100%;
  height: 20%;
}
</style>

