import { Suspense } from 'react'
import SearchContent from './_SearchContent'

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'Montserrat, sans-serif', color: '#666' }}>Loading…</span></div>}>
      <SearchContent />
    </Suspense>
  )
}
