document.addEventListener("DOMContentLoaded", () => {
console.log("Welcome to Spotify");

//initialize the variables
let songIndex=0;
let audioElement= new Audio('Songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let MastersongName=document.getElementById('MastersongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs=[
    {Songname:"Warriyo - Mortals [NCS Release]", filepath:"1.mp3",coverpath:"Cover/1.webp"},
    {Songname:"Cielo - Huma-Huma", filepath:"Songs/2.mp3",coverpath:"Cover/2.jpg"},
    {Songname:"DEAF KEV - Invincible [NCS Release]-320k", filepath:"Songs/3.mp3",coverpath:"Cover/3.jpg"},
    {Songname:"Different Heaven & EH!DE - My Heart [NCS Release] ", filepath:"Songs/4.mp3",coverpath:"Cover/4.jpg"},
    {Songname:"Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filepath:"Songs/5.mp3",coverpath:"Cover/5.jpg"},
    {Songname:"Rabba - Salam-e-Ishq", filepath:"Songs/6.mp3",coverpath:"Cover/6.jpg"},
    {Songname:"Sakhiyaan - Salam-e-Ishq", filepath:"Songs/7.mp3",coverpath:"Cover/7.jpg"},
    {Songname:"Bhula Dena - Salam-e-Ishq", filepath:"Songs/8.mp3",coverpath:"Cover/8.jpg"},
    {Songname:"Tumhari Kasam - Salam-e-Ishq", filepath:"Songs/9.mp3",coverpath:"Cover/9.jpg"},
    {Songname:"Na Jaana - Salam-e-Ishq", filepath:"Songs/10.mp3",coverpath:"Cover/10.jpg"}

]



songItems.forEach((element,i)=> {
   
    element.getElementsByTagName("img")[0].src= songs[i].coverpath;
    element.getElementsByClassName("Songname")[0].innerText= songs[i].Songname;
});

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity =0;
    }
    }
);

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update seekbar
    let progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
});
//For updating the progress bar with the song i.e we can stretch and can listen the music at any timestamp.
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});
//this is for keeping all the play buttons in playale mode
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
});
}
//for each respective songs play buttons
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        
        songIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        MastersongName.innerText= songs[songIndex].Songname;
        audioElement.src=`Songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity =1;
        //for master play button 
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

    })
});

//for forward buttons
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`Songs/${songIndex+1}.mp3`;
    MastersongName.innerText= songs[songIndex].Songname;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity =1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

//for the next button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`Songs/${songIndex+1}.mp3`;
    MastersongName.innerText= songs[songIndex].Songname;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity =1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

});

