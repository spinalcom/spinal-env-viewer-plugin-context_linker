import {
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";
import {
  SpinalForgeExtention
} from "spinal-env-viewer-panel-manager-service_spinalforgeextention";
import {
  spinalPanelManagerService
} from "spinal-env-viewer-panel-manager-service";
import GeographicContextService from "spinal-env-viewer-context-geographic-service";

import extention from "./extention";

SpinalForgeExtention.registerExtention("context_linker", extention);

class GenerateGeoContextApp extends SpinalContextApp {
  constructor() {
    super("Link 2 contexts", "Links 2 contexts", {
      icon: "link",
      icon_type: "in",
      backgroundColor: "rgba(0, 0, 0, 0)",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    const context = option.selectedNode;

    if (
      context.type.get() === GeographicContextService.constants.CONTEXT_TYPE
    ) {
      return Promise.resolve(true);
    }

    return Promise.resolve(-1);
  }

  action(option) {
    spinalPanelManagerService.openPanel("context_linker", option);
  }
}

export default GenerateGeoContextApp;
