import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.img
        src="/images/justus-menke-sHfPnQKI9yI-unsplash.jpg"
        alt="Building"
        className="absolute right-0 top-0 h-full w-1/2 object-cover "
        style={{ y }}
      />
      <div className="relative z-10 flex h-full w-1/2 flex-col justify-center px-12">
        <h1 className="text-5xl font-bold leading-tight text-gray-900">
          Find Your Next <span className="text-primary">Home</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Buy, Sell, or Post your property with ease.
        </p>
      </div>
    </section>
  )
}
