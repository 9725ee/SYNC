sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("project0107.controller.Main", {
            onInit: function () {
                // var oData  = {
                //      name : 'Hong Gil Dong', 
                //      age : 20,
                //      titlle : 'Gildong`s page'
                // };
                // var oModel = new JSONModel(oData);

                var oModel1 = new JSONModel({inpValue:'World'});
                var oModel2 = new JSONModel({textValue:'Hello'});

                // var oModel = new JSONModel({
                //     textValue : "Hello",
                //     "name":{
                //             "firstName" : "Hong",
                //             "lastName" : "Gildong"
                //     },
                //     "datas" :[
                //         {"name" : "Kim", "age":30, "tel" : "010-2222-6811"},
                //         {"name" : "Park", "age":10, "tel" : "010-3333-1324"},
                //         {"name" : "Moon", "age":20, "tel" : "010-5555-8621"}
                //     ]
                // });
                // // oModel.loadData("../model/data.json", {}, false);

                
                // console.log(oModel.getData());
                
                this.getView().setModel(oModel1);
                //View에 JSON 모델(이름 없음 = 기본 모델 = Default Model)을 세팅한다 
                this.getView().setModel(oModel2,'test');


              

                // car라는 이름의 모델
                //this.getView().setModel(모델객체, "car") 

            },

                onClick : function() {
                    var oModel = this.getView().getModel("test");
                    var data = oModel.getData();
                    var data2 = oModel.getProperty("/name/firstname");

                    // 데이터 가져온 후, 데이터 핸들링

                    // oModel.setData({ name : 'Hong Gildong'});
                    oModel.setProperty("/name/firstName", "Park");

                    console.log(oModel.getData());

                  
            //     // Model 가져오기 => getModel('이름')
            //     var oModel = this.getView().getModel("local");

            //     // oModel.getData();  // 전체 데이터 가져오기
            //     // oModel.getProperty('/');  // 경로 지정하여 가져오기

            //     oModel.getData().history // 전체 데이터 가져온 후 history 얻기
            //     oModel.getProperty('/history'); // history 데이터만 가져오기
                
            //     // oModel.setData(세팅할 데이터, 합치기 여부);  // 기존에 있던 애들 다 날라가고 덮어쓰기 됨
            //     oModel.setData({name : 'okok'}, true ); 마지막 프로포티에 true넣으면 덮어쓰기 안됨
            
            //    // oModel.setProperty(대상경로, 바꿀 값) 
            //     oModel.setProperty("/name","okok"); 

                },
                onSetData: function(oEvent){
                    var oModel = this.getView().getModel(); //기본모델 호출
                    var oTestModel = this.getView().getModel('test');
                    // var sInputData = oModel.getProperty("/inpValue");
                    var sInputData = oModel.getData().inpValue;
                    console.log(sInputData); //콘솔창에 로그찍기


                    oTestModel.setData({textValue : "Hello"+sInputData},true) ; // setData로 했을 때 
                    //oTestModel.setProperty("/textValue", "Hello" + sInputData) ; //setProperty로 했을 때

                    /* 
                        oTestModel에 있는 textValue 데이터 변경
                            변경된 데이터 : "Hello + <Input입력값>""
                        *setProperty 또는 setData 사용해서 적용할 수 있음 !

                        .setProperty("/경로", 변경할 값) ;
                        .setData(변경할객체정보, 합치기여부true/false) ;

                    */

                    //var obj = {ket : value} ===> obj.key

                
                    
                }
        });
    });
