export interface AnimationPreset {
  id: string;
  name: string;
  description: string;
  category: 'radiant' | 'energetic' | 'futuristic' | 'clean';
  badge: string;
}

export const ANIMATION_PRESETS: AnimationPreset[] = [
  {
    id: 'shimmer',
    name: 'Brand Shimmer',
    description: 'Moving orange & gold radiant beam across letters',
    category: 'radiant',
    badge: 'Popular',
  },
  {
    id: 'flame-pulse',
    name: 'Neon Flame Pulse',
    description: 'Fiery breathing glow with expanding orange aura',
    category: 'energetic',
    badge: 'Gamer',
  },
  {
    id: 'glitch',
    name: 'Cyberpunk Glitch',
    description: 'Subtle RGB chromatic aberration & cyber twitch',
    category: 'futuristic',
    badge: 'Cyber',
  },
  {
    id: 'neon-flicker',
    name: 'Neon Tube Flicker',
    description: 'Authentic arcade neon sign with ignition flicker',
    category: 'energetic',
    badge: 'Retro',
  },
  {
    id: 'wave-bounce',
    name: 'Wave Bounce',
    description: 'Rhythmic vertical bounce & floating letters',
    category: 'energetic',
    badge: 'Dynamic',
  },
  {
    id: 'gold-radiance',
    name: 'Golden Radiance',
    description: 'Rich royal metallic gold with reflective gleam',
    category: 'radiant',
    badge: 'Luxury',
  },
  {
    id: 'gradient-fire',
    name: 'Gradient Fire',
    description: 'Vivid crimson-to-orange ember flame flow',
    category: 'radiant',
    badge: 'Hot',
  },
  {
    id: 'smoke-float',
    name: 'Smoke Float',
    description: 'Ethereal floating hover with soft glow breath',
    category: 'futuristic',
    badge: 'Smooth',
  },
  {
    id: 'solid',
    name: 'Solid Minimalist',
    description: 'High-contrast solid bold text without motion',
    category: 'clean',
    badge: 'Classic',
  },
];

export const getAnimationClass = (animKey?: string, speed: 'fast' | 'normal' | 'slow' = 'normal'): string => {
  const speedClass =
    speed === 'fast' ? 'anim-speed-fast' : speed === 'slow' ? 'anim-speed-slow' : 'anim-speed-normal';

  switch (animKey) {
    case 'shimmer':
      return `brand-shimmer ${speedClass}`;
    case 'flame-pulse':
      return `anim-flame-pulse ${speedClass}`;
    case 'neon-flicker':
      return `anim-neon-flicker ${speedClass}`;
    case 'glitch':
      return `anim-glitch ${speedClass}`;
    case 'wave-bounce':
      return `anim-wave-bounce ${speedClass}`;
    case 'gold-radiance':
      return `anim-gold-radiance ${speedClass}`;
    case 'gradient-fire':
      return `anim-gradient-fire ${speedClass}`;
    case 'smoke-float':
      return `anim-smoke-float ${speedClass}`;
    case 'solid':
    default:
      return 'anim-solid';
  }
};
