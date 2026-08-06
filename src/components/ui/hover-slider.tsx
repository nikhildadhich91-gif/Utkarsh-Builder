import * as React from "react"
import type { HTMLMotionProps } from "framer-motion"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface HoverSliderProps {
  children?: React.ReactNode;
}

interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    )
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & HoverSliderProps & {
    activeSlide: number;
    changeSlide: (index: number) => void;
  }
>(({ children, className, activeSlide, changeSlide, ...props }, ref) => {
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

interface HoverSliderImageProps {
  index: number
  imageUrl: string
}

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.img
      className={cn("inline-block align-middle object-cover w-full h-full", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      src={imageUrl}
      ref={ref}
      {...props}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"
