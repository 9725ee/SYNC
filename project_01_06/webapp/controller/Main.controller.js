sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("project0106.controller.Main", {
            onInit: function () {

            },
            
            // HelloFrag.fragment.xml 안에 있는 press 이벤트
            HelloButtonPress : function(){
                sap.m.MessageToast.show(",^_^,")
            },

            onOpenDialog:function(){
                this.byId("idDialog").open();
            },

            onClose:function(oEvent) {
                oEvent.getSource().getParent().close()
                // sap.ui.getCore().byId("idDialog").close();
            },

            //Controller 내에서 Dialog Fragment 호출하기
            onOpenDialog_con:function(){
                var dialog = sap.ui.getCore().byId("idDialog");

                
                //조건문 if문을 사용하여 파일을 1번만 load 할 수 있도록 함

                //만약에, dialog 변수에 값이 있으면 dialog.open()하면 되고 
                //dialog 변수에 값이 없으면 load 메서드를 실행한다.

                if (!dialog){
                    Fragment.load({
                    name : "project0106.view.fragment.Dialog",
                    type : "XML",
                    controller : this
                }).then(function(oDialog) {
                    oDialog.open();
                });
            } else{ 
                dialog.open();
            }
        },

            onOpenName:function(){
                var nDialog = sap.ui.getCore().byId("nameDialog");

                if (!nDialog){
                    Fragment.load({
                    name : "project0106.view.fragment.Name",
                    type : "XML",
                    controller : this
                }).then(function(oDialog) {
                    oDialog.open();
                });
            } else{ 
                nDialog.open();
            }
           }
            
            });
        });
   