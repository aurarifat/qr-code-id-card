import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { normalizeImageUrl } from '../utils/imageUrl';

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'portraits' | 'gaming' | 'campus';
  url: string;
  description: string;
}

export type SocialPlatform =
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'whatsapp'
  | 'youtube'
  | 'discord'
  | 'telegram'
  | 'twitter'
  | 'github'
  | 'other';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  title: string;
  username: string;
  url: string;
  badge?: string;
  description?: string;
  isActive: boolean;
}

export interface VisitItem {
  id: string;
  timestamp: string;
  device: string;
  browser: string;
  platform: string;
  ip: string;
  path: string;
  isNewToday: boolean;
}

export interface VisitorStats {
  todayVisitorCount: number;
  todayPageViews: number;
  activeNow: number;
  recentVisits: VisitItem[];
  isLiveConnected: boolean;
  currentDate: string;
}

export interface SiteData {
  // Brand & Identity
  brandName: string;
  creatorName: string;
  heroSubtitle: string;
  availabilityBadge: string;
  bio: string;
  age: string;
  academicClass: string;
  location: string;
  email: string;
  phone: string;
  whatsappUrl: string;

  // Hero Name Animations
  heroFirstNameAnimation?: string;
  heroLastNameAnimation?: string;
  heroAnimationSpeed?: 'fast' | 'normal' | 'slow';
  heroWordAnimations?: Record<string, string>;

  // School Information
  schoolName: string;
  schoolDescription: string;
  eiinNumber: string;
  schoolLocation: string;
  schoolPhotoUrl: string;
  schoolLogoUrl: string;

  // Student Life
  favoriteSubject: string;
  classRank: string;
  studentHobby: string;
  studentInterest: string;

  // Gaming Profile
  mainGame: string;
  freeFireId: string;
  presentLevel: string;
  deviceSpecs: string;
  tiktokViralViews: string;
  gamingPhotoUrl: string;

  // Weapons
  weaponWoodpeckerUrl: string;
  weaponM590Url: string;
  weaponAC80Url: string;
  weaponTrogonUrl: string;

  // Primary Images
  profilePhotoUrl: string;

  // Collections
  socialAccounts: SocialAccount[];
  galleryPhotos: GalleryPhoto[];
}

