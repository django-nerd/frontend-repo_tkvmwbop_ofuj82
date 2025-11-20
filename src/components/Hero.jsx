import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:.6}} className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
            Arihant Automobiles
          </motion.h1>
          <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0, delay:.1}} className="mt-4 text-lg text-slate-600">
            Premium vehicles, performance parts and accessories. Experience precision engineering and effortless shopping.
          </motion.p>
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0, delay:.2}} className="mt-8 flex gap-3">
            <a href="#shop" className="rounded-full bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-slate-800 transition">Shop now</a>
            <a href="#featured" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition">Explore range</a>
          </motion.div>
        </div>
        <div className="relative h-[420px] md:h-[520px]">
          <Spline scene="https://prod.spline.design/8fw9Z-c-rqW3nWBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"/>
        </div>
      </div>
    </section>
  )
}
