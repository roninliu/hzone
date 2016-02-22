(function() {
    var diaryData = [];
    var getDiarys = function(page, styles, nodes) {
        console.log(page, styles, nodes)
        $.ajax({
            url: "/hzone/diary/getdiarys",
            type: "POST",
            data: {
                page: page,
                style: styles,
                node: nodes
            },
            success: function(result) {
                console.log(result.data.length);
                for (var i = 0; i < result.data.length; i++) {
                    var temp = result.data[i];
                    console.log(temp);
                    diaryData.push(temp)
                }
            }
        })
    }
    var diaryModel = new Vue({
        el: "#js_datalist",
        data: {
            diarys: diaryData
        },
        ready: function() {
            console.log(diaryData);
            getDiarys(1, 171, "p6");
        }
    })
    $(function() {
        console.log(diaryData);
    })
}())