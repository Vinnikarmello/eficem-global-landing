import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";

type TextBlockAnimationProps = {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
};

export default function TextBlockAnimation(props: TextBlockAnimationProps) {
  const { lang } = useI18n();

  // SplitText owns the animated DOM. Recreate it for each language so its
  // saved original markup cannot overwrite React's newly translated text.
  return <AnimatedTextBlock key={lang} {...props} />;
}

function AnimatedTextBlock({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#76B82A",
  stagger = 0.08,
  duration = 0.6,
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;
      // Respeita a preferência de reduzir movimento
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.registerPlugin(SplitText, ScrollTrigger);

      const split = new SplitText(el, {
        type: "lines",
        linesClass: "block-line-parent",
      });
      const lines = split.lines as HTMLElement[];
      const blocks: HTMLElement[] = [];

      lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.display = "block";
        wrapper.style.overflow = "hidden";

        const block = document.createElement("div");
        block.style.position = "absolute";
        block.style.inset = "0";
        block.style.backgroundColor = blockColor;
        block.style.zIndex = "2";
        block.style.transform = "scaleX(0)";
        block.style.transformOrigin = "left center";

        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        wrapper.appendChild(block);
        gsap.set(line, { opacity: 0 });
        blocks.push(block);
      });

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        ...(animateOnScroll
          ? {
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          : {}),
        delay,
      });

      tl.to(blocks, { scaleX: 1, duration, stagger, transformOrigin: "left center" })
        .set(lines, { opacity: 1, stagger }, `<${duration / 2}`)
        .to(
          blocks,
          { scaleX: 0, duration, stagger, transformOrigin: "right center" },
          `<${duration * 0.4}`,
        );

      return () => {
        tl.kill();
        tl.scrollTrigger?.kill();
        split.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, blockColor, stagger, duration],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
