// NAVO Shared UI Primitives
const C = {
  primary: '#323F90',
  secondary: '#1486C8',
  neutral: '#CCCCCC',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  bg: '#FFFFFF',
  bgSoft: '#F7F8FA',
  breaking: '#E53935',
};

// Curated Unsplash image pools — 12 per category to minimise same-image repeats
const IMG_POOLS = {
  Politics: [
    'photo-1529107386315-e1a2ed48a620','photo-1555848962-6e79363ec58f',
    'photo-1541872703-74c5e44368f9','photo-1568992687947-868a62a9f521',
    'photo-1473172707857-f9e276582ab6','photo-1521791136064-7986c2920216',
    'photo-1507679799987-c73779587ccf','photo-1450101499163-c8848c66ca85',
    'photo-1553877522-43269d4ea984','photo-1589994965851-a8f479c573a9',
    'photo-1488646953014-85cb44e25828','photo-1562016600-ece13e8ba570',
  ],
  Economy: [
    'photo-1611974789855-9c2a0a7236a3','photo-1579621970563-ebec7560ff3e',
    'photo-1460925895917-afdab827c52f','photo-1444653614773-995cb1ef9efa',
    'photo-1526304640581-d334cdbbf45e','photo-1593642632559-0c6d3fc62b89',
    'photo-1449824913935-59a10b8d2000','photo-1541872703-74c5e44368f9',
    'photo-1507679799987-c73779587ccf','photo-1559526324-4b87b5e36e44',
    'photo-1509909756405-be0199881695','photo-1451187580459-43490279c0fa',
  ],
  World: [
    'photo-1451187580459-43490279c0fa','photo-1574786527860-f2e274867c91',
    'photo-1509909756405-be0199881695','photo-1488646953014-85cb44e25828',
    'photo-1562016600-ece13e8ba570','photo-1469334031218-e382a71b716b',
    'photo-1449824913935-59a10b8d2000','photo-1480714378408-67cf0d13bc1b',
    'photo-1519677100203-a0e668c92439','photo-1506905925346-21bda4d32df4',
    'photo-1477959858617-67f85cf4f1df','photo-1473172707857-f9e276582ab6',
  ],
  Technology: [
    'photo-1518770660439-4636190af475','photo-1531297484001-80022131f5a1',
    'photo-1504711434969-e33886168f5c','photo-1620712943543-bcc4688e7485',
    'photo-1526374965328-7f61d4dc18c5','photo-1593642632559-0c6d3fc62b89',
    'photo-1526170375885-4d8ecf77b99f','photo-1568992687947-868a62a9f521',
    'photo-1616348436168-de43ad0db179','photo-1541872703-74c5e44368f9',
    'photo-1579621970563-ebec7560ff3e','photo-1460925895917-afdab827c52f',
  ],
  Sport: [
    'photo-1461896836934-ffe607ba8211','photo-1579952363873-27f3bade9f55',
    'photo-1552674605-db6ffd4facb5','photo-1517649763962-0c623066013b',
    'photo-1486286701208-1d58e9338013','photo-1542291026-7eec264c27ff',
    'photo-1471864190281-a93a3070b6de','photo-1444723121867-7a241cacace9',
    'photo-1506905925346-21bda4d32df4','photo-1488646953014-85cb44e25828',
    'photo-1523275335684-37898b6baf30','photo-1555041469-a586c61ea9bc',
  ],
  Culture: [
    'photo-1518611012118-696072aa579a','photo-1493225457124-a3eb161ffa5f',
    'photo-1514525253161-7a46d19cd819','photo-1547826039-bfc35e0f1ea8',
    'photo-1441986300917-64674bd600d8','photo-1540555700478-4be289fbecef',
    'photo-1526170375885-4d8ecf77b99f','photo-1469334031218-e382a71b716b',
    'photo-1449824913935-59a10b8d2000','photo-1555041469-a586c61ea9bc',
    'photo-1480714378408-67cf0d13bc1b','photo-1519677100203-a0e668c92439',
  ],
  Investigations: [
    'photo-1589994965851-a8f479c573a9','photo-1521791136064-7986c2920216',
    'photo-1507679799987-c73779587ccf','photo-1450101499163-c8848c66ca85',
    'photo-1553877522-43269d4ea984','photo-1529107386315-e1a2ed48a620',
    'photo-1460925895917-afdab827c52f','photo-1444653614773-995cb1ef9efa',
    'photo-1555848962-6e79363ec58f','photo-1568992687947-868a62a9f521',
    'photo-1526304640581-d334cdbbf45e','photo-1541872703-74c5e44368f9',
  ],
  Regions: [
    'photo-1477959858617-67f85cf4f1df','photo-1480714378408-67cf0d13bc1b',
    'photo-1444723121867-7a241cacace9','photo-1519677100203-a0e668c92439',
    'photo-1506905925346-21bda4d32df4','photo-1488646953014-85cb44e25828',
    'photo-1451187580459-43490279c0fa','photo-1509909756405-be0199881695',
    'photo-1562016600-ece13e8ba570','photo-1449824913935-59a10b8d2000',
    'photo-1569025690938-a00729c9e1f9','photo-1469334031218-e382a71b716b',
  ],
  hero: [
    'photo-1504711434969-e33886168f5c','photo-1533174072545-7a4b6ad7a6c3',
    'photo-1451187580459-43490279c0fa','photo-1529107386315-e1a2ed48a620',
    'photo-1611974789855-9c2a0a7236a3','photo-1568992687947-868a62a9f521',
    'photo-1508739773434-c26b3d09e071','photo-1518770660439-4636190af475',
    'photo-1579621970563-ebec7560ff3e','photo-1473172707857-f9e276582ab6',
  ],
  default: [
    'photo-1504711434969-e33886168f5c','photo-1480714378408-67cf0d13bc1b',
    'photo-1526304640581-d334cdbbf45e','photo-1444653614773-995cb1ef9efa',
    'photo-1477959858617-67f85cf4f1df','photo-1507679799987-c73779587ccf',
    'photo-1451187580459-43490279c0fa','photo-1531297484001-80022131f5a1',
    'photo-1579621970563-ebec7560ff3e','photo-1568992687947-868a62a9f521',
  ],
};

