import { motion, useScroll, useTransform } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function FeatureCards() {
    const features = [
      { title: "Buy", desc: "Find the perfect home for you.", image : "/images/villa.jpg" },
      { title: "Sell", desc: "List your property and reach buyers." , image: ""},
      { title: "Post", desc: "Share opportunities in your area.", image : "" },
    ]
  
    return (
        <section className="relative z-20 flex min-h-screen items-center justify-center bg-gray-50 px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <CardContainer className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardBody className="p-6 flex flex-col gap-4 h-full">
                  {/* Title */}
                  <CardItem translateZ="50" className="text-xl font-semibold text-gray-800">
                    {f.title}
                  </CardItem>

                  <CardItem translateZ="40" className="text-sm text-gray-600 leading-relaxed font-light">
                    {f.desc}
                  </CardItem>
      
                  {/* Image */}
                  <CardItem translateZ="80" className="flex-1">
                    <img
                      src={f.image}
                      alt="Property"
                      className="h-56 w-full object-cover rounded-xl group-hover/card:shadow-lg"
                    />
                  </CardItem>
      
                  {/* CTA */}
                  <CardItem
                    translateZ="60"
                    as="button"
                    className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow hover:bg-primary/90 hover:cursor-pointer transition"
                  >
                    Explore →
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </section>
      
    )
  }
  