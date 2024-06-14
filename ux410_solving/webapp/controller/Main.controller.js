sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter", 
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);

                var oData = {
                    list : [
                          {type : "bar"},
                          {type : "column"},
                          {type : "line"}, 
                          {type : "donut"}       
                    ]
                };
                this.getView().setModel(new JSONModel(oData), 'typeList');
             
            },
            _onPatternMatched : function(oEvent){
                var aArgu = oEvent.getParameters().arguments;
                
                this.byId("SimpleFormID").setText();
    
            },
            onSearch:function(){
                
                var oSearchData = this.byId("idCombobox").getValue();
                
                var aFilter = [];

                if(oSearchData){
                    aFilter.push( 
                        new Filter ({
                            path : 'OrderID',
                            operator : 'EQ',
                            value1 : oSearchData
                    }));
                }

                this.byId("idDataset").getBinding('data').filter(aFilter) ;

                var select = this.byId("idCombobox2").getValue();

                var aFilter = [];
                
                if(select){
                    this.byId("idChart").setVizType(select);

                }
                else {
                    this.byId("idCombobox2").setValueState("Error");
                }


            },

            /* Vizframe의 selectData 이벤트 발생 시 실행 */
            onGoDetail : function(oEvent){
                var oParam = oEvent.getParameters();
                // oParam 안에서 어떤 값을 가져와야 OrderID, ProductID 를 얻을 수 있을지 확인
                // 콘솔창에서 찾기!!
                // console.log(oParam.data[0].data);

                var oSelectData = oParam.data[0].data

                this.oRouter.navTo('RouteDetail', {
                    key1 : oSelectData.OrderID, // oSelectData.OrderID
                    key2 : oSelectData.ProductID  // oSelectData.ProductID
                }, true);
                

            }

            

        });
    });
