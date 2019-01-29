var image = ['img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png','img/7.png','img/8.png','img/9.png','img/10.png','img/11.png','img/12.png','img/13.png','img/14.png','img/15.png'];
var y=[];
var img_arr = rand();
var sr = '';
var tr = 0;
var num = 0;
var count = 0;
$('.sc_tm .scor').text(num);
jisht = [];
// var level = 60;
// var downloadTimer = setInterval(function(){
//     $('.sc_tm .level').text(--level);
//     if(level <= 0){
//         $('.sc_tm .level').text(level);
//         clearInterval(downloadTimer);
//         window.location.href = 'end.html';
//     }
//
// },1000);

// ---------------------------------------For Center------------------------
function forCenter() {
    $('.center').empty();
    for(var i=0; i < 10; i++){
        var adddiv=$('<div id = "empty2'+i+'">');
        adddiv.addClass('empty2');
        $('.center').append(adddiv);
        var imgTree = $('<img class="treePhoto">');
        adddiv.append(imgTree);
        imgTree.attr('src', img_arr[i]);
        adddiv.attr('ondrop',"drop(event)");
        adddiv.attr('ondragover',"allowDrop(event)");

    }
}

forCenter();
function rand() {
    for (var i = 0; i < 10; i++) {
        y[i] = image[parseInt(Math.random() * 15)];
        var n = i;
        for (var j = 0; j < n; j++) {
            if (y[j] == y[i]) {
                y[i] = image[parseInt(Math.random() * 15)];
                j = -1;
            }
        }
    }
    return y;
}

// --------------------------------End Center------------------------------




function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// ------------------------For Container----------------------------

function forContainer() {
    $('.container').empty();
    for (var i = 0; i < image.length; i++){
        var makeDiv = $('<div id = "empty'+i+'">');
        makeDiv.addClass('empty');
        $('.container').append(makeDiv);
        var img = $('<img id="photos'+i+'">');
        makeDiv.append(img);
        img.attr('src', image[i]);

        img.attr('draggable',"true");
        img.attr('ondragstart',"drag(event)");
    }

}
forContainer();

// ----------------------------End Container---------------------------

// ########################################## DRAG&DROP######################################

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
$('.container img').on('mousedown',function(){
    sr = this.src;
    dirn = sr.split('/');
    dirn = "img/"+dirn[dirn.length - 1];
//    console.log(dirn);
});
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    a = ev.target;
    th_src = $(a)[0].src;

if (sr == th_src) {
    if (jisht.length == 0) {
        num = num+19;
        count = count+1;
    }else{
        if ($.inArray(dirn, jisht)== -1) {
            count = count + 1;
            num = count*(num+19);
            
        }
    }
    console.log(count);
    $('.sc_tm .scor').text(num);
    image = shuffle(image);
    forContainer();
    $('.container img').on('mousedown',function(){
        sr = this.src;
        dirn = sr.split('/');
        dirn = "img/"+dirn[dirn.length - 1];
    });
    y = shuffle(y);
    forCenter();
    var removeItem = th_src;
    removeItem = removeItem.split('/');
    removeItem = "img/"+removeItem[removeItem.length - 1];
    // jisht.push(removeItem);
    if (jisht.length == 0) {
        jisht.push(removeItem);
    }else{
        if ($.inArray(dirn, jisht)<0) {
            jisht.push(removeItem);
        }
    }
//    console.log(jisht);
//    console.log(dirn);


    for (j=0;j<jisht.length;j++){
        i = $(".empty2 img[src$='"+jisht[j]+"']");
        i[0].style.opacity=1;
        if (jisht.length == 10){
            rand(y);
            forCenter();
            i[0].style.opacity=0.6;
            jisht=[];

        }
    }
}else{
    num = (num-13)/count;
    if(num < 0){
        num = 0;
    }
    $('.sc_tm .scor').text(num);
    ev.preventDefault();
    image = shuffle(image);
    forContainer();
    $('.container img').on('mousedown',function(){
        sr = this.src;
        dirn = sr.split('/');
        dirn = "img/"+dirn[dirn.length - 1];
    });
    y = shuffle(y);
    forCenter();
    for (j=0;j<jisht.length;j++){
        i = $(".empty2 img[src$='"+jisht[j]+"']");
        i[0].style.opacity=1;
    }
    
    // console.log('sxale');
    // console.log(sr);
    // console.log(th_src);
}

}


