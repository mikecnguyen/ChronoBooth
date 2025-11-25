import { Era } from './types';

export const APP_NAME = "ChronoBooth";
export const APP_VERSION = "v1.0.0";

export const ERAS: Era[] = [
  {
    id: 'victorian',
    name: 'Victorian London',
    description: 'Foggy streets, top hats, and elegant dresses.',
    prompt: 'Transform the person into a Victorian era gentleperson. Background: foggy London street with gas lamps and cobblestones. Clothing: 19th-century formal wear, top hat or bonnet, elegant coat. Style: vintage photography, sepia tones.',
    icon: '🎩',
    color: 'from-amber-700 to-orange-900'
  },
  {
    id: 'cyberpunk',
    name: 'Neo Tokyo 2077',
    description: 'Neon lights, high-tech cybernetics, and rain.',
    prompt: 'Transform the person into a futuristic cyberpunk character. Background: Neon-lit rainy city street at night, holograms. Clothing: high-tech jacket with glowing accents, cybernetic visor or accessories. Style: vibrant, high contrast, cinematic sci-fi.',
    icon: '🤖',
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'egypt',
    name: 'Ancient Egypt',
    description: 'Pyramids, desert sands, and gold jewelry.',
    prompt: 'Transform the person into an Ancient Egyptian noble. Background: Pyramids of Giza, desert sand, blue sky. Clothing: white linen robes, gold collars, pharaonic headdress or jewelry. Style: warm, golden hour lighting.',
    icon: '👁️',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'medieval',
    name: 'Medieval Kingdom',
    description: 'Castles, knights, and fantasy vibes.',
    prompt: 'Transform the person into a medieval fantasy hero. Background: Stone castle courtyard or lush forest. Clothing: silver armor or velvet royal robes, cape. Style: epic fantasy art, dramatic lighting.',
    icon: '⚔️',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 'retro_80s',
    name: '1980s Miami',
    description: 'Pastel suits, palm trees, and synthwave.',
    prompt: 'Transform the person into a 1980s Miami icon. Background: Miami beach sunset, palm trees, art deco buildings. Clothing: pastel suit or colorful windbreaker, sunglasses. Style: retro 80s aesthetic, VHS grain.',
    icon: '🌴',
    color: 'from-cyan-400 to-fuchsia-500'
  },
  {
    id: 'wild_west',
    name: 'Wild West',
    description: 'Saloons, cowboys, and dusty trails.',
    prompt: 'Transform the person into a Wild West outlaw or sheriff. Background: Wooden saloon exterior, dusty desert town. Clothing: cowboy hat, leather vest, bandana, sheriff badge. Style: western movie poster, gritty.',
    icon: '🤠',
    color: 'from-orange-700 to-red-900'
  }
];
