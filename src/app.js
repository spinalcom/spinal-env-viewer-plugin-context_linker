import {
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";
import GeographicContextService from "spinal-env-viewer-context-geographic-service";

class GenerateGeoContextApp extends SpinalContextApp {
  constructor() {
    super("Link 2 contexts", "Links 2 contexts", {
      icon: "build",
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
    console.log("hello world");
  }
}

export default GenerateGeoContextApp;