export const defaultSiteData: SiteData = {
  brandName: 'Aura RIFAT',
  creatorName: 'Mahi Ahmed Rifat',
  heroSubtitle: 'Gamer • Content Creator • Designer',
  availabilityBadge: 'GAMER • CREATOR • DESIGNER',
  bio: 'Competitive Free Fire player, Class 9 student at Lalore High School, and digital graphic designer from Natore, Bangladesh.',
  age: '15+',
  academicClass: 'Class 9',
  location: 'Natore Zilla, BD',
  email: 'mahiahmed1418@gmail.com',
  phone: '01595257722',
  whatsappUrl: 'https://wa.me/8801595257722',

  heroFirstNameAnimation: 'solid',
  heroLastNameAnimation: 'shimmer',
  heroAnimationSpeed: 'normal',
  heroWordAnimations: {},

  schoolName: 'Lalore High School',
  schoolDescription: 'A well-established secondary educational institution located in Singra Upazila of Natore District under the Rajshahi Division of Bangladesh.',
  eiinNumber: '124267',
  schoolLocation: 'Singra Upazila, Natore District, Rajshahi Division, Bangladesh',
  schoolPhotoUrl: 'https://i.ibb.co/L2zK7s5/file-0000000059c48211974701cfc407a37a.png',
  schoolLogoUrl: 'https://iili.io/nVDIIYN.th.jpg',

  favoriteSubject: 'English',
  classRank: 'Top 6',
  studentHobby: 'Tournament Player',
  studentInterest: 'Reads comics & visual art',

  mainGame: 'Free Fire',
  freeFireId: '6111000130',
  presentLevel: '63',
  deviceSpecs: 'Infinix XPAD 20 (Helio G88, 6/128GB, Android 15)',
  tiktokViralViews: '4.2K+',
  gamingPhotoUrl: 'https://iili.io/K8fPhe1.png',

  weaponWoodpeckerUrl: 'https://iili.io/K8froWx.jpg',
  weaponM590Url: 'https://iili.io/K8frxiQ.jpg',
  weaponAC80Url: 'https://iili.io/K8f6jVf.jpg',
  weaponTrogonUrl: 'https://iili.io/K8f61SI.jpg',

  profilePhotoUrl: 'https://i.ibb.co/93yZ0YPT/file-00000000a02c8211b7422677595ebb98-1.jpg',

  socialAccounts: [
    {
      id: 'social-tiktok',
      platform: 'tiktok',
      title: 'TikTok Platform',
      username: '@rifat99_aura',
      url: 'https://www.tiktok.com/@rifat99_aura',
      badge: '4.2K+ Viral Views',
      description: 'Viral gameplay clips, trending sound edits, and Free Fire highlights.',
      isActive: true,
    },
    {
      id: 'social-instagram',
      platform: 'instagram',
      title: 'Instagram Network',
      username: '@rifat99_aura',
      url: 'https://www.instagram.com/rifat99_aura',
      badge: 'Daily Stories',
      description: 'Creative design drops, daily stories, and personal lifestyle updates.',
      isActive: true,
    },
    {
      id: 'social-facebook',
      platform: 'facebook',
      title: 'Facebook Community',
      username: '@mahi2rifat',
      url: 'https://www.facebook.com/mahi2rifat?mibextid=rS40aB7S9Ucbxw6v',
      badge: 'Active Profile',
      description: 'Student highlights, local events in Natore, and personal connections.',
      isActive: true,
    },
    {
      id: 'social-whatsapp',
      platform: 'whatsapp',
      title: 'WhatsApp Messenger',
      username: '+880 1595-257722',
      url: 'https://wa.me/8801595257722',
      badge: 'Direct Chat',
      description: 'Instant response for freelance design projects, squad invites, and inquiries.',
      isActive: true,
    },
    {
      id: 'social-youtube',
      platform: 'youtube',
      title: 'YouTube Channel',
      username: '@AuraRIFAT',
      url: 'https://youtube.com/@AuraRIFAT',
      badge: 'Full HD Gameplay',
      description: 'Competitive Free Fire headshot montages, scrim highlights, and tutorials.',
      isActive: false,
    },
    {
      id: 'social-discord',
      platform: 'discord',
      title: 'Discord Squad',
      username: 'AuraRIFAT#6111',
      url: 'https://discord.gg',
      badge: 'Clan Voice Room',
      description: 'Join our Free Fire tournament squad voice channel and custom room scrims.',
      isActive: false,
    },
  ],

  galleryPhotos: [
    {
      id: 'photo-1791896178938',
      title: 'You',
      category: 'gaming',
      url: 'https://i.ibb.co/fdwmkryd/file-0000000062a08208861c4f1ace002448-1.jpg',
      description: 'Added via Admin Dashboard live upload.',
    },
    {
      id: 'photo-1',
      title: 'Full HD Portrait Showcase',
      category: 'portraits',
      url: 'https://i.ibb.co/93yZ0YPT/file-00000000a02c8211b7422677595ebb98-1.jpg',
      description: 'Official crystal clear portrait of Aura RIFAT.',
    },
    {
      id: 'photo-2',
      title: 'Profile Close-up',
      category: 'portraits',
      url: 'https://iili.io/nVt4dRj.th.jpg',
      description: 'Original creator avatar capture in Natore.',
    },
    {
      id: 'photo-3',
      title: 'Free Fire In-Game Identity',
      category: 'gaming',
      url: 'https://iili.io/K8fPhe1.png',
      description: 'Competitive Free Fire player loadout card & stats.',
    },
    {
      id: 'photo-4',
      title: 'Lalore High School 16:9 Campus',
      category: 'campus',
      url: 'https://i.ibb.co/L2zK7s5/file-0000000059c48211974701cfc407a37a.png',
      description: 'Full HD educational campus photo in Singra Upazila.',
    },
    {
      id: 'photo-5',
      title: 'Lalore High School Insignia',
      category: 'campus',
      url: 'https://iili.io/nVDIIYN.th.jpg',
      description: 'Official academic institution seal & crest.',
    },
  ],
};

