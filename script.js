var ccnt=0;
var gamerunning=1,mtime=0,prev=0,newcard=0,all=1;
var winsound = new Audio("audio/win.mp3");
var right = new Audio("audio/right.mp3");
var wrong = new Audio("audio/wrong.mp3");

var time=new Date();
$(document).ready(function()
{
    timer();
    arr=setCards();
    console.log(arr);
    var cardimages=document.getElementsByClassName("cardimage");
    for (var img = 0; img < cardimages.length ; img++) 
    {
       $(cardimages[img]).attr("src","images/card.png")
    }

});

function clicked(e)
{
    prev=newcard;
    newcard = $(e).attr("id");
    if(arr[prev-1]==arr[newcard-1])
    {
         setTimeout(function(){
            $("#"+prev).find("img").attr("src","images/done.png")
            $("#"+prev).addClass("animate__flipInY");
         },700);
         setTimeout(function(){
             $("#"+newcard).find("img").attr("src","images/done.png")
             $("#"+newcard).addClass("animate__flipInY");
             updcomp();
             win();
         },700);
         right.play();
        
    }
    else
    {
        if(prev!=0)
        {
            if(!(($("#"+prev).find("img").attr("src")=="images/done.png")||($("#"+newcard).find("img").attr("src")=="images/done.png")))
            {
                setTimeout(function(){
                $("#"+prev).find("img").attr("src","images/card.png")
                $("#"+prev).addClass("animate__flipInY");
             },700);
             setTimeout(function(){
                 $("#"+newcard).find("img").attr("src","images/card.png")
                 $("#"+newcard).addClass("animate__flipInY");
                 prev=0;
            newcard=0;
             },700);
             wrong.play();
            }
        }
    }
    classname=$(e).find("img").attr("src");
    if(classname=="images/card.png")
    {
    	$(e).addClass("animate__flipInY");
    	setTimeout(function(){ 
    		$(e).removeClass("animate__flipInY");
    		 }, 500);
        var id=$(e).attr("id");
        $(e).find("img").attr("src","images/"+arr[id-1]+".png")
        ccnt=ccnt+1;
        $("#turns").text(('0'+ccnt).slice(-2));


    }
    
}




function timer()
{
        setInterval(function(){
            if(gamerunning==1)
            {
                 var nowtime = new Date();
            timerem=nowtime-time;
            timerem=Math.round(timerem/1000);
            mtime=Math.floor(timerem/60);
            timerem=timerem%60;
            $("#min").text(('0' + mtime).slice(-2));
            $("#sec").text(('0' + timerem).slice(-2)); 
            } 
         },1000)
        
    
}

function win()
{
    all=1;
    var cardimages=document.getElementsByClassName("cardimage");
    for (var img = 0; img < cardimages.length ; img++) 
    {
       if($(cardimages[img]).attr("src")!="images/done.png")
       {
        all=0;
        break;
       }
    }
    if(all===1)
    {
        gamerunning=0;
        winsound.play();
        $(".wincupdiv").css("display","block");
        confetti.start(3000);
        
    }
    
}

function setCards()
{
    var arr=[];
    var i=0,icount=0;
    
    while(arr.length<=11)
    {
        i=Math.floor(Math.random() * 6)+1;
        icount=0;
        for (var c = 0;c<arr.length;c++) 
        {
            if(arr[c]==i)
                icount=icount+1;
        }
        if(icount<2)
            arr.push(i)
    } 
    return arr;
}

function reload()
{
    location.reload();
}



function updcomp()
{
    var comp=0;
    var cardimages=document.getElementsByClassName("cardimage");
    for (var img = 0; img < cardimages.length ; img++)
    {
       if($(cardimages[img]).attr("src")=="images/done.png")
       {
        comp=comp+1;
       }
    }
    var per=Math.ceil((comp*100)/12);
     $("#comp").text(per+"%");   
}