import React, { useState, useRef } from 'react';
import { useSiteData, SocialPlatform, SocialAccount, GalleryPhoto } from '../context/SiteDataContext';
import { normalizeImageUrl, resolveAndNormalizeImageUrl } from '../utils/imageUrl';
import {
  X,
  Lock,
  Unlock,
  ShieldAlert,
  Users,
  Image as ImageIcon,
  Check,
  RotateCcw,
  LogOut,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  Share2,
  GraduationCap,
  Gamepad2,
  Phone,
  RefreshCw,
  Activity,
  Smartphone,
  Upload,
  CheckCircle2,
  Sliders,
  Save,
  BookOpen,
  ArrowRight,
  Info,
  Edit2,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    siteData,
    updateField,
    saveAllNow,
    resetToDefaults,
    isSaving,
    lastSavedAt,
    visitorCount,
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
  } = useSiteData();

  // Login Form State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<
    'brand' | 'school' | 'social' | 'images' | 'gaming' | 'student' | 'gallery'
  >('brand');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [showVisitorLogs, setShowVisitorLogs] = useState(false);
  const [isRefreshingStats, setIsRefreshingStats] = useState(false);

  // New social account state
  const [newSocialPlatform, setNewSocialPlatform] = useState<SocialPlatform>('tiktok');
  const [newSocialTitle, setNewSocialTitle] = useState('');
  const [newSocialUsername, setNewSocialUsername] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [newSocialBadge, setNewSocialBadge] = useState('');
  const [newSocialDesc, setNewSocialDesc] = useState('');

  // Delete social confirm state
  const [socialToDelete, setSocialToDelete] = useState<string | null>(null);

  // New gallery photo state
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCat, setNewPhotoCat] = useState<'portraits' | 'gaming' | 'campus'>('portraits');
  const [isUploadingGalleryPhoto, setIsUploadingGalleryPhoto] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editPhotoTitle, setEditPhotoTitle] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [editPhotoCat, setEditPhotoCat] = useState<'portraits' | 'gaming' | 'campus'>('portraits');
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  // File input refs for uploading directly from device
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const campusFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const gamingFileInputRef = useRef<HTMLInputElement>(null);

  // Visitor calibration input state
  const [calibrateCount, setCalibrateCount] = useState<string>('');
  const [showCalibrateInput, setShowCalibrateInput] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const result = login(usernameInput, passwordInput);
    if (!result.success) {
      setLoginError(result.error || 'Access Blocked — please visit the website not try to control it.');
    } else {
      setUsernameInput('');
      setPasswordInput('');
    }
  };

  const handleSaveAndPublish = async () => {
    const success = await saveAllNow();
    if (success) {
      setSaveSuccessMsg('✓ All changes saved and published live to website!');
      setTimeout(() => setSaveSuccessMsg(''), 3500);
    }
  };

  const handleSaveAndView = async (sectionId?: string) => {
    await saveAllNow();
    onClose();
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleRefreshStats = async () => {
    setIsRefreshingStats(true);
    await refreshVisitorStats();
    setTimeout(() => setIsRefreshingStats(false), 500);
  };

  const handleCalibrateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(calibrateCount, 10);
    if (!isNaN(count) && count >= 0) {
      await resetVisitorCounter(count);
      setShowCalibrateInput(false);
      setCalibrateCount('');
      setSaveSuccessMsg(`✓ Visitor count synced to ${count}`);
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  // Device file upload helper
  const handleGenericFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: keyof typeof siteData
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaveSuccessMsg('Uploading image from device...');
      const res = await uploadImageFile(file);
      if (res.success && res.url) {
        updateField(fieldKey as any, res.url);
        setSaveSuccessMsg('✓ Image uploaded & applied live!');
        setTimeout(() => setSaveSuccessMsg(''), 3000);
      } else {
        setSaveSuccessMsg('Upload failed. Try a smaller image.');
        setTimeout(() => setSaveSuccessMsg(''), 3000);
      }
    } catch {
      setSaveSuccessMsg('Upload failed.');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
    // reset input
    e.target.value = '';
  };

  // Gallery device upload
  const handleGalleryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingGalleryPhoto(true);
    try {
      const res = await uploadImageFile(file);
      if (res.success && res.url) {
        setNewPhotoUrl(res.url);
        if (!newPhotoTitle) {
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setNewPhotoTitle(cleanName);
        }
        setSaveSuccessMsg('✓ Photo uploaded! Add title and click "+ Add Photo Live"');
        setTimeout(() => setSaveSuccessMsg(''), 4000);
      }
    } catch {
      setSaveSuccessMsg('Failed to upload file.');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    } finally {
      setIsUploadingGalleryPhoto(false);
      e.target.value = '';
    }
  };

  const handleAddSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocialUrl.trim() || !newSocialUsername.trim()) return;

    addSocialAccount({
      platform: newSocialPlatform,
      title: newSocialTitle.trim() || `${newSocialPlatform.toUpperCase()} Account`,
      username: newSocialUsername.trim(),
      url: newSocialUrl.trim(),
      badge: newSocialBadge.trim() || 'Online Link',
      description: newSocialDesc.trim() || 'Official social channel.',
      isActive: true,
    });

    setNewSocialTitle('');
    setNewSocialUsername('');
    setNewSocialUrl('');
    setNewSocialBadge('');
    setNewSocialDesc('');
    setSaveSuccessMsg('✓ Added new social media channel live!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim() || !newPhotoTitle.trim()) return;

    // Auto-resolve viewer links
    const directUrl = await resolveAndNormalizeImageUrl(newPhotoUrl.trim());

    addGalleryPhoto({
      url: directUrl,
      title: newPhotoTitle.trim(),
      category: newPhotoCat,
      description: 'Added via Admin Dashboard live upload.',
    });
    setNewPhotoUrl('');
    setNewPhotoTitle('');
    setSaveSuccessMsg('✓ Added photo to gallery live!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleStartEditPhoto = (photo: GalleryPhoto) => {
    setEditingPhotoId(photo.id);
    setEditPhotoTitle(photo.title);
    setEditPhotoUrl(photo.url);
    setEditPhotoCat(photo.category as any);
  };

  const handleSaveEditPhoto = async (id: string) => {
    const directUrl = await resolveAndNormalizeImageUrl(editPhotoUrl.trim());
    updateGalleryPhoto(id, {
      title: editPhotoTitle.trim(),
      url: directUrl,
      category: editPhotoCat,
    });
    setEditingPhotoId(null);
    setSaveSuccessMsg('✓ Photo updated live!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0D0D0D] border border-[#FF6500]/40 shadow-[0_0_60px_rgba(255,101,0,0.25)] overflow-hidden">
        
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#111111]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6500] to-[#D94700] text-black flex items-center justify-center shadow-lg">
              {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                  Aura RIFAT Master Control CMS
                </h3>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-tech uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Session Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[#858585] font-mono">
                Full dynamic website editing • Real-time visitor logs • Instant sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleSaveAndPublish}
                disabled={isSaving}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6500] to-[#D94700] text-black font-display font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save & Publish Live'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#858585] hover:text-white transition-colors"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOTIFICATION BANNER */}
        {saveSuccessMsg && (
          <div className="px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border-b border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{saveSuccessMsg}</span>
            </span>
            <span className="text-[10px] text-emerald-400/80">Reflected live on site</span>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!isAuthenticated ? (
            /* ================= LOGIN FORM ================= */
            <div className="max-w-md mx-auto py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FF6500]/10 border border-[#FF6500]/30 text-[#FF7A1A] flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-display font-black text-2xl text-white">
                  Admin Verification Required
                </h4>
                <p className="mt-1 text-xs text-[#858585] font-body max-w-sm mx-auto">
                  Only the authorized website owner and administrator may modify website data.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono flex items-start gap-2.5 text-left">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-tech uppercase text-[#858585] block mb-1.5">
                    Admin Email / Username
                  </label>
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="rifat99aura@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-tech uppercase text-[#858585] block mb-1.5">
                    Security Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none pr-10 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858585] hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6500] via-[#FF7A1A] to-[#D94700] text-black font-display font-bold text-sm shadow-[0_0_20px_rgba(255,101,0,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  Authenticate & Unlock Editor
                </button>
              </form>

              <div className="p-3.5 rounded-xl bg-[#121212] border border-white/5 text-[11px] font-mono text-[#858585] text-left space-y-1">
                <span className="text-[#FF7A1A] font-bold block">Security Note:</span>
                <div>All changes are saved to server memory and persist for all site visitors.</div>
              </div>
            </div>
          ) : (
            /* ================= AUTHENTICATED DASHBOARD ================= */
            <div className="space-y-6">
              
              {/* REAL-TIME VISITOR STATS BANNER */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#171717] via-[#141414] to-[#121212] border border-[#FF6500]/30 shadow-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-display font-bold text-sm sm:text-base text-white">
                      Real-Time Today's Visitor Analytics
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                      LIVE TRACKING
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRefreshStats}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#858585] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Sync current stats"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingStats ? 'animate-spin text-[#FF7A1A]' : ''}`} />
                      <span>Refresh</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowVisitorLogs(!showVisitorLogs)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#FFB347] hover:text-[#FF7A1A] transition-colors cursor-pointer"
                    >
                      {showVisitorLogs ? 'Hide Visit Log' : 'View Live Log'}
                    </button>
                  </div>
                </div>

                {/* Visitor Numbers Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                    <span className="text-[10px] font-tech uppercase text-[#858585] block">
                      Today's Real Visitors
                    </span>
                    <div className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFB347] to-[#FF6500] tabular-nums mt-0.5">
                      {visitorStats.todayVisitorCount}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Unique devices</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                    <span className="text-[10px] font-tech uppercase text-[#858585] block">
                      Today's Page Views
                    </span>
                    <div className="text-2xl sm:text-3xl font-display font-black text-white tabular-nums mt-0.5">
                      {visitorStats.todayPageViews}
                    </div>
                    <span className="text-[10px] font-mono text-[#858585]">Total requests</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/5">
                    <span className="text-[10px] font-tech uppercase text-[#858585] block">
                      Active Right Now
                    </span>
                    <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400 tabular-nums mt-0.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{visitorStats.activeNow}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400/80">Online live</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex flex-col justify-between">
                    <span className="text-[10px] font-tech uppercase text-[#858585] block">
                      Tracking Status
                    </span>
                    <div className="text-xs font-mono text-emerald-400 font-bold">
                      {visitorStats.isLiveConnected ? '● Connected' : '○ Standby'}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCalibrateInput(!showCalibrateInput)}
                      className="text-[10px] text-[#FF7A1A] hover:underline text-left mt-1"
                    >
                      Sync Counter →
                    </button>
                  </div>
                </div>

                {/* Calibrate/Set Visitor Count Modal Box */}
                {showCalibrateInput && (
                  <form onSubmit={handleCalibrateSubmit} className="p-3 rounded-xl bg-black/80 border border-white/10 flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={calibrateCount}
                      onChange={(e) => setCalibrateCount(e.target.value)}
                      placeholder="Enter new base visitor count (e.g. 50)"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#181818] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#FF6500] text-black font-display font-bold text-xs hover:bg-[#FF7A1A] cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCalibrateInput(false)}
                      className="px-2 py-1.5 text-xs text-[#858585] hover:text-white"
                    >
                      Cancel
                    </button>
                  </form>
                )}

                {/* Live Visit Logs View */}
                {showVisitorLogs && (
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <div className="text-xs font-tech uppercase text-[#FFB347] flex items-center justify-between">
                      <span>Real-Time Visitor Log (Last 40 interactions)</span>
                      <span className="text-[10px] text-[#858585]">Genuine IP & Device tracking</span>
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px]">
                      {visitorStats.recentVisits.length === 0 ? (
                        <div className="text-[#858585] py-2">No visits logged yet today.</div>
                      ) : (
                        visitorStats.recentVisits.map((v) => (
                          <div
                            key={v.id}
                            className="p-2 rounded-lg bg-black/40 border border-white/5 flex flex-wrap items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span className="text-white font-semibold">{v.device}</span>
                              <span className="text-[#858585]">({v.platform} • {v.browser})</span>
                              {v.isNewToday && (
                                <span className="px-1.5 py-0.2 rounded bg-[#FF6500]/20 text-[#FF7A1A] text-[9px] font-bold">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-[#858585]">
                              <span>IP: {v.ip}</span>
                              <span>{new Date(v.timestamp).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* DASHBOARD TABS NAVIGATION */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
                {[
                  { key: 'brand', label: '1. Brand & Bio', icon: Sliders },
                  { key: 'social', label: '2. Social Accounts', icon: Share2 },
                  { key: 'gallery', label: '3. Photo Gallery', icon: ImageIcon },
                  { key: 'images', label: '4. Image Host Links', icon: Upload },
                  { key: 'school', label: '5. School & ID', icon: GraduationCap },
                  { key: 'gaming', label: '6. Gaming Profile', icon: Gamepad2 },
                  { key: 'student', label: '7. Student Life', icon: BookOpen },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#FF6500] to-[#D94700] text-black shadow-md'
                          : 'bg-[#141414] text-[#858585] hover:text-white hover:bg-white/5 border border-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: BRAND & BIO */}
              {activeTab === 'brand' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Brand Name (Navbar & Header)
                    </label>
                    <input
                      type="text"
                      value={siteData.brandName}
                      onChange={(e) => updateField('brandName', e.target.value)}
                      placeholder="e.g. Aura RIFAT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Creator Real Name
                    </label>
                    <input
                      type="text"
                      value={siteData.creatorName}
                      onChange={(e) => updateField('creatorName', e.target.value)}
                      placeholder="e.g. Mahi Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Hero Subtitle / Profession
                    </label>
                    <input
                      type="text"
                      value={siteData.heroSubtitle}
                      onChange={(e) => updateField('heroSubtitle', e.target.value)}
                      placeholder="e.g. Gamer • Content Creator • Designer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Personal Bio / Overview
                    </label>
                    <textarea
                      rows={3}
                      value={siteData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Direct Mobile Phone
                    </label>
                    <input
                      type="text"
                      value={siteData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm font-mono focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Email Dispatch
                    </label>
                    <input
                      type="email"
                      value={siteData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm font-mono focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      WhatsApp Click-to-Chat Link
                    </label>
                    <input
                      type="text"
                      value={siteData.whatsappUrl}
                      onChange={(e) => updateField('whatsappUrl', e.target.value)}
                      placeholder="https://wa.me/880..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm font-mono focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Location / Region
                    </label>
                    <input
                      type="text"
                      value={siteData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      placeholder="e.g. Natore Zilla, BD"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: SOCIAL ACCOUNTS MANAGER */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div className="p-3.5 rounded-xl bg-[#141414] border border-[#FF6500]/30 text-xs text-[#BDBDBD] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <strong className="text-[#FF7A1A]">Master Social Accounts Manager:</strong> Edit your TikTok, Instagram, Facebook, YouTube, WhatsApp, Discord, or any custom platform. All changes appear live!
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveAndView('social')}
                      className="text-xs text-[#FF7A1A] hover:underline font-mono"
                    >
                      View on Social Section →
                    </button>
                  </div>

                  {/* Existing Social Accounts List */}
                  <div className="space-y-4">
                    {siteData.socialAccounts?.map((account) => (
                      <div
                        key={account.id}
                        className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-4 hover:border-[#FF6500]/40 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-tech text-xs uppercase px-2.5 py-1 rounded-lg bg-[#FF6500]/20 text-[#FF7A1A] font-bold">
                              {account.platform}
                            </span>
                            <span className="font-display font-bold text-sm text-white">
                              {account.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 text-xs font-mono text-[#858585] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={account.isActive}
                                onChange={(e) =>
                                  updateSocialAccount(account.id, { isActive: e.target.checked })
                                }
                                className="accent-[#FF6500] rounded"
                              />
                              <span>Active on Site</span>
                            </label>

                            <a
                              href={account.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#858585] hover:text-[#FF7A1A] transition-colors"
                              title="Test link in new tab"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            {socialToDelete === account.id ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-red-400">Delete?</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    removeSocialAccount(account.id);
                                    setSocialToDelete(null);
                                  }}
                                  className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold"
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSocialToDelete(null)}
                                  className="px-1.5 py-0.5 text-[10px] text-[#858585]"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setSocialToDelete(account.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#858585] hover:text-red-400 transition-colors"
                                title="Remove account"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Editable Social Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div className="lg:col-span-2">
                            <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                              Account / Profile URL (Direct Link)
                            </label>
                            <input
                              type="text"
                              value={account.url}
                              onChange={(e) =>
                                updateSocialAccount(account.id, { url: e.target.value })
                              }
                              placeholder="https://..."
                              className="w-full px-3 py-2 rounded-xl bg-[#181818] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                              Username / Handle
                            </label>
                            <input
                              type="text"
                              value={account.username}
                              onChange={(e) =>
                                updateSocialAccount(account.id, { username: e.target.value })
                              }
                              placeholder="@username"
                              className="w-full px-3 py-2 rounded-xl bg-[#181818] border border-white/10 text-[#FFB347] text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                              Display Title
                            </label>
                            <input
                              type="text"
                              value={account.title}
                              onChange={(e) =>
                                updateSocialAccount(account.id, { title: e.target.value })
                              }
                              placeholder="e.g. TikTok Platform"
                              className="w-full px-3 py-2 rounded-xl bg-[#181818] border border-white/10 text-white text-xs focus:border-[#FF6500] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                              Badge / Metric Text
                            </label>
                            <input
                              type="text"
                              value={account.badge || ''}
                              onChange={(e) =>
                                updateSocialAccount(account.id, { badge: e.target.value })
                              }
                              placeholder="e.g. 4.2K+ Views"
                              className="w-full px-3 py-2 rounded-xl bg-[#181818] border border-white/10 text-white text-xs focus:border-[#FF6500] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                              Description / Subtitle
                            </label>
                            <input
                              type="text"
                              value={account.description || ''}
                              onChange={(e) =>
                                updateSocialAccount(account.id, { description: e.target.value })
                              }
                              placeholder="Short description"
                              className="w-full px-3 py-2 rounded-xl bg-[#181818] border border-white/10 text-white text-xs focus:border-[#FF6500] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Social Account Form */}
                  <form
                    onSubmit={handleAddSocialSubmit}
                    className="p-5 rounded-2xl bg-[#141414] border border-[#FF6500]/30 space-y-4"
                  >
                    <h5 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#FF7A1A]" />
                      <span>Add Another Social Media Channel</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                          Platform Type
                        </label>
                        <select
                          value={newSocialPlatform}
                          onChange={(e) => setNewSocialPlatform(e.target.value as SocialPlatform)}
                          className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs focus:border-[#FF6500] focus:outline-none"
                        >
                          <option value="tiktok">TikTok</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="youtube">YouTube</option>
                          <option value="discord">Discord</option>
                          <option value="telegram">Telegram</option>
                          <option value="twitter">Twitter / X</option>
                          <option value="github">GitHub</option>
                          <option value="other">Other Platform</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                          Channel Title
                        </label>
                        <input
                          type="text"
                          value={newSocialTitle}
                          onChange={(e) => setNewSocialTitle(e.target.value)}
                          placeholder="e.g. Telegram Channel"
                          className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs focus:border-[#FF6500] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                          Username / Handle
                        </label>
                        <input
                          type="text"
                          required
                          value={newSocialUsername}
                          onChange={(e) => setNewSocialUsername(e.target.value)}
                          placeholder="@handle or number"
                          className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                          Complete URL (Link to profile)
                        </label>
                        <input
                          type="text"
                          required
                          value={newSocialUrl}
                          onChange={(e) => setNewSocialUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                          Badge / Highlights
                        </label>
                        <input
                          type="text"
                          value={newSocialBadge}
                          onChange={(e) => setNewSocialBadge(e.target.value)}
                          placeholder="e.g. 5K Followers"
                          className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs focus:border-[#FF6500] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6500] to-[#D94700] text-black font-display font-bold text-xs shadow-md cursor-pointer"
                    >
                      + Add Social Account Live
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: PHOTO GALLERY MANAGER */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* Upload Info Note */}
                  <div className="p-3.5 rounded-xl bg-[#141414] border border-[#FF6500]/30 text-xs text-[#BDBDBD] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <strong className="text-[#FF7A1A]">Photo Gallery Manager:</strong> Upload photos directly from your device, or paste links from ImgBB, PostImages, Google Drive, or any image host. Viewer pages are automatically converted to direct images!
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveAndView('gallery')}
                      className="text-xs text-[#FF7A1A] hover:underline font-mono"
                    >
                      View on Gallery Section →
                    </button>
                  </div>

                  {/* Add New Photo Form with Device Upload + URL input */}
                  <div className="p-5 rounded-2xl bg-[#141414] border border-[#FF6500]/30 space-y-4">
                    <h5 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#FF7A1A]" />
                      <span>Add New Photo to Gallery</span>
                    </h5>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={galleryFileInputRef}
                      accept="image/*"
                      onChange={handleGalleryFileUpload}
                      className="hidden"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-tech text-[#858585] uppercase">
                            Photo Image URL or File
                          </label>
                          <button
                            type="button"
                            onClick={() => galleryFileInputRef.current?.click()}
                            disabled={isUploadingGalleryPhoto}
                            className="px-2.5 py-1 rounded-lg bg-[#FF6500]/20 hover:bg-[#FF6500]/30 text-[#FF7A1A] border border-[#FF6500]/40 text-[11px] font-display font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-3 h-3" />
                            <span>{isUploadingGalleryPhoto ? 'Uploading...' : 'Choose from Device'}</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          required
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="https://... (or click Choose from Device)"
                          className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                          Category
                        </label>
                        <select
                          value={newPhotoCat}
                          onChange={(e) => setNewPhotoCat(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs focus:border-[#FF6500] focus:outline-none"
                        >
                          <option value="portraits">Portraits</option>
                          <option value="gaming">Gaming Moments</option>
                          <option value="campus">Lalore Campus</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[11px] font-tech text-[#858585] uppercase block mb-1">
                          Photo Title / Caption
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhotoTitle}
                          onChange={(e) => setNewPhotoTitle(e.target.value)}
                          placeholder="e.g. Free Fire Tournament Victory"
                          className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs focus:border-[#FF6500] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Live Preview of New Photo */}
                    {newPhotoUrl && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-black/60 border border-white/10">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-black border border-[#FF6500]/50 shrink-0">
                          <img
                            src={normalizeImageUrl(newPhotoUrl)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="text-xs">
                          <span className="font-display font-bold text-white block">Preview Thumbnail</span>
                          <span className="text-[11px] font-mono text-[#858585] truncate max-w-md block">
                            {newPhotoUrl}
                          </span>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleAddPhotoSubmit}>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6500] to-[#D94700] text-black font-display font-bold text-xs shadow-md cursor-pointer"
                      >
                        + Add Photo Live
                      </button>
                    </form>
                  </div>

                  {/* Existing Photos List */}
                  <div>
                    <h5 className="font-display font-bold text-xs text-[#858585] uppercase tracking-wider mb-3">
                      Current Gallery Photos ({siteData.galleryPhotos?.length || 0})
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                      {siteData.galleryPhotos?.map((photo) => (
                        <div
                          key={photo.id}
                          className="p-3 rounded-xl bg-[#141414] border border-white/5 space-y-2 hover:border-[#FF6500]/40 transition-colors"
                        >
                          {editingPhotoId === photo.id ? (
                            /* Inline Edit Mode */
                            <div className="space-y-2 text-xs">
                              <div>
                                <label className="text-[10px] text-[#858585] uppercase font-tech block mb-0.5">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  value={editPhotoTitle}
                                  onChange={(e) => setEditPhotoTitle(e.target.value)}
                                  className="w-full px-2 py-1 rounded bg-[#181818] border border-white/10 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-[#858585] uppercase font-tech block mb-0.5">
                                  URL
                                </label>
                                <input
                                  type="text"
                                  value={editPhotoUrl}
                                  onChange={(e) => setEditPhotoUrl(e.target.value)}
                                  className="w-full px-2 py-1 rounded bg-[#181818] border border-white/10 text-white text-xs font-mono"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-[#858585] uppercase font-tech block mb-0.5">
                                  Category
                                </label>
                                <select
                                  value={editPhotoCat}
                                  onChange={(e) => setEditPhotoCat(e.target.value as any)}
                                  className="w-full px-2 py-1 rounded bg-[#181818] border border-white/10 text-white text-xs"
                                >
                                  <option value="portraits">Portraits</option>
                                  <option value="gaming">Gaming Moments</option>
                                  <option value="campus">Lalore Campus</option>
                                </select>
                              </div>
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleSaveEditPhoto(photo.id)}
                                  className="px-3 py-1 rounded bg-[#FF6500] text-black font-bold text-[11px]"
                                >
                                  Save Photo
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingPhotoId(null)}
                                  className="px-2 py-1 text-[11px] text-[#858585]"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* Display Mode */
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-14 h-14 rounded-lg bg-black overflow-hidden shrink-0 border border-white/10">
                                  <img
                                    src={normalizeImageUrl(photo.url)}
                                    alt={photo.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="overflow-hidden">
                                  <span className="font-display font-bold text-xs text-white truncate block">
                                    {photo.title}
                                  </span>
                                  <span className="text-[10px] font-tech text-[#FF7A1A] uppercase">
                                    {photo.category}
                                  </span>
                                  <span className="text-[10px] font-mono text-[#858585] truncate block">
                                    {photo.url}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleStartEditPhoto(photo)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#858585] hover:text-[#FF7A1A]"
                                  title="Edit photo"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                {photoToDelete === photo.id ? (
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        removeGalleryPhoto(photo.id);
                                        setPhotoToDelete(null);
                                      }}
                                      className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold"
                                    >
                                      Delete
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setPhotoToDelete(null)}
                                      className="px-1 text-[10px] text-[#858585]"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setPhotoToDelete(photo.id)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#858585] hover:text-red-400"
                                    title="Delete photo"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ALL IMAGE HOST LINKS & DEVICE UPLOADS */}
              {activeTab === 'images' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-[#141414] border border-white/5 text-xs text-[#BDBDBD] font-body flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#FF7A1A] shrink-0 mt-0.5" />
                    <div>
                      Upload photos directly from your device OR paste direct image links from ImgBB, PostImages, Google Drive, Imgur, or iili.io. All images are rendered live!
                    </div>
                  </div>

                  {/* Hidden file pickers for main images */}
                  <input
                    type="file"
                    ref={profileFileInputRef}
                    accept="image/*"
                    onChange={(e) => handleGenericFileUpload(e, 'profilePhotoUrl')}
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={campusFileInputRef}
                    accept="image/*"
                    onChange={(e) => handleGenericFileUpload(e, 'schoolPhotoUrl')}
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={logoFileInputRef}
                    accept="image/*"
                    onChange={(e) => handleGenericFileUpload(e, 'schoolLogoUrl')}
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={gamingFileInputRef}
                    accept="image/*"
                    onChange={(e) => handleGenericFileUpload(e, 'gamingPhotoUrl')}
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Profile Photo Host URL */}
                    <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-tech text-[#FFB347] uppercase font-bold">
                          Hero Profile Photo
                        </label>
                        <button
                          type="button"
                          onClick={() => profileFileInputRef.current?.click()}
                          className="px-2 py-0.5 rounded bg-[#FF6500]/20 hover:bg-[#FF6500]/30 text-[#FF7A1A] border border-[#FF6500]/40 text-[10px] font-display font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload File</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={siteData.profilePhotoUrl}
                        onChange={(e) => updateField('profilePhotoUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                      />
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-[#FF6500] bg-black shrink-0">
                          <img
                            src={normalizeImageUrl(siteData.profilePhotoUrl) || 'https://i.ibb.co/93yZ0YPT/file-00000000a02c8211b7422677595ebb98-1.jpg'}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-[#858585]">Live preview thumbnail</span>
                      </div>
                    </div>

                    {/* School Campus Photo Host URL */}
                    <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-tech text-[#FFB347] uppercase font-bold">
                          School Campus Photo (16:9)
                        </label>
                        <button
                          type="button"
                          onClick={() => campusFileInputRef.current?.click()}
                          className="px-2 py-0.5 rounded bg-[#FF6500]/20 hover:bg-[#FF6500]/30 text-[#FF7A1A] border border-[#FF6500]/40 text-[10px] font-display font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload File</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={siteData.schoolPhotoUrl}
                        onChange={(e) => updateField('schoolPhotoUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                      />
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-16 h-10 rounded-lg overflow-hidden border border-[#FF6500] bg-black shrink-0">
                          <img
                            src={normalizeImageUrl(siteData.schoolPhotoUrl) || 'https://i.ibb.co/L2zK7s5/file-0000000059c48211974701cfc407a37a.png'}
                            alt="Campus Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-[#858585]">Live campus preview</span>
                      </div>
                    </div>

                    {/* School Logo Host URL */}
                    <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-tech text-[#FFB347] uppercase font-bold">
                          School Logo / Insignia
                        </label>
                        <button
                          type="button"
                          onClick={() => logoFileInputRef.current?.click()}
                          className="px-2 py-0.5 rounded bg-[#FF6500]/20 hover:bg-[#FF6500]/30 text-[#FF7A1A] border border-[#FF6500]/40 text-[10px] font-display font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload File</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={siteData.schoolLogoUrl}
                        onChange={(e) => updateField('schoolLogoUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                      />
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#FF6500] bg-white p-1 shrink-0 flex items-center justify-center">
                          <img
                            src={normalizeImageUrl(siteData.schoolLogoUrl) || 'https://iili.io/nVDIIYN.th.jpg'}
                            alt="Logo Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-xs text-[#858585]">Official seal preview</span>
                      </div>
                    </div>

                    {/* Gaming Photo Host URL */}
                    <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-tech text-[#FFB347] uppercase font-bold">
                          Free Fire In-Game Character / Stats Card
                        </label>
                        <button
                          type="button"
                          onClick={() => gamingFileInputRef.current?.click()}
                          className="px-2 py-0.5 rounded bg-[#FF6500]/20 hover:bg-[#FF6500]/30 text-[#FF7A1A] border border-[#FF6500]/40 text-[10px] font-display font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload File</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={siteData.gamingPhotoUrl}
                        onChange={(e) => updateField('gamingPhotoUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white text-xs font-mono focus:border-[#FF6500] focus:outline-none"
                      />
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#FF6500] bg-black shrink-0">
                          <img
                            src={normalizeImageUrl(siteData.gamingPhotoUrl) || 'https://iili.io/K8fPhe1.png'}
                            alt="Gaming Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-[#858585]">Live player card preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SCHOOL & ACADEMIC INFO */}
              {activeTab === 'school' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      School Official Name
                    </label>
                    <input
                      type="text"
                      value={siteData.schoolName}
                      onChange={(e) => updateField('schoolName', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      EIIN Number
                    </label>
                    <input
                      type="text"
                      value={siteData.eiinNumber}
                      onChange={(e) => updateField('eiinNumber', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm font-mono focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Academic Class
                    </label>
                    <input
                      type="text"
                      value={siteData.academicClass}
                      onChange={(e) => updateField('academicClass', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      School Location
                    </label>
                    <input
                      type="text"
                      value={siteData.schoolLocation}
                      onChange={(e) => updateField('schoolLocation', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      School Description
                    </label>
                    <textarea
                      rows={3}
                      value={siteData.schoolDescription}
                      onChange={(e) => updateField('schoolDescription', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: GAMING PROFILE */}
              {activeTab === 'gaming' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Main Game
                    </label>
                    <input
                      type="text"
                      value={siteData.mainGame}
                      onChange={(e) => updateField('mainGame', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Free Fire UID / Player ID
                    </label>
                    <input
                      type="text"
                      value={siteData.freeFireId}
                      onChange={(e) => updateField('freeFireId', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm font-mono text-[#FFB347] focus:border-[#FF6500] focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Present Level
                    </label>
                    <input
                      type="text"
                      value={siteData.presentLevel}
                      onChange={(e) => updateField('presentLevel', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm font-mono focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      TikTok Viral Video Views Metric
                    </label>
                    <input
                      type="text"
                      value={siteData.tiktokViralViews}
                      onChange={(e) => updateField('tiktokViralViews', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm font-bold text-[#FFB347] focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Gaming Hardware Specs / Device
                    </label>
                    <input
                      type="text"
                      value={siteData.deviceSpecs}
                      onChange={(e) => updateField('deviceSpecs', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 7: STUDENT LIFE */}
              {activeTab === 'student' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Favorite Subject
                    </label>
                    <input
                      type="text"
                      value={siteData.favoriteSubject || 'English'}
                      onChange={(e) => updateField('favoriteSubject', e.target.value)}
                      placeholder="e.g. English"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Class Rank
                    </label>
                    <input
                      type="text"
                      value={siteData.classRank || 'Top 6'}
                      onChange={(e) => updateField('classRank', e.target.value)}
                      placeholder="e.g. Top 6"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Hobby
                    </label>
                    <input
                      type="text"
                      value={siteData.studentHobby || 'Tournament Player'}
                      onChange={(e) => updateField('studentHobby', e.target.value)}
                      placeholder="e.g. Tournament Player"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-[#858585] uppercase block mb-1">
                      Personal Interest
                    </label>
                    <input
                      type="text"
                      value={siteData.studentInterest || 'Reads comics & visual art'}
                      onChange={(e) => updateField('studentInterest', e.target.value)}
                      placeholder="e.g. Reads comics & visual art"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#FF6500] focus:outline-none"
                    />
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        {isAuthenticated && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#111111]/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={logout}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#858585] hover:text-white text-xs font-display flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock & Sign Out</span>
              </button>

              {lastSavedAt && (
                <span className="text-[11px] font-mono text-[#858585]">
                  Last synced: {lastSavedAt.toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleSaveAndView()}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-display font-medium transition-colors cursor-pointer"
              >
                View on Website →
              </button>

              <button
                type="button"
                onClick={handleSaveAndPublish}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF6500] via-[#FF7A1A] to-[#D94700] text-black font-display font-black text-xs shadow-[0_0_20px_rgba(255,101,0,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isSaving ? 'Publishing...' : 'Save & Publish Live'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