const getImgId = (seed, pool) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const arr = IMG_POOLS[pool] || IMG_POOLS.default;
  return arr[h % arr.length];
};

// Image with real photo
const ImgPlaceholder = ({ w, h, label = '', seed = '', category = '', style = {} }) => {
  const pool = category || Object.keys(IMG_POOLS).find(k => label.toLowerCase().includes(k.toLowerCase())) || 'default';
  const photoId = getImgId(seed || label || 'news', pool);
  const imgH = typeof h === 'number' ? h : undefined;
  return (
    <img
      src={`https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=75`}
      alt={label}
      onError={e => { e.currentTarget.style.background = '#e8eaf0'; e.currentTarget.removeAttribute('src'); }}
      style={{
        width: w || '100%',
        height: imgH || (typeof h === 'string' ? h : 200),
        objectFit: 'cover', display: 'block', flexShrink: 0,
        ...style,
      }}
    />
  );
};

// Category pill
const CategoryPill = ({ cat, small }) => (
  <span style={{
    display: 'inline-block',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: small ? 10 : 11, fontWeight: 700,
    letterSpacing: 1, textTransform: 'uppercase',
    color: C.primary, background: 'rgba(50,63,144,0.08)',
    borderRadius: 3, padding: small ? '2px 7px' : '3px 9px',
  }}>{cat}</span>
);

// Tag pill
const TagPill = ({ tag, onClick }) => (
  <span onClick={onClick} style={{
    display: 'inline-block',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 12, fontWeight: 500,
    color: '#555', background: C.bgSoft,
    border: '1px solid #e5e5e5',
    borderRadius: 20, padding: '4px 12px',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.15s',
  }}
    onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = C.secondary; e.currentTarget.style.color = C.secondary; } }}
    onMouseLeave={e => { if (onClick) { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.color = '#555'; } }}
  >#{tag}</span>
);

