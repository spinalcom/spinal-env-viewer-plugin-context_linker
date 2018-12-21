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
  <md-steppers id="steppers"
               md-vertical
               :md-active-step.sync="activeStep">
    <md-step id="context"
             md-label="Choose context">
      <choose-context :active="activeStep === 'context'"
                      :selected-context="contextConfig.context"
                      :other-context="otherContextConfig.context"
                      @choseContext="choseContext" />
    </md-step>

    <md-step id="type"
             md-label="Choose type">
      <choose-type :active="activeStep === 'type'"
                   :context="contextConfig.context"
                   :selected-type="contextConfig.type"
                   @choseType="choseType" />
    </md-step>

    <!-- <md-step id="key"
             md-label="Choose key">
      <choose-key @choseKey="choseKey" />
    </md-step> -->
  </md-steppers>
</template>

<script>
import ContextConfig from "../js/ContextConfig.js";
import chooseContext from "./chooseContext.vue";
import chooseType from "./chooseType.vue";

export default {
  name: "configureContext",
  props: {
    update: {
      validator(value) {
        return value instanceof String || value === null;
      }
    },
    contextConfig: {
      type: ContextConfig,
      required: true
    },
    otherContextConfig: {
      type: ContextConfig,
      required: true
    }
  },
  components: {
    chooseContext,
    chooseType
  },
  data() {
    return {
      activeStep: ""
    };
  },
  methods: {
    choseContext(context) {
      this.contextConfig.context = context;

      if (context === null) {
        this.contextConfig.type = "";
        this.contextConfig.key = "";
      }
    },
    choseType(type) {
      this.contextConfig.type = type;

      if (type === "") {
        this.contextConfig.key = "";
      }
    }
    // choseKey(key) {
    //   console.log("key:", key);
    // }
  }
};
</script>
