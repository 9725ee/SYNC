sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {

                var oModel = new JSONModel({
                    numlist : []
                });
                this.getView().setModel(oModel,"list");
               
            },

            onRandomPress: function(){
            
                var result = Math.floor(Math.random() * 100) + 1
                this.byId("idInput").setValue(result);

                var aList=this.getView().getModel("list").getProperty("/numlist");
                
                aList.push({value : result});

                this.getView().getModel("list").setProperty("/numlist",aList);
                
            },

            openProducts : function(){
                this.byId("idProductsDialog").open();

            },
            
            onClose: function(oEvent){
                oEvent.getSource().getParent().close();
            },
            
            transformDiscontinued : function(sValue){
               if(sValue == true)
                return "yes" ;
                else    
                return "No";
            },

            fnsrcFormat : function(iconValue){
                if(iconValue >= "15")
                    return 'sap-icon://thumb-up';
                else 
                    return 'sap-icon://thumb-down';
            },

            fnColorFormat : function(colorValue){
                if(colorValue >= "15")
                    return 'rgb(27, 234, 33)';
                else 
                    return 'rgb(234, 52, 27)';
            },

            onValueChange : function(){   
                var vaildation = this.byId("idInput").getValue();
                if(vaildation > 1 && vaildation <= 100 ){
                    
                    
                    var aList=this.getView().getModel("list").getProperty("/numlist");
                    
                    aList.push({value : vaildation});
                    
                    this.getView().getModel("list").setProperty("/numlist",aList);
                    this.byId("idInput").setValueState(sap.ui.core.ValueState.None);
                
                }
                else if(!vaildation) { 
                    this.byId("idInput").setValueState(sap.ui.core.ValueState.None);

                }   
                else {
                    this.byId("idInput").setValueState(sap.ui.core.ValueState.Error);
                    this.byId("idInput").setValueStateText("1이상 100이하의 숫자를 입력하시오.")               
                }
            }
        });
    });
