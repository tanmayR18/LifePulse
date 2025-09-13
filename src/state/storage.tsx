import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './waterStore';
import { displayNotification } from '../notification/notificationInitial';

interface WaterStore {
  waterDrinkStamps: string[];
  addWaterIntake: (timestamp: string) => void;
  resetWaterIntake: () => void;
}

export const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      waterDrinkStamps: [],
      addWaterIntake: timestamp => {
        const waterDrinkStamps = [...get().waterDrinkStamps, timestamp];
        set({ waterDrinkStamps });
        displayNotification(
          `Water Intake ${waterDrinkStamps.length}/8`,
          'Stay Hydrated 💧',
          require('../assets/images/water.png'),
          'water-intake',
        );
      },
      resetWaterIntake: () => {
        set({ waterDrinkStamps: [] });
      },
    }),
    {
      name: 'water-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
