'use client'

export default function LegalPage({ tag, title, updated, children }) {
  return (
    <div className="bg-white">
      <div className="bg-soft border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <div className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-primary bg-primary/10 rounded px-3 py-1 mb-4">{tag}</div>
          <h1 className="text-[28px] md:text-[40px] font-extrabold text-gray-900 tracking-tight mb-3">{title}</h1>
          {updated && <p className="text-[13px] text-gray-400">{updated}</p>}
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="prose prose-gray max-w-none space-y-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <div className="pb-8 border-b border-gray-100 last:border-b-0">
      <h2 className="text-[19px] font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-[15px] text-gray-600 leading-relaxed space-y-3">{children}</div>
    </div>
  )
}
