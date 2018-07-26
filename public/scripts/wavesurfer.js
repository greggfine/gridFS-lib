// Store the 3 buttons in some object
 var buttons = {
     play: document.getElementById("btn-play"),
     stop: document.getElementById("btn-stop")
 };

 var downloader = document.getElementById("downloader");

 // Create an instance of wave surfer with its configuration
 var Spectrum = WaveSurfer.create({
     container: '#waveform',
     waveColor: '#darkgrey',
     progressColor: '#61892f',
     cursorColor: '#999999',
     height: 44,
     pixelRatio: 1,
     responsive: true,
     scrollParent: false,
    //  barWidth: 3
 });

 var trackTitle = document.getElementById('track-title');
 var current = document.getElementById("current-track");













//  let playState = false;



  function runIt(trackName, data){
    // var curTrack = 'https://immense-atoll-44421.herokuapp.com/audio/' + trackName;
  	var curTrack = 'http://localhost:8080/audio/' + trackName;

    
    // var curTrack = 'http://127.0.0.1:8080/audio/' + trackName;
  	// var curTrack = 'https://vast-dusk-24076.herokuapp.com/audio/' + trackName;
      
      Spectrum.load(curTrack);


      document.getElementById('progress').style.display = 'block';

    Spectrum.on('loading', function (percents) {
        document.getElementById('progress').innerHTML = `${percents}% loading...`;
        // buttons.play.style.color = 'black';

      });  
    Spectrum.on('ready', function (percents) {
        document.getElementById('progress').style.display = 'none';
        // Spectrum.play();
        // playState = true;
        // buttons.play.style.color = 'red';
    });  

    var playState = false;
    buttons.play.classList.remove('fa-pause');
    buttons.play.classList.add('fa-play');



    buttons.play.addEventListener("click", function(e){
        if(!playState){
            playState = true;
            Spectrum.play();
            //  e.target.classList.remove('fa-play')
            e.target.classList.add('fa-pause')
            // e.target.style.color = 'grey'
           //  buttons.stop.disabled = false;
           //  buttons.play.disabled = true;
   
        } else{
           playState = false;
           Spectrum.pause();
           e.target.classList.remove('fa-pause')
           e.target.classList.add('fa-play')
           // e.target.classList.add('fa-play')
           // e.target.style.color = 'grey'
           // e.target.classList.remove('fa-play')
           // buttons.play.disabled = false;
        }
    });
   
    buttons.stop.addEventListener("click", function(){
        playState = false;
        Spectrum.stop();
        buttons.play.classList.remove('fa-pause')
        buttons.pause.classList.add('fa-play')
       //  buttons.play.disabled = false;
       //  buttons.stop.disabled = true;
       //  buttons.play.style.color = 'black';
    }, false);
   
    
    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.addEventListener('input', function(e){
        Spectrum.setVolume(e.target.value);
    })



	downloader.setAttribute('href', curTrack);
    trackTitle.innerHTML = data;
    
  }






   
 window.onload = function(){
     // Spectrum.load('https://immense-atoll-44421.herokuapp.com/audio/' + current.value);
     Spectrum.load('http://localhost:8080/audio/' + current.textContent)
 
     // Spectrum.load('http://127.0.0.1:8080/audio/' + current.value)
     // Spectrum.load('https://vast-dusk-24076.herokuapp.com/audio/' + current.textContent)
     trackTitle.innerHTML = current.textContent;
     downloader.setAttribute('href', 'http://localhost:8080/audio/' + current.textContent);

     buttons.play.classList.add('fa-play');
 }
 


   // If you want a responsive mode (so when the user resizes the window)
 // the spectrum will be still playable
 window.addEventListener("resize", function(){
    // Get the current progress according to the cursor position
    var currentProgress = Spectrum.getCurrentTime() / Spectrum.getDuration();


    // Set original position
    Spectrum.seekTo(currentProgress);

    // buttons.pause.disabled = true;
    // buttons.play.disabled = false;
    // buttons.stop.disabled = false;
}, false);


