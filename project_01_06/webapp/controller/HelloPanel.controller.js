sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0106.controller.HelloPanel", {
            onInit: function () {

            },

            onShowHello : function(){
               sap.m.MessageToast.show('안뇽^.^');
            }


        });
    });
