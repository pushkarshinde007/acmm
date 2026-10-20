"use client"

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.

import * as React from "react"
import {
  Laptop,
  Users,
  Palette,
  Terminal,
  FlaskConical,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Globe,
  Cpu,
  Cloud,
  Shield,
  Calendar,
  Briefcase,
  Coins,
  Handshake,
  Layout,
  PenTool,
  Video,
  Sparkles,
  Award,
  GitBranch,
  FileText,
  BookOpen,
  Lightbulb,
  Network,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type DomainItem, domainsData } from "@/core/config/domains.data"

export interface WorksWheelItem {
  /** Project/Domain name. Shown beside the front card and in the index. */
  title: string
  /** Cover art. Any src an <img> takes. */
  image: string
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string
  /** Optional domain number (e.g. "01") */
  number?: string
  /** Optional short description/tagline */
  tagline?: string
  /** Optional icon name */
  icon?: string
  /** Optional accent color */
  accentColor?: string
  /** Optional accent glow */
  accentGlow?: string
  /** Associated domain item */
  domain?: DomainItem
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items?: WorksWheelItem[]
  domains?: DomainItem[]
  activeDomainId?: string
  onDomainChange?: (domain: DomainItem) => void
  onExploreDomain?: (domain: DomainItem) => void
  /** Sits in the middle of the ring at rest. @default "DOMAINS" */
  label?: string
  /** Label on the card's action affordance. @default "Explore Domain" */
  action?: string
  /** Initial turn value. 0 = ring at rest, 1 = first domain at front */
  initialTurn?: number
  /** Controlled turn value from page scroll progress */
  controlledTurn?: number
  /** Callback when user requests a turn by clicking arrows, index, or toggle */
  onRequestTurn?: (targetTurn: number) => void
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.46 // front card height, of the stage
const CARD_MAX_W = 0.40 // ... but never wider than this much of the stage
const CARD_RATIO = 1.38 // card width / height
const STEP = 36 // degrees between cards on the drum
const DRUM = 2.15 // drum radius, in card heights - and everything below likewise
const LENS = 2.65 // perspective distance
const RING_R = 1.12 // ring radius
/* The drum curves away round an arc whose centre sits off to the LEFT,
   so the piece at the front is at the arc's near point - dead centre - and its
   neighbours have already swung back left as well as up and down. BOW is that arc's radius. */
const BOW = 1.85
const TITLE = 0.12 // ring label and front-card title
const INDEX = 0.038 // the index down the right-hand side
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.8

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 850
const DRAG_UNITS = 400
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 150
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

type Stage = { w: number; h: number }

const rad = (deg: number) => (deg * Math.PI) / 180

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)))

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  )
}

// Icon dictionary
const iconDictionary: Record<string, React.ComponentType<{ className?: string }>> = {
  Laptop,
  Users,
  Palette,
  Terminal,
  FlaskConical,
  Globe,
  Cpu,
  Cloud,
  Shield,
  Calendar,
  Briefcase,
  Coins,
  Handshake,
  Layout,
  PenTool,
  Video,
  Sparkles,
  Award,
  GitBranch,
  FileText,
  BookOpen,
  Lightbulb,
  Network,
}

