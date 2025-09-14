import { motion } from "framer-motion"

function FeedHero() {
  return (
    <motion.section
      className="w-full bg-gradient-to-r from-amber-200 via-amber-100 to-white py-10 px-6 rounded-2xl shadow-md mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Community Feed
        </h1>
        <p className="mt-2 text-gray-700 text-lg">
          See the latest posts from buyers, owners, and tenants in our community.
        </p>
      </div>
    </motion.section>
  )
}

export default FeedHero
