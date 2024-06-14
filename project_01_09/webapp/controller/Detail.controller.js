sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odata.project0109.controller.Detail", {
           
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteOrders").attachPatternMatched(this._onPatternMatched, this);
            },

           
            _onPatternMatched : function(oEvent){
                var aArgu = oEvent.getParameters().arguments;  // { OrderID : 10248 }
                // this.byId("textID").setText(aArgu.OrderID);
    
                // "/EntitySetName(key='1", key2='2')"
                // "/EntitiySetName('1')"
                // "/Orders(10248)"
                this.byId("idForm").bindElement(`/Orders(${aArgu.OrderID})`); 
            }
        });
    });
