import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeartQRScreen } from './components/HeartQRScreen';
import { CountdownScreen } from './components/CountdownScreen';
import { MemoryGalleryScreen } from './components/MemoryGalleryScreen';
import { BalloonPopScreen } from './components/BalloonPopScreen';
import { WishJarScreen } from './components/WishJarScreen';
import { LetterScreen } from './components/LetterScreen';
import { GiftUnwrapScreen } from './components/GiftUnwrapScreen';
import { CelebrationScreen } from './components/CelebrationScreen';
export function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const goToNext = useCallback(() => {
    setCurrentScreen((prev) => Math.min(prev + 1, 8));
  }, []);
  return (
    <div
      className="w-full h-full"
      style={{
        background: '#FFF5F7' // pastel-white
      }}>
      
      <AnimatePresence mode="wait">
        {currentScreen === 1 && <HeartQRScreen key="heart" onNext={goToNext} />}
        {currentScreen === 2 &&
        <CountdownScreen key="countdown" onNext={goToNext} />
        }
        {currentScreen === 3 &&
        <MemoryGalleryScreen key="gallery" onNext={goToNext} />
        }
        {currentScreen === 4 &&
        <BalloonPopScreen key="balloons" onNext={goToNext} />
        }
        {currentScreen === 5 &&
        <WishJarScreen key="wishjar" onNext={goToNext} />
        }
        {currentScreen === 6 && <LetterScreen key="letter" onNext={goToNext} />}
        {currentScreen === 7 &&
        <GiftUnwrapScreen key="gift" onNext={goToNext} />
        }
        {currentScreen === 8 &&
        <CelebrationScreen key="celebration" onNext={goToNext} />
        }
      </AnimatePresence>
    </div>);

}