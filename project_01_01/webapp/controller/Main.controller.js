sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button,JSONModel) {
        "use strict";

        return Controller.extend("project0101.controller.Main", {
            onInit: function () {
                var oJsonData = {
                    title: {
                        subTitle : 'Calculator Program'
                    },
                    list : [
                        {"key" : "plus", "text":"+", "additionalText":"plus"},
                        {"key" : "minus", "text":"-", "additionalText":"minus"},
                        {"key" : "multipl", "text":"*", "additionalText":"multipl"},
                        {"key" : "divid", "text":"/", "additionalText":"divides"}
                    ]
                };
               
                this.getView().setModel(new JSONModel(oJsonData),"oJSONModel");

                //이름이 있는 모델의 경우, 경로 및 이름을 객체 형태로 전달한다.
                this.byId("idTitle").bindElement({
                    path : '/title',
                    model :'oJSONModel'
                });

                // var test = {
                //     history : [
                //         {"num1" : "1", "oper" : "+", "num2" : "1", "result" : "2"}

                //     ]
                // }
                // this.getView().setModel(new JSONModel(test),"local");


                this.getView().setModel(new JSONModel(oJsonData));
                this.getView().setModel(new JSONModel({
                    history : [
                        { num1 : 1, oper :'+', num2 : 1, result : 2}
                    ]
                }),'local');
                

            

                // new sap.m.Button
                // new Button

                // 초기화 함수
                // 초기값 설정, 화면에서 사용할 모델 생성
                // 아래 함수들이 사용할 공통 변수 등등 세팅

                //this.byId("idInput").setValue("10") //화면 뜨자마자 초기 세팅
                //this.byId("oInput").setValue("20") //화면 뜨자마자 초기 세팅
                // this.getView().byId("idInput")
                // => idInput 객체가 없다고 오류가 날 수 있음 (빈도수는 낮음)
                // => 왜냐면, 화면이 아직 그려지기 전에 Init 함수가 실행해서
                //    타이밍이 맞지 않을 수 있기 때문
                // => onAfterRendering 등 화면 그려진 후에 로직을 실행할 수 있도록 설정

                // this.getOwnerComponent().getModel()
                // => Component 단으로 올라가기 위해서 
                //    getOwnerComponent() 를 사용
            },

            //local 모델의 result 값에 따라서
            //포멧터 함수를 적용할 수 있다. 
            // result 값이 100초과면 초록색, 아니면 빨간색을 반환한다.
            fnColorFormat : function(sValue) {
                if(sValue) {
                    if(sValue > 100) {
                        return '#1DDB16'
                    } else {
                        return '#FF5E00'
                    }
                }

            },

            onBeforeRenddering : function()  {/* 화면 그려지기 전 실행 */},
            onAfterRendering : function()  {/* 화면 그려지기 후 실행 */},
            onExit: function() {/* 화면 종료되면 실행 */},

            onClick: function () {
                //  View에 있는 Input 객체를 가져온다
                var oInput = this.getView().byId("idInput");


                //this : Controller
                //.getView() : Controller 에 있는 메서드
                // .byId() : view 에 있는 메서드
                // .getValue() : Input에 있는 메서드

                var sValue = oInput.getValue();

                //어떻게 해야 Input의 value 값을 가져와서 출력할 수 있을까 ?
                alert(sValue);
            },

            oClick: function() {
                var value1 = Number(this.getView().byId("idInput").getValue());
                var value2 = Number(this.getView().byId("oInput").getValue());
                var oSelect = this.getView().byId("oSelect");
                
                
               
                var item = oSelect.getSelectedItem().getText();

                var a 
                switch (item) {
                    case "+" :
                        a = value1 + value2 ;
                        break ;
                    
                    case "-" :
                        a = value1 - value2 ;
                        break ;

                    case "*" :
                        a = value1 * value2 ;
                         break ;
                         
                    case "/" :
                        a = value1 / value2 ;
                        break ;
                    
                    
                }

               sap.m.MessageToast.show(a) ;

                var test = {"num1" : value1, "oper" : item, "num2" : value2, "result" : a}
                var data = this.getView().getModel('local').getProperty("/history")
                data.push(test)
                this.getView().getModel('local').setProperty("/history",data);
                // var data = this.getView().getModel('local').getData().history ;
                // data.push(test);
                // this.getView().getModel('local').setData(history, true);



                //    var test = {
                //     history : [
                //         {"num1" : value1, "oper" : item, "num2" : value2, "result" : a}
                //     ]
                // }
                // this.getView().setModel(new JSONModel(test),"local");
            }
        });
    });
