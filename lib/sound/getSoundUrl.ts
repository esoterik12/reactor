import { SoundKey } from "@/types/soundTypes";
import { soundMap } from "./soundMap";

export function getSoundUrl(key: SoundKey): string {
  return soundMap[key];
}
