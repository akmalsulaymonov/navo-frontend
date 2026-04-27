'use client'

export default function TagPill({ tag, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`inline-block text-[12px] font-medium text-gray-600 bg-soft border border-gray-200 rounded-full px-3 py-1 transition-all ${onClick ? 'cursor-pointer hover:border-secondary hover:text-secondary' : ''}`}
    >#{tag}</span>
  )
}
