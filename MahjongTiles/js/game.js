/*jslint browser: true*/
/*global $, alert*/

//ready
$(function(){
    
    //preparing the deck with two cards of each type
    var deck=["img/1.png","img/1.png","img/2.png","img/2.png","img/3.png","img/3.png","img/4.png","img/4.png","img/5.png","img/5.png","img/6.png","img/6.png","img/7.png","img/7.png","img/8.png","img/8.png"];
    
    var clicked = -1;
    var prevClicked = -1;
    var timer=0;
    var count = 0;
    var stars=3;
    var flag=1;
    var tempClicked=0;
    var wait=false;
    var isPaused=false
    var shuffled=new Array(16);
    var temp=new Array(16);
    var done=new Array(16);
    done.splice(0, done.length);
    shuffled.splice(0, shuffled.length);
    temp.splice(0, temp.length);
    
    
    //Shuffling the deck
    for(var i=0;i<16;i++){
        var x = Math.floor(Math.random() * 16);
        if(temp.indexOf(x)>-1){
            i--;
            continue;
        }
        temp[i]=x;
        shuffled[i] = deck[temp[i]];
    }
    setTimeout(function(){
        alert("Deck Shuffled !!\nClick OK to start...\n\nBest Of Luck !!");
    }, 100);
    
    setInterval(function(){
        if(!isPaused) {
            ++timer;
            $("#timer").html(timer);
        }
    },1000);
    
    
    //User clicks a card
    $("td").click(function(){
        if(wait===false){
            flag=1;
            tempClicked = parseInt(this.id);
            
            for(i in done){
                if(done[i]==tempClicked){
                    alert("The card is already won !!");
                    flag=0;
                }
            }
            
            if(flag!=0){ //if an already WON CARD is not clicked
                ++count;
                if(count%2===0){


                        prevClicked=clicked;   
                }
                else{
                    prevClicked=-1;
                }
                clicked = tempClicked;
                flag=1;

                $("#"+clicked).css("background-image", 'url('+shuffled[clicked]+')');
                $("#"+clicked).css('background-size', '100% auto');
                $("#"+clicked).css('background-repeat', 'no-repeat');

                //check if two consecutive clicks are on the same card
                if(clicked===prevClicked){
                    alert("The card is already revealed !!");
                    flag=0;
                    --count;
                }
                /*check if click is on a card already won
                else{
                    for(i in done){
                        if(done[i]==clicked){
                            alert("The card is already won !!");
                            flag=0;
                            --count;
                        }
                    }
                }*/

                //redduce stars on condition match
                if(flag!=0){
                    if(count==25){
                        $("#s3").css('opacity','0.5');
                        stars=2;
                    }

                    if(count==33){
                        $("#s1").css('opacity','0.5');
                        stars=1;
                    }

                    //check if two consecutive clicks match
                    if(shuffled[clicked]===shuffled[prevClicked]){
                        done.push(prevClicked)
                        done.push(clicked);
                        var audioElement = document.createElement('audio');
                        audioElement.setAttribute('src', 'sounds/sound.wav');
                        audioElement.play();
                        if(done.length==16){
                            isPaused=true;
                            setTimeout(function(){
                                alert("Hurray!! You Won...\n\nStar rating: "+stars+" stars.\nTime taken: "+timer+" seconds.\n\nPress RESET button to replay...");
                            },100);

                        }
                        clicked=-1;
                        flag=1;
                    }

                    //turn back the clicked cards after a pair of failed card turns
                    else if(count%2==0 && clicked!=-1){
                        wait=true;
                        $("td").off("click",function(){});
                        setTimeout(function(){
                            $("#"+clicked).css("background-image", 'url(img/cardBg.jpg)');
                            $("#"+clicked).css('background-size', '100% auto');
                            $("#"+prevClicked).css("background-image", 'url(img/cardBg.jpg)');
                            $("#"+prevClicked).css('background-size', '100% auto');
                            wait=false;
                            $("td").on("click");
                        }, 750); //time delay to stop player from cliking in between the turnings
                    }
                    $("#moves").html("MOVES: "+count);
                }
            }
        }
    });

    //reset the game
    $("#reset").click(function(){
        clicked=-1;
        prevClicked=-1;
        count=0;
        timer=0;
        isPaused=false;
        flag=1;
        stars=3;
        wait=false;
        $("td").on("click");
        temp.splice(0, temp.length);
        done.splice(0, done.length);
        for(i=0;i<16;i++){
            x = Math.floor(Math.random() * 16);
            if(temp.indexOf(x)>-1){
                i--;
                continue;
            }
            temp[i]=x;
            shuffled[i] = deck[temp[i]];
        }
        for(i=0;i<16;i++){
            $("#"+i).css("background-image", 'url(img/cardBg.jpg)');
            $("#"+i).css('background-size', '100% auto');
        }
        $("#s3").css('opacity','1');
        $("#s1").css('opacity','1');
        alert("Deck Shuffled !!\nClick OK to start...\n\nBest Of Luck !!");
    });
});