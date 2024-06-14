sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0103.controller.Main", {
            onInit: function () {

            },

            onClick: function() {
                
                var inputValue=this.byId("idInput").getValue();
                this.byId("idtext").setText(inputValue);
            },

            onClickReset: function() {
                var oInput = this.getView().byId("idInput") 
                var inputValue=oInput.setValue("");
                var text = this.getView().byId("idtext")

                text.setText("");



            }
            
        });
    });
