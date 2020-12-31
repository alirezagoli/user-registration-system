/**
 * Created by Alireza on 10/21/2016.
 */

        $('#sendServer').click(function(){
            var dataArr = [];
            var obj= {};
            var flag=0;
            $("td").each(function(){
                //dataArr.push($(this).html());
                if(flag==0)
                {
                    obj.email=$(this).html();
                    flag=1;
                }
                else if(flag==1)
                {
                    obj.homeAccess=$(this).html();
                    flag=2;
                }
                else if(flag==2)
                {
                    obj.managementAccess=$(this).html();
                    dataArr.push(obj);
                    flag=0;
                    obj={};
                }

            });

            var JSONObject = encodeURIComponent( JSON.stringify(dataArr));
            console.log(dataArr);
            $.ajax({
                type : "POST",
                url : 'http://127.0.0.1:3000/users/management',
                data : "content="+JSONObject,
                success: function(data) {
                   // alert(data);// alert the data from the server
                },
                error : function() {
                }
            });
        });

function  changeState(o) {
    if(o.innerHTML=='false'){
        o.innerHTML='true';
    }
    else {
        o.innerHTML = 'false';
    }
}