// News card (vertical)
const NewsCard = ({ article, navigate, size = 'md', horizontal }) => {
  const [hovered, setHovered] = React.useState(false);
  const imgH = size === 'lg' ? 260 : size === 'sm' ? 140 : 200;

  if (horizontal) {
    return (
      <div
        onClick={() => navigate('article', article)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', gap: 16, cursor: 'pointer',
          paddingBottom: 16, borderBottom: `1px solid ${C.neutral}`,
          marginBottom: 16,
        }}
      >
        <ImgPlaceholder w={110} h={80} label={article.title} seed={article.slug || String(article.id)} category={article.category} style={{ borderRadius: 4, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <CategoryPill cat={article.category} small />
          <div style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600,
            color: hovered ? C.secondary : C.textPrimary,
            lineHeight: 1.4, marginTop: 6,
            transition: 'color 0.15s',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{article.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <AuthorAvatar name={article.author.name} size={18} style={{ border: 'none' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{article.date}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate('article', article)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer', background: '#fff',
        borderRadius: 6, overflow: 'hidden',
        boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <ImgPlaceholder h={imgH} label={article.title} seed={article.slug || String(article.id)} category={article.category} />
      <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CategoryPill cat={article.category} />
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: size === 'lg' ? 20 : size === 'sm' ? 15 : 17,
          fontWeight: 600, lineHeight: 1.4,
          color: hovered ? C.secondary : C.textPrimary,
          margin: '10px 0 8px', transition: 'color 0.15s',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{article.title}</div>
        {size !== 'sm' && (
          <div style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: C.textSecondary,
            lineHeight: 1.6, flex: 1,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{article.excerpt}</div>
        )}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.bgSoft}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <AuthorAvatar name={article.author.name} size={24} style={{ border: 'none' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 500, color: C.textPrimary }}>{article.author.name}</span>
          </div>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{article.date}</span>
        </div>
      </div>
    </div>
  );
};

// Ad image pools by format
const AD_POOLS = {
  leaderboard: [
    { photo: 'photo-1523275335684-37898b6baf30', brand: 'ROLEX', tagline: 'Perpetual Excellence', overlay: 'rgba(10,10,20,0.38)', text: '#fff' },
    { photo: 'photo-1542291026-7eec264c27ff', brand: 'NIKE', tagline: 'Just Do It', overlay: 'rgba(20,10,10,0.42)', text: '#fff' },
    { photo: 'photo-1555041469-a586c61ea9bc', brand: 'MODERN LIVING', tagline: 'Redefine Your Space', overlay: 'rgba(10,20,10,0.38)', text: '#fff' },
  ],
  rectangle: [
    { photo: 'photo-1593642632559-0c6d3fc62b89', brand: 'DELL XPS', tagline: 'Power Meets Precision', overlay: 'rgba(5,15,35,0.52)', text: '#fff' },
    { photo: 'photo-1616348436168-de43ad0db179', brand: 'APPLE', tagline: 'Think Different', overlay: 'rgba(0,0,0,0.35)', text: '#fff' },
    { photo: 'photo-1471864190281-a93a3070b6de', brand: 'AUDI', tagline: 'Vorsprung durch Technik', overlay: 'rgba(10,10,10,0.45)', text: '#fff' },
    { photo: 'photo-1540555700478-4be289fbecef', brand: 'SPA & WELLNESS', tagline: 'Find Your Balance', overlay: 'rgba(30,20,40,0.42)', text: '#fff' },
  ],
  halfpage: [
    { photo: 'photo-1441986300917-64674bd600d8', brand: 'ZARA', tagline: 'New Collection 2026', overlay: 'rgba(10,10,10,0.40)', text: '#fff' },
    { photo: 'photo-1469334031218-e382a71b716b', brand: 'EMIRATES', tagline: 'Fly Better', overlay: 'rgba(10,20,40,0.48)', text: '#fff' },
    { photo: 'photo-1555041469-a586c61ea9bc', brand: 'PREMIUM HOMES', tagline: 'Your Dream Address', overlay: 'rgba(10,10,10,0.42)', text: '#fff' },
  ],
  infeed: [
    { photo: 'photo-1526170375885-4d8ecf77b99f', brand: 'SAMSUNG', tagline: 'Galaxy AI. Unfold the Future.', overlay: 'rgba(5,10,30,0.48)', text: '#fff' },
    { photo: 'photo-1449824913935-59a10b8d2000', brand: 'BOOKING.COM', tagline: 'Find Your Perfect Stay', overlay: 'rgba(0,60,120,0.52)', text: '#fff' },
  ],
};

const adSeed = (label) => {
  let h = 0;
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0;
  return h;
};

const AdBlock = ({ w = '100%', h = 250, label = '' }) => {
  // Pick format based on dimensions
  const numH = typeof h === 'number' ? h : 250;
  const numW = typeof w === 'number' ? w : 300;
  let format = 'rectangle';
  if (numH <= 100) format = numW >= 600 ? 'leaderboard' : 'infeed';
  else if (numH >= 500) format = 'halfpage';

  const pool = AD_POOLS[format] || AD_POOLS.rectangle;
  const idx = adSeed(label || format) % pool.length;
  const ad = pool[idx];

  return (
    <div style={{
      width: w, height: numH, position: 'relative', overflow: 'hidden',
      borderRadius: 4, flexShrink: 0,
    }}>
      <img
        src={`https://images.unsplash.com/${ad.photo}?auto=format&fit=crop&w=900&q=75`}
        alt="advertisement"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: ad.overlay }} />
      {/* Ad label */}
      <div style={{
        position: 'absolute', top: 6, right: 6,
        background: 'rgba(0,0,0,0.45)', color: '#fff',
        fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 600,
        letterSpacing: 1, padding: '2px 6px', borderRadius: 2, textTransform: 'uppercase',
      }}>Ad</div>
      {/* Brand text — layout by format */}
      {format === 'leaderboard' || format === 'infeed' ? (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', padding: '0 28px',
        }}>
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 800, color: ad.text, letterSpacing: 2 }}>{ad.brand}</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{ad.tagline}</div>
          </div>
          <button style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700,
            background: '#fff', color: '#1A1A1A', border: 'none',
            borderRadius: 3, padding: '8px 20px', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>Learn More</button>
        </div>
      ) : (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: numH >= 500 ? '28px 24px' : '16px 18px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
        }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: numH >= 400 ? 24 : 16, fontWeight: 800, color: ad.text, letterSpacing: 1.5 }}>{ad.brand}</div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: numH >= 400 ? 14 : 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{ad.tagline}</div>
          {numH >= 300 && (
            <button style={{
              marginTop: 14, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700,
              background: '#fff', color: '#1A1A1A', border: 'none',
              borderRadius: 3, padding: '8px 20px', cursor: 'pointer',
            }}>Learn More</button>
          )}
        </div>
      )}
    </div>
  );
};

