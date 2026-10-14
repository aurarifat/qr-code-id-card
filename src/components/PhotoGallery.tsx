import React, { useState, useEffect } from 'react';
import { useSiteData, GalleryPhoto as GalleryPhotoType } from '../context/SiteDataContext';
import { ImageLightboxModal } from './ImageLightboxModal';
import { Maximize2, Camera, RefreshCw } from 'lucide-react';
import { normalizeImageUrl, resolveAndNormalizeImageUrl } from '../utils/imageUrl';

interface PhotoCardProps {
  photo: GalleryPhotoType;
  onOpenLightbox: (resolvedUrl: string, title: string, subtitle?: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onOpenLightbox }) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() => normalizeImageUrl(photo.url));
  const [hasResolved, setHasResolved] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync if photo.url changes from props
  useEffect(() => {
    const direct = normalizeImageUrl(photo.url);
    setCurrentSrc(direct);
    setLoadError(false);
    setIsLoading(true);

    // If it looks like a viewer page, resolve right away
    if (
      (/(?:ibb\.co|ibb\.co\.com)\/[a-zA-Z0-9]+/i.test(direct) && !direct.includes('i.ibb.co/')) ||
      (/postimg\.cc\/[a-zA-Z0-9]+/i.test(direct) && !direct.includes('i.postimg.cc/'))
    ) {
      resolveAndNormalizeImageUrl(direct).then((res) => {
        if (res && res !== direct) {
          setCurrentSrc(res);
          setHasResolved(true);
        }
      });
    }
  }, [photo.url]);

  const handleImageError = async () => {
    if (!hasResolved) {
      setHasResolved(true);
      try {
        const resolved = await resolveAndNormalizeImageUrl(photo.url);
        if (resolved && resolved !== currentSrc) {
          setCurrentSrc(resolved);
          setLoadError(false);
          return;
        }
      } catch {
        // failed
      }
    }
    setIsLoading(false);
    setLoadError(true);
  };

  return (
    <div
      onClick={() => onOpenLightbox(currentSrc, photo.title, photo.description)}
      className="group relative rounded-3xl overflow-hidden bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 border border-[#FF6500]/25 hover:border-[#FF6500] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(255,101,0,0.2)] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
    >
      {/* Image Frame */}
      <div className="relative aspect-[4/3] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
        {isLoading && !loadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#101010] z-10">
            <RefreshCw className="w-5 h-5 text-[#FF6500] animate-spin" />
          </div>
        )}

        {!loadError ? (
          <img
            key={currentSrc}
            src={currentSrc}
            alt={photo.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#181818] to-[#0D0D0D] text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6500]/15 border border-[#FF6500]/30 flex items-center justify-center text-[#FF7A1A] mb-3">
              <Camera className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-white text-sm line-clamp-1">
              {photo.title}
            </h4>
            <span className="text-[11px] font-mono text-[#858585] mt-1">
              {photo.category.toUpperCase()} • Archive Photo
            </span>
            <span className="text-[10px] text-[#FF7A1A] mt-2 underline">
              Click to view direct image
            </span>
          </div>
        )}

        {/* Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

        {/* Top Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-tech text-[#FFB347] uppercase tracking-wider z-20">
          {photo.category}
        </div>

        {/* Quick View Button */}
        <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white group-hover:bg-[#FF6500] group-hover:text-black transition-colors z-20">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>

        {/* Overlay Caption on Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-20">
          <h3 className="font-display font-bold text-lg leading-tight group-hover:text-[#FF7A1A] transition-colors line-clamp-1">
            {photo.title}
          </h3>
          {photo.description && (
            <p className="text-xs text-[#BDBDBD] line-clamp-1 mt-0.5">
              {photo.description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 py-3 border-t border-white/5 dark:border-white/5 light:border-black/5 flex items-center justify-between text-[11px] font-mono text-[#858585]">
        <span className="flex items-center gap-1.5">
          <Camera className="w-3 h-3 text-[#FF7A1A]" />
          <span>Aura Archive</span>
        </span>
        <span className="text-[#FF7A1A] font-semibold group-hover:translate-x-1 transition-transform">
          View FHD →
        </span>
      </div>
    </div>
  );
};

export const PhotoGallery: React.FC = () => {
  const { siteData } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'portraits' | 'gaming' | 'campus'>('all');
  const [activePhoto, setActivePhoto] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  const categories = [
    { key: 'all', label: 'All Photos' },
    { key: 'portraits', label: 'Portraits' },
    { key: 'gaming', label: 'Gaming Moments' },
    { key: 'campus', label: 'Lalore Campus' },
  ] as const;

  const photosList = Array.isArray(siteData.galleryPhotos) ? siteData.galleryPhotos : [];

  const filteredPhotos = photosList.filter((photo) => {
    if (selectedCategory === 'all') return true;
    return photo.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#FF6500]" />
              <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
                VISUAL ARCHIVE
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
              Photo Gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
              Official high-resolution photography, esports battle loadouts, and academic campus snapshots.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/80 p-1.5 rounded-2xl border border-white/5 dark:border-white/5 light:border-black/5 backdrop-blur-md self-start md:self-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 text-xs font-display font-medium rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF6500] to-[#D94700] text-black font-bold shadow-[0_0_15px_rgba(255,101,0,0.35)]'
                      : 'text-[#858585] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#121212]/60 border border-white/5">
            <Camera className="w-10 h-10 text-[#FF6500] mx-auto mb-3 opacity-60" />
            <p className="text-[#858585] font-body text-sm">No photos found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onOpenLightbox={(resolvedUrl, title, subtitle) => {
                  setActivePhoto({
                    url: resolvedUrl,
                    title,
                    subtitle,
                  });
                }}
              />
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {activePhoto && (
          <ImageLightboxModal
            isOpen={Boolean(activePhoto)}
            onClose={() => setActivePhoto(null)}
            imageUrl={activePhoto.url}
            title={activePhoto.title}
            subtitle={activePhoto.subtitle}
          />
        )}

      </div>
    </section>
  );
};
