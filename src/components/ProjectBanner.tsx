import * as React from "react"
import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion"
import type { HTMLMotionProps, Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

// Helper function to merge class names locally
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(" ")
}

interface ContainerScrollContextValue {
  scrollY: MotionValue<number>
}

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3,
}

const blurVariants: Variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
  },
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}

export const ContainerScroll = ({
  children,
  className,
  style,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { scrollY } = useScroll()

  return (
    <ContainerScrollContext.Provider value={{ scrollY }}>
      <div
        className={cn("relative min-h-[150vh]", className)}
        style={{
          perspective: "1200px",
          perspectiveOrigin: "center center",
          transformStyle: "preserve-3d",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}
ContainerScroll.displayName = "ContainerScroll"

export const ContainerSticky = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "sticky left-0 top-0 w-full overflow-hidden",
        className
      )}
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        ...style,
      }}
      {...props}
    />
  )
}
ContainerSticky.displayName = "ContainerSticky"

export const GalleryContainer = ({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">) => {
  const { scrollY } = useContainerScrollContext()
  const rotateX = useTransform(scrollY, [0, 450], [60, 0])
  const scale = useTransform(scrollY, [0, 450], [0.92, 1])
  const filter = useTransform(scrollY, [0, 100], ["blur(3px)", "blur(0px)"])
  const opacity = useTransform(scrollY, [0, 100], [0.85, 1])

  return (
    <motion.div
      className={cn(
        "relative grid size-full grid-cols-3 gap-3 md:gap-4 rounded-2xl",
        className
      )}
      style={{
        rotateX,
        scale,
        filter,
        opacity,
        transformStyle: "preserve-3d",
        perspective: "1200px",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
GalleryContainer.displayName = "GalleryContainer"

export const GalleryCol = ({
  className,
  style,
  yRange = ["0%", "-10%"],
  ...props
}: HTMLMotionProps<"div"> & { yRange?: string[] }) => {
  const { scrollY } = useContainerScrollContext()
  const y = useTransform(scrollY, [0, 600], yRange)

  return (
    <motion.div
      className={cn("relative flex w-full flex-col gap-3 md:gap-4", className)}
      style={{
        y,
        ...style,
      }}
      {...props}
    />
  )
}
GalleryCol.displayName = "GalleryCol"

export const ContainerStagger = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, viewport, transition, ...props }, ref) => {
  return (
    <motion.div
      className={cn("relative", className)}
      ref={ref}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true || viewport?.once, ...viewport }}
      transition={{
        staggerChildren: transition?.staggerChildren || 0.2,
        ...transition,
      }}
      {...props}
    />
  )
})
ContainerStagger.displayName = "ContainerStagger"

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={blurVariants}
      transition={SPRING_CONFIG || transition}
      {...props}
    />
  )
})
ContainerAnimated.displayName = "ContainerAnimated"

interface GalleryItem {
  id: string
  name: string
  category: string
  location: string
  image: string
}