export function WorksWheel({
  items,
  domains = domainsData,
  activeDomainId,
  onDomainChange,
  onExploreDomain,
  label = "OUR DOMAINS",
  action = "Explore Domain",
  initialTurn = 0,
  controlledTurn,
  onRequestTurn,
  className,
  ...props
}: WorksWheelProps) {
  // Convert domains to wheel items if items not directly provided
  const wheelItems: WorksWheelItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items
    return domains.map((d) => ({
      title: d.name,
      image: d.image,
      number: d.number,
      tagline: d.tagline,
      icon: d.icon,
      accentColor: d.accentColor,
      accentGlow: d.accentGlow,
      domain: d,
    }))
  }, [items, domains])

  const stageRef = React.useRef<HTMLDivElement>(null)
  const wheelRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLElement | null)[]>([])
  const labelRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLDivElement>(null)

  // The wheel's position, and where it is heading. Only `active` is state -
  // everything else is written to the DOM, so turning the wheel is not a render.
  const turn = React.useRef(initialTurn)
  const target = React.useRef(initialTurn)
  const [active, setActive] = React.useState(0)
  const [currentTurnVal, setCurrentTurnVal] = React.useState(initialTurn)
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 })

  const count = wheelItems.length
  const last = Math.max(count - 1, 0)

  // Sync external activeDomainId if specified
  React.useEffect(() => {
    if (activeDomainId) {
      const idx = domains.findIndex((d) => d.id === activeDomainId)
      if (idx !== -1) {
        // If wheel is already at drum stage (target >= 0.5), align to that domain
        if (target.current >= 0.5) {
          target.current = idx + 1
        }
      }
    }
  }, [activeDomainId, domains])

  // Reduced motion support
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const read = () => setReduced(query.matches)
    read()
    query.addEventListener("change", read)
    return () => query.removeEventListener("change", read)
  }, [])

  // Responsive stage measurement
  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const metrics = React.useMemo(() => {
    const { w, h } = stage
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W)
    const cardH = cardW / CARD_RATIO
    const drumR = cardH * DRUM
    const ringR = cardH * RING_R
    // Shrink the ring's cards until the circle reads as a closed loop
    const ringScale = count
      ? clamp(((2 * Math.PI * ringR) / count) * 0.82 / (cardW || 1), 0.16, 0.95)
      : 1
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    }
  }, [stage, count])

  // Turn step updater
  const to = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, last + 1)
      target.current = clamped
      onRequestTurn?.(clamped)
    },
    [last, onRequestTurn]
  )

  // Sync controlled turn from external sticky scroll if provided
  React.useEffect(() => {
    if (controlledTurn !== undefined) {
      target.current = clamp(controlledTurn, 0, last + 1)
    }
  }, [controlledTurn, last])

  // One pass per frame: ease toward target, write transforms straight to DOM
  React.useEffect(() => {
    if (!stage.h) return
    let frame = 0
    const { ringR, ringScale, drumR, bow } = metrics

    const draw = () => {
      frame = requestAnimationFrame(draw)
      const gap = target.current - turn.current
      if (Math.abs(gap) < 0.0005) turn.current = target.current
      else turn.current += gap * (reduced ? 1 : EASE)

      const t = turn.current
      const m = clamp(t, 0, 1)
      const pos = Math.max(0, t - 1)

      // Set-back arrives with drum
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos
        const drumDeg = d * STEP
        const card = cardRefs.current[i]
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m
          )
          // Culled by distance
          const isHidden = m > 0.5 && Math.abs(d) > CULL
          card.style.opacity = isHidden ? "0" : "1"
          card.style.pointerEvents = isHidden ? "none" : "auto"
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 4))

          // Subtle glow and highlight for front card on drum
          const isFront = m > 0.6 && Math.abs(d) < 0.35
          const cardInner = card.querySelector(".card-surface") as HTMLElement | null
          if (cardInner) {
            if (isFront) {
              cardInner.style.boxShadow =
                "0 0 45px rgba(56, 189, 248, 0.38), 0 20px 40px rgba(7, 27, 52, 0.16)"
              cardInner.style.borderColor = "#38BDF8"
            } else {
              cardInner.style.boxShadow = ""
              cardInner.style.borderColor = ""
            }
          }
        }
        const face = card?.firstElementChild as HTMLElement | null
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`
      }

      // Transition central ring title and front card title
      if (labelRef.current) labelRef.current.style.opacity = String(1 - m)
      if (titleRef.current) titleRef.current.style.opacity = String(m)

      const near = clamp(Math.round(pos), 0, last)
      setActive((prev) => {
        if (prev !== near) {
          const dom = wheelItems[near]?.domain || domains[near]
          if (dom) onDomainChange?.(dom)
          return near
        }
        return prev
      })
      setCurrentTurnVal(t)
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [metrics, stage.h, count, last, reduced, wheelItems, domains, onDomainChange])

  // Wheel interaction: only used when NOT controlled by external page scroll
  const settling = React.useRef(0)
  React.useEffect(() => {
    // If controlled by page scroll, do not intercept wheel events
    if (controlledTurn !== undefined) return

    const el = stageRef.current
    if (!el) return
    const onWheel = (event: WheelEvent) => {
      let next: number
      if (target.current < 0.4 && event.deltaY > 10) {
        next = 1
      } else if (target.current <= 1.2 && event.deltaY < -10 && target.current > 0) {
        next = 0
      } else {
        next = target.current + event.deltaY / WHEEL_UNITS
      }

      if (next > 0 && next < last + 1) event.preventDefault()
      to(next)

      window.clearTimeout(settling.current)
      settling.current = window.setTimeout(
        () => {
          if (target.current < 0.4) to(0)
          else to(clamp(Math.round(target.current), 1, last + 1))
        },
        SETTLE
      )
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      el.removeEventListener("wheel", onWheel)
      window.clearTimeout(settling.current)
    }
  }, [to, last, controlledTurn])

  const drag = React.useRef<number | null>(null)

  // Step controls
  const handleNext = () => {
    if (target.current < 1) to(1)
    else to(Math.round(target.current) + 1)
  }

  const handlePrev = () => {
    if (target.current <= 1) to(0)
    else to(Math.round(target.current) - 1)
  }

  const activeItem = wheelItems[active]
  const ActiveIcon =
    activeItem && activeItem.icon && iconDictionary[activeItem.icon]
      ? iconDictionary[activeItem.icon]
      : Laptop

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] w-full overflow-hidden select-none",
        className
      )}
      {...props}
    >
      {/* 1. Blueprint Technical Circular Guide & Tick Markers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <svg
          viewBox="0 0 700 700"
          className="w-[88%] max-w-[580px] h-auto opacity-30 transition-transform duration-700 ease-out"
          style={{
            transform: `rotate(${currentTurnVal * 45}deg)`,
          }}
          fill="none"
        >
          <circle
            cx="350"
            cy="350"
            r="300"
            stroke="#1764BD"
            strokeWidth="1.2"
            strokeDasharray="4 8"
          />
          <circle
            cx="350"
            cy="350"
            r="250"
            stroke="#071B34"
            strokeWidth="0.8"
            opacity="0.4"
          />
          <circle
            cx="350"
            cy="350"
            r="190"
            stroke="#1764BD"
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24
            return (
              <line
                key={i}
                x1="350"
                y1="50"
                x2="350"
                y2={i % 6 === 0 ? "68" : "58"}
                stroke="#1764BD"
                strokeWidth={i % 6 === 0 ? "2" : "1"}
                transform={`rotate(${angle} 350 350)`}
              />
            )
          })}
        </svg>

        {/* Numbered Blueprint Markers */}
        <div className="absolute top-8 left-[24%] text-[10px] sm:text-[11px] font-mono font-bold text-[#1764BD] bg-[#FAF7EF]/90 px-1 rounded border border-[#1764BD]/20">
          01
        </div>
        <div className="absolute top-8 right-[24%] text-[10px] sm:text-[11px] font-mono font-bold text-[#1764BD] bg-[#FAF7EF]/90 px-1 rounded border border-[#1764BD]/20">
          02
        </div>
        <div className="absolute bottom-8 right-[24%] text-[10px] sm:text-[11px] font-mono font-bold text-[#1764BD] bg-[#FAF7EF]/90 px-1 rounded border border-[#1764BD]/20">
          03
        </div>
        <div className="absolute bottom-8 left-[24%] text-[10px] sm:text-[11px] font-mono font-bold text-[#1764BD] bg-[#FAF7EF]/90 px-1 rounded border border-[#1764BD]/20">
          05
        </div>

        {/* Central Top Guide Label */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#536273] uppercase">
          <span>{currentTurnVal < 0.5 ? "SCROLL OR DRAG TO OPEN" : "TURN TO EXPLORE"}</span>
          <div className="w-3.5 h-5 rounded-full border border-[#071B34]/30 flex items-start justify-center p-0.5">
            <span className="w-1 h-1.5 rounded-full bg-[#1764BD] animate-bounce" />
          </div>
        </div>
      </div>

      {/* 2. Interactive 3D Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-x outline-none active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return
          const delta = drag.current - event.clientY
          if (target.current < 0.4 && delta > 20) {
            to(1)
          } else {
            to(target.current + delta / DRAG_UNITS)
          }
          drag.current = event.clientY
        }}
        onPointerUp={() => {
          drag.current = null
          if (target.current > 0.4) to(clamp(Math.round(target.current), 1, last + 1))
          else to(0)
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            handleNext()
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            handlePrev()
          } else {
            return
          }
          event.preventDefault()
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {wheelItems.map((item, i) => {
            const isSelected = i === active && currentTurnVal >= 0.5
            const IconComp =
              item.icon && iconDictionary[item.icon]
                ? iconDictionary[item.icon]
                : Laptop

            return (
              <div
                key={item.title}
                id={`works-wheel-${i}`}
                role="option"
                aria-selected={isSelected}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node
                }}
                onClick={() => {
                  if (currentTurnVal < 0.5) {
                    // At rest on ring: clicking blows open to this item
                    to(i + 1)
                  } else if (i === active) {
                    // Active card clicked: explore domain
                    if (item.domain) onExploreDomain?.(item.domain)
                  } else {
                    // Turn to this item
                    to(i + 1)
                  }
                }}
                className="group absolute [backface-visibility:hidden] cursor-pointer"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <div
                  className="card-surface relative block size-full overflow-hidden rounded-2xl bg-white border border-[#071B34]/15 shadow-md transition-all duration-300"
                >
                  {/* Card Cover Image */}
                  <div className="relative w-full h-[52%] overflow-hidden bg-[#071B34]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B34] via-[#071B34]/40 to-transparent" />

                    {/* Top Number Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-[#071B34]/85 backdrop-blur-md border border-white/20 text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider">
                      {item.number || `0${i + 1}`}
                    </div>

                    {/* Category Icon Badge */}
                    <div className="absolute bottom-2.5 left-2.5 w-8 h-8 rounded-lg bg-white/95 text-[#1764BD] flex items-center justify-center shadow-md">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Text & Action */}
                  <div className="relative w-full h-[48%] bg-[#FAF7EF] p-3 sm:p-3.5 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-black text-sm sm:text-base text-[#071B34] tracking-tight uppercase leading-tight line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-[11.5px] text-[#536273] font-medium leading-snug mt-1 line-clamp-2">
                        {item.tagline || "Build real-world solutions and explore emerging technologies."}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (item.domain) onExploreDomain?.(item.domain)
                        else to(i + 1)
                      }}
                      className="w-full h-8 sm:h-8.5 rounded-lg bg-[#071B34] hover:bg-[#1764BD] text-white text-[11px] font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200"
                    >
                      <span>{action}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Central Ring Title (Visible at rest when turn = 0) */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center tracking-tight text-center px-4 transition-opacity duration-300"
      >
        <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] text-[#1764BD] uppercase mb-1">
          ACM NMIET
        </span>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#071B34] uppercase tracking-tight">
          {label}
        </h2>
        <span className="text-xs text-[#536273] font-medium mt-1">
          Scroll or drag to blow open wheel
        </span>
      </div>

      {/* 4. Front-Card Title (Visible when drum is open) */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[5%] -translate-y-1/2 tracking-tight opacity-0 hidden xl:flex flex-col max-w-[200px]"
      >
        <ActiveIcon className="w-5 h-5 text-[#1764BD] mb-1" />
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#1764BD] uppercase">
          FOCUS TRACK
        </span>
        <h3 className="font-display font-black text-2xl text-[#071B34] uppercase leading-tight mt-0.5">
          {activeItem?.title}
        </h3>
        <p className="text-xs text-[#536273] font-medium mt-1 line-clamp-3">
          {activeItem?.tagline}
        </p>
      </div>

      {/* 5. Right-Hand Side Vertical Index */}
      <ol
        className="absolute top-6 right-3 sm:right-6 text-right leading-[1.8] z-30 bg-[#FAF7EF]/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-[#071B34]/10 shadow-sm"
        style={{ fontSize: "11px" }}
      >
        <li className="text-[9px] font-mono uppercase tracking-widest text-[#536273] pb-1 border-b border-[#071B34]/10 mb-1">
          DOMAINS INDEX
        </li>
        {wheelItems.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "focus-visible:outline-foreground cursor-pointer transition-colors outline-none font-medium text-xs",
                i === active && currentTurnVal >= 0.5
                  ? "text-[#1764BD] font-bold"
                  : "text-[#536273] hover:text-[#071B34]"
              )}
            >
              <span className="font-mono text-[10px] mr-1 opacity-70">0{i + 1}</span>
              {item.title}
            </button>
          </li>
        ))}
      </ol>

      {/* 6. Step Arrow Controls (Prev / Next) */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Domain"
          className="w-8 h-8 rounded-full bg-white border border-[#071B34]/15 text-[#071B34] hover:text-[#1764BD] hover:border-[#1764BD] flex items-center justify-center shadow-sm hover:scale-105 transition-all"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Domain"
          className="w-8 h-8 rounded-full bg-white border border-[#071B34]/15 text-[#071B34] hover:text-[#1764BD] hover:border-[#1764BD] flex items-center justify-center shadow-sm hover:scale-105 transition-all"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* 7. Bottom Ring-at-Rest / Drum Toggle Pill */}
      <div className="absolute bottom-4 left-4 z-30">
        <button
          type="button"
          onClick={() => {
            if (currentTurnVal < 0.5) to(1)
            else to(0)
          }}
          className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-white/90 border border-[#071B34]/15 hover:border-[#1764BD] text-[#071B34] hover:text-[#1764BD] shadow-sm flex items-center gap-1.5 transition-all"
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: currentTurnVal < 0.5 ? "#536273" : "#1764BD",
            }}
          />
          <span>{currentTurnVal < 0.5 ? "EXPAND DRUM" : "COLLAPSE TO RING"}</span>
        </button>
      </div>
    </section>
  )
}

export default WorksWheel
