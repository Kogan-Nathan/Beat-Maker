class DrumKit{
    constructor(){
        this.playButton = document.querySelector('.play')
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.currentKick = './allSounds/kick-classic.wav';
        this.currentSnare = './allSounds/snare-acoustic01.wav';
        this.currentHihat = './allSounds/hihat-acoustic01.wav';
        this.index=0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteButtons = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad(){
        this.classList.toggle('active')
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //Loop over teh pads
        activeBars.forEach(bar=>{
            bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
            //Check if pads are active
            if (bar.classList.contains('active')) {
                //Check each sound
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++   
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        //Check  if it's playing
        if (this.isPlaying) {
            //clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
        else{
            this.isPlaying = setInterval(()=>{
                this.repeat();
            }, interval);
        }
    }
    updateButton(){
        if (this.isPlaying) {
            this.playButton.innerText = "Play";
            this.playButton.classList.remove("active");
        }
        else{
            this.playButton.innerText = "Stop"; 
            this.playButton.classList.add("active");
        }
    }
    changeSound(event){
        const selectionName = event.target.name;
        const selectionValue = event.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue
                break;
            default:
                break;
        }
    }
    mute(event){
        const muteIndex = event.target.getAttribute('data-track');
        event.target.classList.toggle("active");
        if(event.target.classList.contains('active')){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(event){
        const tempoText= document.querySelector(".tempo-number");
        tempoText.innerText = event.target.value;
    }
    updateTempo(event){
        this.bpm = event.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playButton = document.querySelector(".play");
        if(playButton.classList.contains("active")){
            this.start();
        }
    }
}

const drumKit = new DrumKit();


//EventListeners
drumKit.pads.forEach(pad=>{
    pad.addEventListener('click', drumKit.activePad)
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    });
});

drumKit.playButton.addEventListener('click', function(){
    drumKit.updateButton();
    drumKit.start();
});

drumKit.selects.forEach(select=>{
    select.addEventListener('change', function(event){
        drumKit.changeSound(event);
    })
});

drumKit.muteButtons.forEach(muteButton=>{
    muteButton.addEventListener('click', function(event){
        drumKit.mute(event);
    })
});

drumKit.tempoSlider.addEventListener('input', function(event){
    drumKit.changeTempo(event);
});

drumKit.tempoSlider.addEventListener('change', function(event){
    drumKit.updateTempo(event);
});
