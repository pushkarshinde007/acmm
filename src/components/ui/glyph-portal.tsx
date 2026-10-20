"use client";

/**
 * Glyph Portal ©️ 2026 Christian Katzmann. MIT.
 * Origin: UsefulPortal.astro on https://ktzm.dk → UsefulPortal.tsx → ClarityPortal.tsx.
 * A scroll-driven camera through live type. Keep this notice with copies.
 */
import React, {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type GlyphPortalStyle = CSSProperties & {
  "--gp-paper"?: string;
  "--gp-ink"?: string;
  "--gp-field"?: string;
  "--gp-foreground"?: string;
  "--gp-word-top"?: string;
  "--gp-word-bottom"?: string;
};

export type GlyphPortalProps = {
  word?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  style?: GlyphPortalStyle;
  className?: string;
  scrollLength?: number;
  interactive?: boolean;
  annotations?: boolean;
  enterLabel?: string;
  front?: ReactNode;
  children?: ReactNode;
  activeLetter?: string;
  onLetterChange?: (letter: string) => void;
};

export const GlyphPortal: React.FC<GlyphPortalProps> = ({
  word = "COMMUNITY",
  fontFamily = "inherit",
  fontWeight = 700,
  style = {},
  className = "",
  scrollLength = 2.4,
  interactive = true,
  annotations = false,
  enterLabel = "Step inside",
  front,
  children,
  activeLetter,
  onLetterChange,
}) => {
  const portalId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Map<number, HTMLSpanElement>>(new Map());

  // Split word into letters
  const letters = word.split("");

  // Default selected letter index: prioritized to 'M' or provided activeLetter
  const targetLetter = (activeLetter || "M").toUpperCase();
  const foundIdx = letters.findIndex((l) => l.toUpperCase() === targetLetter);
  const defaultIdx = foundIdx !== -1 ? foundIdx : Math.max(0, Math.floor(letters.length / 2));

  const [selectedIdx, setSelectedIdx] = useState(defaultIdx);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync external activeLetter if provided
  useLayoutEffect(() => {
    if (activeLetter) {
      const idx = letters.findIndex((l) => l.toUpperCase() === activeLetter.toUpperCase());
      if (idx !== -1) setSelectedIdx(idx);
    }
  }, [activeLetter, letters]);

  // Track scroll progress within container with rAF throttle
  useLayoutEffect(() => {
    let frameId = 0
    let lastP = -1

    const updateScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1)
      if (Math.abs(progress - lastP) > 0.001) {
        lastP = progress
        setScrollProgress(progress)
      }
    }

    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateScroll)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    updateScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(frameId)
    }
  }, [])

  // Calculate transform zoom: camera travels through the chosen letter
  // Progress 0.0 -> 0.4: Front content visible, gentle zoom
  // Progress 0.4 -> 0.8: Rapid exponential magnification through the glyph's opening
  // Progress 0.8 -> 1.0: Portal cleared, reveals interior children content
  const zoomFactor = Math.pow(scrollProgress, 2.5) * 65 + 1;
  const frontOpacity = Math.max(1 - scrollProgress * 2.8, 0);
  const contentOpacity = Math.min(Math.max((scrollProgress - 0.55) / 0.35, 0), 1);
  const isInsidePortal = scrollProgress >= 0.85;

  const handleSelectLetter = (index: number) => {
    if (!interactive) return;
    setSelectedIdx(index);
    onLetterChange?.(letters[index]);
  };

  return (
    <div
      ref={containerRef}
      id={`glyph-portal-${portalId}`}
      className={`relative w-full ${className}`}
      style={{
        height: `${scrollLength * 100}vh`,
        ...style,
      }}
    >
      {/* Sticky Fullscreen Camera Rig */}
      <div
        className="sticky top-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: "var(--gp-field, #FAF7EF)",
          color: "var(--gp-foreground, #102033)",
        }}
      >
        {/* 1. Front Editorial Layer (Fades out as camera approaches) */}
        {front && (
          <div
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
            style={{ opacity: frontOpacity }}
          >
            {front}
          </div>
        )}

        {/* 2. The Live Type Word Camera Plane */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{
            perspective: "1200px",
          }}
        >
          <div
            ref={wordRef}
            className="will-change-transform flex items-center justify-center select-none"
            style={{
              fontFamily,
              fontWeight,
              transformOrigin: "center center",
              transform: `scale(${zoomFactor}) translate3d(${
                (defaultIdx - selectedIdx) * (scrollProgress * 25)
              }px, 0, 0)`,
              color: "var(--gp-ink, #071B34)",
            }}
          >
            {letters.map((char, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <span
                  key={idx}
                  ref={(el) => {
                    if (el) letterRefs.current.set(idx, el);
                    else letterRefs.current.delete(idx);
                  }}
                  onClick={() => handleSelectLetter(idx)}
                  className={`inline-block transition-colors cursor-pointer ${
                    interactive ? "pointer-events-auto" : ""
                  } ${
                    isSelected
                      ? "text-[#1457A6] drop-shadow-sm"
                      : "text-current opacity-90"
                  }`}
                  style={{
                    fontSize: "clamp(4.5rem, 15vw, 16rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* 4. Revealed Interior Portal Content (Children revealed upon stepping through) */}
        <div
          data-gp-content
          className={`relative z-20 w-full h-full flex items-center justify-center transition-all duration-700 ${
            isInsidePortal ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{
            opacity: contentOpacity,
            transform: `scale(${0.92 + contentOpacity * 0.08})`,
          }}
        >
          {children}
        </div>

        {/* 5. Accessible Step Inside Indicator when paused near threshold */}
        {scrollProgress > 0.25 && scrollProgress < 0.7 && (
          <div
            data-gp-caption
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7EF]/90 border border-[#071B34]/15 shadow-sm text-xs font-mono font-medium text-[#071B34]"
          >
            <span className="w-2 h-2 rounded-full bg-[#1457A6] animate-pulse" />
            <span>
              {enterLabel}: &ldquo;{letters[selectedIdx]}&rdquo;
            </span>
            {annotations && (
              <span className="text-[10px] opacity-60 ml-1">
                [idx: {selectedIdx + 1}/{letters.length}]
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlyphPortal;
