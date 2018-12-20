import Vue from "vue";

import {
  SpinalForgeExtention
} from "spinal-env-viewer-panel-manager-service_spinalforgeextention";

import panel from "./vue/panel.vue";

const extention = SpinalForgeExtention.createExtention({
  name: "context_linker",
  vueMountComponent: Vue.extend(panel),
  panel: {
    title: "Link 2 Contexts",
    classname: "context-linker",
    closeBehaviour: "hide"
  },
  style: {
    left: "405px",
    width: "420px",
    height: "80vh"
  },
  onLoad() {},
  onUnLoad() {}
});

export default extention;
