sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("project0199.controller.Main", {
            onInit: function () {
                var oData = {
                    list : [{key : "PLUS", text : "+"},
                            {key : "MINUS", text : "-"},
                            {key : "MULTIPLY", text : "*"},
                            {key : "DIVIDE", text : "/"},

                    ]
                };

                var oModel = new JSONModel(oData);
                
                this.getView().setModel(oModel,"op");

                var oData2= { 
                        list : []
                }

                var oModel2 = new JSONModel (oData2);
                this.getView().setModel(oModel2, "history");

    

            },

            onCalc:function(){

                //view에 있는 클래스 객체 호출
                var oInput1 = this.getView().byId("idInput1"); //o객체자체
                var oInput2 = this.getView().byId("idInput2");

                // 각 객체에 있는 값 얻기
                var sInput1 = oInput1.getValue();  //s스트링 타입의 변수(뒤에오는 변수 타입)
                var sInput2 = oInput2.getValue();

                //기존에 스트링타입인 변수를 계산 가능한 정수형으로 형 변환
                var iInput1 =Number(sInput1);
                var iInput2 =Number(sInput2);

                // alert(iInput1 + iInput2);
                // select 객체 정보 가져오기
                var oSelect = this.getView().byId("idSelect"); 
                //getSelectedKey 를 통해서 view에서 설정한 key 값 가져오기
                var sSelectedKey = oSelect.getSelectedKey();
                var sSelectedText = oSelect.getSelectedItem().getText();
                // var sSelectedText2 = oSelect.getSelectedItem().mProperties.text;
               
                var Result;
                switch(sSelectedKey){
                    case 'PLUS': 
                        Result = iInput1 + iInput2;    
                        break;        
                    case 'MINUS': 
                        Result = iInput1 - iInput2;
                        break;                   
                    case 'MULTIPLY':
                        Result = iInput1 * iInput2;
                        break;
                    case 'DIVIDE':
                        Result = iInput1 / iInput2;
                        break;
                    default : 

                    
                }
                
                var aList=this.getView().getModel("history").getProperty("/list");
                aList.push({
                    num1 : iInput1,
                    num2 : iInput1,
                    oper : sSelectedText,
                    result :Result
                })
                this.getView().getModel("history").setProperty("/list",aList);



            }
        });
    });
