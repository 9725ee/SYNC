sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0116.controller.Main", {
            onInit: function () {
                // this.byId("idimage").setSrc(_rootPath+"/image/chi.jpg");
            },
            setImageUrl:function(sValue){
                return `${_rootPath}/image/${sValue}.jpg`;
            }
        });
    });
