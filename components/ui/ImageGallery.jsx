'use client'
import { useState, useEffect, useCallback } from 'react'

export default function ImageGallery({ images = [] }) {
  const [current, setCurrent] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = e => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightboxOpen, prev, next])

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  if (!images.length) return null

  const img = images[current]

  return (
    <>
      <div className="mb-8">
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mb-2.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                style={{
                  width: i === current ? 24 : 18,
                  height: 3,
                  borderRadius: 2,
                  border: 'none',
                  background: i === current ? '#1A1A1A' : '#CCCCCC',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        )}

        <div
          className="relative overflow-hidden rounded-md cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={img.src}
            alt={img.caption || ''}
            style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all opacity-90 hover:opacity-100 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(0,0,0,0.12)' }}
                aria-label="Previous image"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all opacity-90 hover:opacity-100 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(0,0,0,0.12)' }}
                aria-label="Next image"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </>
          )}
        </div>

        {img.caption && (
          <p className="text-[13px] text-gray-500 mt-2 leading-snug">{img.caption}</p>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)' }}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          <div
            className="relative"
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={img.src}
              alt={img.caption || ''}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            />
            {img.caption && (
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-2.5 text-center text-[13px] text-white"
                style={{ background: 'rgba(0,0,0,0.68)' }}
              >
                {img.caption}
              </div>
            )}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}
                aria-label="Previous image"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}
                aria-label="Next image"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
