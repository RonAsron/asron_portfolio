import React, { useRef, useEffect, useState, useCallback } from "react";
import { SECTION_IDS } from "../../utils/constants";
import supabase from "../../utils/supabaseClient";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollLeftRef = useRef(0);
  const animationFrameId = useRef<number>();
  const translateX = useRef(0);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const getPublicImageUrl = useCallback((filename: string): string => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    // ตรงนี้แก้ให้ path ถูกต้อง (ไม่ต้องมี public/ ซ้ำ)
    return `${supabaseUrl}/storage/v1/object/public/images/public/${filename}`;
  }, []);

  const fetchImagesFromSupabase = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase.storage
        .from("images")
        .list("public", { limit: 100 });

      if (supabaseError) {
        setError("ไม่สามารถโหลดรูปภาพได้ โปรดลองอีกครั้ง");
        return;
      }

      if (!data || data.length === 0) {
        setImages([]);
        return;
      }

      const imageUrls = data
        .filter((file) => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
        .map((file) => ({
          id: file.id || file.name,
          alt: `รูปภาพแกลเลอรี่: ${file.name
            .split(".")[0]
            .replace(/[-_]/g, " ")}`,
          url: getPublicImageUrl(file.name), // ถูกต้อง
        }));

      setImages(imageUrls);
    } catch {
      setError("เกิดข้อผิดพลาดที่ไม่คาดคิด");
    } finally {
      setIsLoading(false);
    }
  }, [getPublicImageUrl]);

  useEffect(() => {
    fetchImagesFromSupabase();
  }, [fetchImagesFromSupabase]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isInteracting) {
        translateX.current -= scrollSpeed;
        const contentWidth = container.scrollWidth / 2;
        if (Math.abs(translateX.current) >= contentWidth) {
          translateX.current = 0;
        }
        container.style.transform = `translateX(${translateX.current}px)`;
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current!);
  }, [isInteracting]);

  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    scrollLeftRef.current = translateX.current;
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const walk = clientX - startX;
      translateX.current = scrollLeftRef.current + walk;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${translateX.current}px)`;
      }
    },
    [isDragging, startX]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section
      id={SECTION_IDS.GALLERY}
      className="py-16 bg-gradient-to-br from-background to-muted dark:from-dark-background dark:to-dark-muted px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-primary dark:text-dark-foreground">
        Gallery
      </h2>

      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      {!isLoading && !error && images.length === 0 && (
        <div className="text-center text-gray-500">ไม่มีรูปภาพที่จะแสดง</div>
      )}

      {!isLoading && !error && images.length > 0 && (
        <div
          className="relative overflow-hidden select-none"
          style={{ height: "240px", cursor: isDragging ? "grabbing" : "grab" }}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => {
            setIsInteracting(false);
            handleEnd();
          }}
          onMouseDown={(e) => handleStart(e.pageX)}
          onMouseMove={(e) => handleMove(e.pageX)}
          onMouseUp={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].pageX)}
          onTouchMove={(e) => handleMove(e.touches[0].pageX)}
          onTouchEnd={handleEnd}
        >
          <div
            ref={containerRef}
            className="flex gap-4 will-change-transform transition-none"
            style={{ width: "fit-content", display: "inline-flex" }}
          >
            {[...images, ...images].map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="flex-none w-80 h-60 rounded-lg overflow-hidden shadow-md relative flex justify-center items-center bg-gray-100 dark:bg-gray-800"
              >
                {!loadedImages[`${image.id}-${index}`] && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={image.url}
                  alt={image.alt}
                  className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
                    loadedImages[`${image.id}-${index}`] ? "block" : "hidden"
                  }`}
                  loading="lazy"
                  draggable={false}
                  onLoad={() => handleImageLoad(`${image.id}-${index}`)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
