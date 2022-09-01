const textarea=document.querySelector('#text')
let voicelist=document.querySelector('#voice')
let speechbtn=document.querySelector('.submit')

let synth=speechSynthesis
let isSpeaking=true
function voiceserach(){
    for(let voice of synth.getVoices()){
        let option=document.createElement('option')
        option.text=voice.name
      voicelist.add(option)
      console.log(option)
    }
}
synth.addEventListener('voiceschanged',voiceserach)

function texttoSpeech(text){
    let utternace = new SpeechSynthesisUtterance(text)
    for(let voice of synth.getVoices()){
        if(voice.name===voicelist.value){
            utternace.voice=voice
        }
    }
    speechSynthesis.speak(utternace)
}
speechbtn.addEventListener('click',(e) => {
    e.preventDefault()
    if(textarea.value != ''){
 if(!synth.speaking){
    texttoSpeech(textarea.value)
 }
 if(textarea.value.length>80){
    if(isSpeaking){
        synth.resume()
        isSpeaking=false
        speechbtn.innerHTML='Pause Speech'
    } else{
        synth.pause()
        isSpeaking=true
        speechbtn.innerHTML='Resume Speech'
    }
    setInterval(() => {
       if(!synth.speaking && !isSpeaking){
        isSpeaking=true
        speechbtn.innerHTML='convert to speech'
       } 
    });
 }  else {
    speechbtn.innerHTML="convert to Speech"
 }
    }
})