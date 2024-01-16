import React, { useEffect } from "react";

let stopButton = false;

const playNextSound = (currentSoundIndex, soundClip) => {
  console.log("after the stopbutton:",stopButton)
  if (!stopButton) {

    const audio = new Audio(soundClip[currentSoundIndex]);

    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });

    audio.onended = () => {
      currentSoundIndex = (currentSoundIndex + 1) % soundClip.length;
      playNextSound(currentSoundIndex, soundClip);
    };
  }
};

const SoundPlayer = () => {
  const soundClip = ["/do.mp3", "/co.mp3", "/mo.mp3"];

  useEffect(() => {
    playNextSound(0, soundClip);

    return () => {
      // Cleanup logic if needed
    };
  }, [stopButton]);

  const playSound = (index) => {
    stopButton = true;
    setTimeout(() => {  
      const audio = new Audio(soundClip[index]);
      audio.play().catch(error => {
      console.error('Error playing sound:', error);
        
      });
      
    }, 1500);
  
  };

  const stopAllSounds = () => {
    stopButton = true;
  };

  const playAllSounds = () => {
    stopButton = false;
    playNextSound(0, soundClip);
  };

  return (
    <div>
      {soundClip.map((clip, i) => (
        <div key={i}>
          <button onClick={() => playSound(i)}>Play Sound {i}</button>
        </div>
      ))}
      <div>
        <button onClick={playAllSounds}>Play All Sounds</button>
        <button onClick={stopAllSounds}>Stop All Sounds</button>
      </div>
    </div>
  );
};

export default SoundPlayer;
