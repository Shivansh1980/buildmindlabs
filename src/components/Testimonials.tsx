import { motion } from "motion/react";
import { SiteData } from "../types";
import { Quote } from "lucide-react";

export default function Testimonials({ data }: { data: SiteData }) {
  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-[32px] md:text-[40px] font-semibold tracking-[-1px] text-[var(--color-text-main)]">
            {data.testimonials.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.testimonials.items.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[var(--color-bg-card)] p-[32px] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[var(--color-card-border)] relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-[var(--color-divider)] absolute top-[32px] right-[32px]" />
              <p className="text-[16px] text-[var(--color-text-main)] leading-[1.45] mb-8 relative z-10 italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-[15px] text-[var(--color-text-main)]">{testimonial.name}</p>
                <p className="text-[13px] text-[var(--color-text-muted)]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