const column1Items: GalleryItem[] = [
  {
    id: "col1-1",
    name: "Nextlevel Studio",
    category: "Commercial Development",
    location: "Jaipur, Rajasthan",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85"
  },
  {
    id: "col1-2",
    name: "Solaris Commercial Plaza",
    category: "Corporate Office Complex",
    location: "Jaipur, Rajasthan",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85"
  },
  {
    id: "col1-3",
    name: "Aura Luxury Residences",
    category: "Bespoke Residential",
    location: "Jaipur, Rajasthan",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
  },
  {
    id: "col1-4",
    name: "Vedic Villa Resort",
    category: "Bespoke Residential",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
]

const column2Items: GalleryItem[] = [
  {
    id: "col2-1",
    name: "Aura Luxury Residences",
    category: "Bespoke Residential",
    location: "Jaipur, Rajasthan",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85"
  },
  {
    id: "col2-2",
    name: "Nextlevel Studio",
    category: "Commercial Development",
    location: "Jaipur, Rajasthan",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
  },
  {
    id: "col2-3",
    name: "Pink Square Showroom",
    category: "Interior Design",
    location: "Jaipur, Rajasthan",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85"
  },
  {
    id: "col2-4",
    name: "The Grand Meridian",
    category: "Luxury Interiors",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
  }
]

const column3Items: GalleryItem[] = [
  {
    id: "col3-1",
    name: "Solaris Commercial Plaza",
    category: "Corporate Office Complex",
    location: "Jaipur, Rajasthan",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
  },
  {
    id: "col3-2",
    name: "Landmark Gated Communities",
    category: "Land Development & Planning",
    location: "Jaipur Expansion Zone",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85"
  },
  {
    id: "col3-3",
    name: "Nextlevel Studio",
    category: "Commercial Development",
    location: "Jaipur, Rajasthan",
    image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85"
  },
  {
    id: "col3-4",
    name: "Skyview Heights",
    category: "Commercial Development",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  }
]

const ProjectCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  return (
    <div className="relative group overflow-hidden rounded-[20px] bg-black/5 aspect-[4/3] w-full shadow-md border border-black/5">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* Glassmorphic hover overlay */}
      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[4px] flex flex-col justify-end p-4 text-white">
        <span className="text-[10px] font-bold tracking-widest uppercase bg-[#C92C15] text-white px-2 py-0.5 rounded w-fit mb-1.5 shadow-sm">
          {item.category.split(" ")[0]}
        </span>
        <div className="flex justify-between items-end">
          <div className="text-left">
            <h4 className="text-sm font-semibold tracking-tight text-white">{item.name}</h4>
            <p className="text-[10px] text-white/70 font-light">{item.location}</p>
          </div>
          <div className="h-7 w-7 rounded-full bg-white/20 hover:bg-[#C92C15] transition-all flex items-center justify-center text-white cursor-pointer ml-2">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

const BannerHeader: React.FC = () => {
  const { scrollY } = useContainerScrollContext()
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const y = useTransform(scrollY, [0, 200], [0, -40])
  const scale = useTransform(scrollY, [0, 200], [1, 0.96])

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-2 md:pt-4"
    >
      <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-3 md:mb-4">
        Our Portfolio
      </span>
      <h1 className="text-[#1B1B1B] font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6">
        Crafted With Precision
      </h1>
      <p className="text-[#6F6F6F] font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
        Explore our landmark projects across Jaipur, from modern offices to custom-built luxury villas.
      </p>
    </motion.div>
  )
}

export const ProjectBanner: React.FC = () => {
  return (
    <ContainerScroll className="bg-[#FAF7F5] w-full overflow-visible">
      {/* Decorative radial glows */}
      <div className="absolute top-[-50px] right-[-100px] w-[500px] h-[300px] bg-radial from-[rgba(201,44,21,0.06)] to-transparent filter blur-[40px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-[50px] left-[-100px] w-[500px] h-[300px] bg-radial from-[rgba(201,44,21,0.06)] to-transparent filter blur-[40px] pointer-events-none rounded-full z-0" />

      <ContainerSticky className="h-screen flex flex-col justify-start items-center pt-24 md:pt-32 pb-4 bg-[#FAF7F5] overflow-hidden">
        {/* Animated header text */}
        <BannerHeader />

        {/* 3D scrolling parallax grid */}
        <GalleryContainer className="w-full max-w-6xl mx-auto h-[65vh] md:h-[70vh] px-4 md:px-8 mt-2">
          <GalleryCol yRange={["5%", "-12%"]} className="gap-3 md:gap-4">
            {column1Items.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </GalleryCol>
          <GalleryCol yRange={["-5%", "10%"]} className="gap-3 md:gap-4">
            {column2Items.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </GalleryCol>
          <GalleryCol yRange={["8%", "-15%"]} className="gap-3 md:gap-4">
            {column3Items.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </GalleryCol>
        </GalleryContainer>
      </ContainerSticky>
    </ContainerScroll>
  )
}

export default ProjectBanner
