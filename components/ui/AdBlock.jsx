import { getAdItem } from '@/lib/utils'

export default function AdBlock({ w = '100%', h = 250, label = '' }) {
  const { ad, format, numH } = getAdItem(w, h, label)
  return (
    <div style={{ width: w, height: numH }} className="relative overflow-hidden rounded shrink-0">
      <img
        src={`https://images.unsplash.com/${ad.photo}?auto=format&fit=crop&w=900&q=75`}
        alt="advertisement"
        className="w-full h-full object-cover block"
      />
      <div className="absolute inset-0" style={{ background: ad.overlay }} />
      <div className="absolute top-1.5 right-1.5 bg-black/45 text-white text-[9px] font-semibold tracking-widest px-1.5 py-0.5 rounded-sm uppercase">Ad</div>
      {format === 'leaderboard' || format === 'infeed' ? (
        <div className="absolute inset-0 flex items-center justify-between px-7">
          <div>
            <div className="text-[22px] font-extrabold tracking-widest" style={{ color: ad.text }}>{ad.brand}</div>
            <div className="text-[13px] text-white/80 mt-1">{ad.tagline}</div>
          </div>
          <button className="text-[12px] font-bold bg-white text-gray-900 border-none rounded-sm px-5 py-2 cursor-pointer whitespace-nowrap">Learn More</button>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: numH >= 500 ? '28px 24px' : '16px 18px', background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
          <div className="font-extrabold tracking-widest" style={{ fontSize: numH >= 400 ? 24 : 16, color: ad.text }}>{ad.brand}</div>
          <div className="text-white/80 mt-1" style={{ fontSize: numH >= 400 ? 14 : 12 }}>{ad.tagline}</div>
          {numH >= 300 && (
            <button className="mt-3.5 text-[12px] font-bold bg-white text-gray-900 border-none rounded-sm px-5 py-2 cursor-pointer">Learn More</button>
          )}
        </div>
      )}
    </div>
  )
}