interface SiteDataContextType {
  siteData: SiteData;
  updateField: <K extends keyof SiteData>(field: K, value: SiteData[K]) => void;
  updateSiteData: (newData: Partial<SiteData>) => void;
  saveAllNow: () => Promise<boolean>;
  resetToDefaults: () => void;
  isSaving: boolean;
  lastSavedAt: Date | null;

  // Real-time visitor system
  visitorCount: number;
  visitorStats: VisitorStats;
  refreshVisitorStats: () => Promise<void>;
  resetVisitorCounter: (baseCount?: number) => Promise<void>;

  // Social account controls
  addSocialAccount: (account: Omit<SocialAccount, 'id'>) => void;
  updateSocialAccount: (id: string, updated: Partial<SocialAccount>) => void;
  removeSocialAccount: (id: string) => void;

  // Gallery controls
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  updateGalleryPhoto: (id: string, updated: Partial<GalleryPhoto>) => void;
  removeGalleryPhoto: (id: string) => void;
  uploadImageFile: (file: File) => Promise<{ success: boolean; url: string; error?: string }>;

  // Admin auth
  isAuthenticated: boolean;
  login: (username: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

const STORAGE_KEY = 'aura_site_config_v4';
const VISITOR_ID_KEY = 'aura_visitor_unique_uid';

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      // Check latest v4, or fallback to earlier keys
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('aura_site_config_v3') ||
        localStorage.getItem('aura_site_config_v2');

      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...defaultSiteData,
            ...parsed,
            socialAccounts:
              Array.isArray(parsed.socialAccounts) && parsed.socialAccounts.length > 0
                ? parsed.socialAccounts
                : defaultSiteData.socialAccounts,
            galleryPhotos:
              Array.isArray(parsed.galleryPhotos) && parsed.galleryPhotos.length > 0
                ? parsed.galleryPhotos
                : defaultSiteData.galleryPhotos,
          };
        }
      }
    } catch {
      // ignore
    }
    return defaultSiteData;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const latestDataRef = useRef<SiteData>(siteData);

  useEffect(() => {
    latestDataRef.current = siteData;
  }, [siteData]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return (
        sessionStorage.getItem('aura_admin_session') === 'active' ||
        localStorage.getItem('aura_admin_session') === 'active'
      );
    } catch {
      return false;
    }
  });

  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    todayVisitorCount: 1,
    todayPageViews: 1,
    activeNow: 1,
    recentVisits: [],
    isLiveConnected: false,
    currentDate: new Date().toISOString().slice(0, 10),
  });

  const visitorIdRef = useRef<string>('');

  // Persistent visitor UUID
  const getVisitorId = useCallback((): string => {
    if (visitorIdRef.current) return visitorIdRef.current;
    try {
      let vid = localStorage.getItem(VISITOR_ID_KEY);
      if (!vid) {
        vid = 'v_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
        localStorage.setItem(VISITOR_ID_KEY, vid);
      }
      visitorIdRef.current = vid;
      return vid;
    } catch {
      return 'anon_' + Date.now();
    }
  }, []);

  // Server heartbeat ping
  const pingServer = useCallback(async () => {
    const vid = getVisitorId();
    try {
      const res = await fetch('/api/visitors/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: vid,
          path: window.location.pathname || '/',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setVisitorStats((prev) => ({
          ...prev,
          todayVisitorCount: data.todayVisitorCount,
          todayPageViews: data.todayPageViews,
          activeNow: data.activeNow,
          isLiveConnected: true,
          currentDate: data.today,
        }));
      }
    } catch {
      setVisitorStats((prev) => ({ ...prev, isLiveConnected: false }));
    }
  }, [getVisitorId]);

  const refreshVisitorStats = useCallback(async () => {
    try {
      const res = await fetch('/api/visitors/stats');
      if (res.ok) {
        const data = await res.json();
        setVisitorStats({
          todayVisitorCount: data.todayVisitorCount,
          todayPageViews: data.todayPageViews,
          activeNow: data.activeNow,
          recentVisits: data.recentVisits || [],
          isLiveConnected: true,
          currentDate: data.currentDate,
        });
      }
    } catch {
      // offline
    }
  }, []);

  const resetVisitorCounter = useCallback(async (baseCount: number = 0) => {
    try {
      await fetch('/api/visitors/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseCount }),
      });
      await refreshVisitorStats();
    } catch {
      setVisitorStats((prev) => ({
        ...prev,
        todayVisitorCount: baseCount,
        todayPageViews: baseCount,
        activeNow: 1,
        recentVisits: [],
      }));
    }
  }, [refreshVisitorStats]);

  // Load server-persisted site data on mount
  useEffect(() => {
    let isMounted = true;
    const loadServerData = async () => {
      try {
        let res: Response | null = null;
        try {
          res = await fetch('/api/site-data');
        } catch {
          // Dev backend not running
        }
        if (!res || !res.ok) {
          try {
            res = await fetch('./data/siteData.json');
          } catch {
            // Static file not reachable
          }
        }
        if (res && res.ok) {
          const serverData = await res.json();
          if (serverData && typeof serverData === 'object' && Object.keys(serverData).length > 0) {
            if (isMounted) {
              setSiteData((prev) => {
                const merged = {
                  ...defaultSiteData,
                  ...prev,
                  ...serverData,
                  socialAccounts:
                    Array.isArray(serverData.socialAccounts) && serverData.socialAccounts.length > 0
                      ? serverData.socialAccounts
                      : prev.socialAccounts,
                  galleryPhotos:
                    Array.isArray(serverData.galleryPhotos) && serverData.galleryPhotos.length > 0
                      ? serverData.galleryPhotos
                      : prev.galleryPhotos,
                };
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                } catch {
                  // ignore
                }
                return merged;
              });
            }
          }
        }
      } catch {
        // use local
      }
    };

    loadServerData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Periodic visitor heartbeat
  useEffect(() => {
    pingServer();
    refreshVisitorStats();

    const interval = setInterval(() => {
      pingServer();
      refreshVisitorStats();
    }, 25000);

    return () => clearInterval(interval);
  }, [pingServer, refreshVisitorStats]);

  // Listen for storage events (e.g. if edited in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSiteData((prev) => ({ ...prev, ...parsed }));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Internal save function to disk & localStorage
  const executeServerSave = async (dataToSave: SiteData): Promise<boolean> => {
    setIsSaving(true);
    try {
      // 1. Immediately store in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // ignore
    }

    try {
      // 2. Persist to Express backend /api/site-data
      const res = await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (res.ok) {
        setLastSavedAt(new Date());
        setIsSaving(false);
        return true;
      }
    } catch (err) {
      console.warn('Backend save notice (local saved):', err);
    }
    setIsSaving(false);
    return true; // local is saved anyway
  };

  // Debounced auto-save for typing
  const scheduleAutoSave = (updated: SiteData) => {
    // Save to localStorage immediately so no typing lag
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      executeServerSave(updated);
    }, 400);
  };

  // Public immediate save action (when user clicks "Save Changes")
  const saveAllNow = async (): Promise<boolean> => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    return await executeServerSave(latestDataRef.current);
  };

  const updateField = <K extends keyof SiteData>(field: K, value: SiteData[K]) => {
    // If it's an image field, normalize URL
    let finalValue = value;
    if (
      typeof value === 'string' &&
      (field.toString().toLowerCase().includes('url') || field.toString().toLowerCase().includes('photo'))
    ) {
      finalValue = normalizeImageUrl(value) as SiteData[K];
    }

    setSiteData((prev) => {
      const updated = { ...prev, [field]: finalValue };
      scheduleAutoSave(updated);
      return updated;
    });
  };

  const updateSiteData = (newData: Partial<SiteData>) => {
    setSiteData((prev) => {
      const updated = { ...prev, ...newData };
      scheduleAutoSave(updated);
      return updated;
    });
  };

  const resetToDefaults = () => {
    setSiteData(defaultSiteData);
    executeServerSave(defaultSiteData);
  };

  // Social accounts management
  const addSocialAccount = (account: Omit<SocialAccount, 'id'>) => {
    const newAccount: SocialAccount = {
      ...account,
      id: `social-${Date.now()}`,
      url: normalizeImageUrl(account.url),
    };
    setSiteData((prev) => {
      const updated = {
        ...prev,
        socialAccounts: [...prev.socialAccounts, newAccount],
      };
      scheduleAutoSave(updated);
      return updated;
    });
  };

  const updateSocialAccount = (id: string, updated: Partial<SocialAccount>) => {
    if (updated.url) {
      updated.url = normalizeImageUrl(updated.url);
    }
    setSiteData((prev) => {
      const updatedList = prev.socialAccounts.map((acc) =>
        acc.id === id ? { ...acc, ...updated } : acc
      );
      const updatedData = { ...prev, socialAccounts: updatedList };
      scheduleAutoSave(updatedData);
      return updatedData;
    });
  };

  const removeSocialAccount = (id: string) => {
    setSiteData((prev) => {
      const updatedList = prev.socialAccounts.filter((acc) => acc.id !== id);
      const updatedData = { ...prev, socialAccounts: updatedList };
      scheduleAutoSave(updatedData);
      return updatedData;
    });
  };

  // Photo gallery management
  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `photo-${Date.now()}`,
      url: normalizeImageUrl(photo.url),
    };
    setSiteData((prev) => {
      const updated = {
        ...prev,
        galleryPhotos: [newPhoto, ...(prev.galleryPhotos || [])],
      };
      scheduleAutoSave(updated);
      return updated;
    });
  };

  const updateGalleryPhoto = (id: string, updated: Partial<GalleryPhoto>) => {
    if (updated.url) {
      updated.url = normalizeImageUrl(updated.url);
    }
    setSiteData((prev) => {
      const updatedList = (prev.galleryPhotos || []).map((p) =>
        p.id === id ? { ...p, ...updated } : p
      );
      const updatedData = { ...prev, galleryPhotos: updatedList };
      scheduleAutoSave(updatedData);
      return updatedData;
    });
  };

  const removeGalleryPhoto = (id: string) => {
    setSiteData((prev) => {
      const updatedList = (prev.galleryPhotos || []).filter((p) => p.id !== id);
      const updatedData = { ...prev, galleryPhotos: updatedList };
      scheduleAutoSave(updatedData);
      return updatedData;
    });
  };

  const uploadImageFile = async (file: File): Promise<{ success: boolean; url: string; error?: string }> => {
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      // Try server upload first if backend is present
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: base64Data, filename: file.name }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.url) {
            return { success: true, url: json.url };
          }
        }
      } catch {
        // Backend upload route unavailable (e.g. static GitHub Pages hosting)
      }

      // Seamless static fallback: store base64 data URI so user immediately sees their photo
      return { success: true, url: base64Data };
    } catch (err: any) {
      return { success: false, url: '', error: err?.message || 'Upload error' };
    }
  };

  // Admin authentication (User requested: username: rifat99aura@gmail.com, pass: 1onlyadmin2.0rifatfku)
  const login = (username: string, pass: string): { success: boolean; error?: string } => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    const expectedUser = 'rifat99aura@gmail.com';
    const expectedPass = '1onlyadmin2.0rifatfku';

    if (cleanUser === expectedUser && cleanPass === expectedPass) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('aura_admin_session', 'active');
        localStorage.setItem('aura_admin_session', 'active');
      } catch {
        // ignore
      }
      return { success: true };
    }

    return {
      success: false,
      error: 'Access Blocked — please visit the website not try to control it.',
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('aura_admin_session');
      localStorage.removeItem('aura_admin_session');
    } catch {
      // ignore
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        updateField,
        updateSiteData,
        saveAllNow,
        resetToDefaults,
        isSaving,
        lastSavedAt,

        visitorCount: visitorStats.todayVisitorCount,
        visitorStats,
        refreshVisitorStats,
        resetVisitorCounter,

        addSocialAccount,
        updateSocialAccount,
        removeSocialAccount,

        addGalleryPhoto,
        updateGalleryPhoto,
        removeGalleryPhoto,
        uploadImageFile,

        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
