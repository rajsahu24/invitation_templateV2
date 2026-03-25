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
import { usePreview } from '@/core/context/PreviewContext';
export function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const goToNext = useCallback(() => {
    setCurrentScreen((prev) => Math.min(prev + 1, 8));
  }, []);

  const { previewData } = usePreview();

  const heroData = previewData?.hero_section?.data;
  const heroSchema = previewData?.hero_section?.schema;
  const imageData = previewData?.image_section?.data;
  const countdownData = previewData?.hero_section?.data;
  console.log("countDownData",countdownData)
  const getField = (key: string) => (heroData && typeof heroData === 'object' ? heroData[key] : '') || '';

  let name = '';
  let message = '';
  if (heroData && typeof heroData === 'object') {
    if (heroSchema?.fields) {
      const findField = (keywords: string[]) =>
        heroSchema.fields.find((f: any) => keywords.some((k: string) => f.key.toLowerCase().includes(k)));
      name = getField(findField(['celebrant name', 'name','celebrant'])?.key);
      message = getField(findField(['tag', 'line', 'message'])?.key);
    } else {
      name = getField('celebrant_name') || getField('name');
      message = getField('tag_line') || getField('message');
    }
  }

  const displayName = name || 'Rohan';
  const displayMessage = message || '';
  const images: { image_url: string; type: string }[] = imageData?.images || [];
  const countdownTarget: string | undefined = countdownData?.birthday_date;

  return (
    <div
      className="w-full h-full"
      style={{
        background: '#FFF5F7'
      }}>
      <AnimatePresence mode="wait">
        {currentScreen === 1 && <HeartQRScreen key="heart" onNext={goToNext} name={displayName} />}
        {currentScreen === 2 && <CountdownScreen key="countdown" onNext={goToNext} name={displayName} targetDate={countdownTarget} message={displayMessage} />}
        {currentScreen === 3 && <MemoryGalleryScreen key="gallery" onNext={goToNext} images={images} />}
        {currentScreen === 4 && <BalloonPopScreen key="balloons" onNext={goToNext} name={displayName}/>}
        {currentScreen === 5 && <WishJarScreen key="wishjar" onNext={goToNext} name={displayName} />}
        {currentScreen === 6 && <LetterScreen key="letter" onNext={goToNext} name={displayName} message={displayMessage} />}
        {currentScreen === 7 && <GiftUnwrapScreen key="gift" onNext={goToNext} />}
        {currentScreen === 8 && <CelebrationScreen key="celebration" onNext={goToNext} name={displayName} />}
      </AnimatePresence>
    </div>);
}