// Section heading
const SectionHeading = ({ title, action, onAction }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderTop: `3px solid ${C.primary}`, paddingTop: 14, marginBottom: 24,
  }}>
    <h2 style={{
      fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 700,
      color: C.textPrimary, margin: 0, letterSpacing: '-0.3px',
    }}>{title}</h2>
    {action && (
      <button onClick={onAction} style={{
        fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600,
        color: C.secondary, background: 'none', border: 'none', cursor: 'pointer',
        padding: 0, transition: 'opacity 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >{action} →</button>
    )}
  </div>
);

// Author avatar — resolves from NAVO_DATA.authors by name
const AuthorAvatar = ({ name, size = 28, style = {} }) => {
  const author = (window.NAVO_DATA?.authors || []).find(a => a.name === name);
  const initials = name ? name[0] : '?';
  if (author?.photoId) {
    return (
      <img
        src={`https://images.unsplash.com/${author.photoId}?auto=format&fit=crop&w=${size * 2}&h=${size * 2}&q=80`}
        alt={name}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: `2px solid ${C.primary}`, ...style }}
      />
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: C.bgSoft, border: `2px solid ${C.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...style }}>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: size * 0.4, fontWeight: 700, color: C.primary }}>{initials}</span>
    </div>
  );
};

Object.assign(window, { C, ImgPlaceholder, CategoryPill, TagPill, NewsCard, AdBlock, SectionHeading, getImgId, IMG_POOLS, AuthorAvatar });
