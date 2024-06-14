sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("bom.controller.Main", {
            onInit: function () {

            },
            setImageUrl:function(sValue){
                return `${_rootPath}/image/${sValue}.jpg`;
            }  
        });
    });
