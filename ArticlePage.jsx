// NAVO Article Page
const ArticlePage = ({ article, navigate }) => {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [comments, setComments] = React.useState([
    { id: 1, author: 'David K.', text: 'Exceptional analysis. The section on multilateral institutions deserves a dedicated piece.', time: '2h ago', likes: 14, dislikes: 1, replies: [
      { id: 2, author: 'Priya M.', text: 'Fully agree. The WTO dysfunction deserves much more coverage.', time: '1h ago', likes: 7, dislikes: 0 }
    ]},
    { id: 3, author: 'Anna V.', text: 'Strong reporting. Would have appreciated more data on the economic dimensions.', time: '3h ago', likes: 9, dislikes: 2, replies: [] },
  ]);
  const [likedComments, setLikedComments] = React.useState({});

  const mostRead = NAVO_DATA.mostRead.map(id => NAVO_DATA.articles.find(a => a.id === id)).filter(Boolean);
  const related = NAVO_DATA.articles.filter(a => a.id !== article.id && (a.category === article.category || a.tags?.some(t => article.tags?.includes(t)))).slice(0, 3);
  const fallbackRelated = NAVO_DATA.articles.filter(a => a.id !== article.id).slice(0, 3);
  const readAlso = related.length >= 2 ? related : fallbackRelated;

  const [hoveredPerson, setHoveredPerson] = React.useState(null);
  const persons = ['Elena Marchetti', 'Dr. Aisha Nakamura', 'Prof. James Okafor'];

  const shareButtons = [
    { label: 'Telegram', color: '#0088cc' },
    { label: 'Twitter', color: '#000' },
    { label: 'Facebook', color: '#1877f2' },
    { label: 'WhatsApp', color: '#25d366' },
  ];

  const renderBody = (body) => body.map((block, i) => {
    if (block.type === 'p') {
      const words = block.content.split(' ');
      return (
        <p key={i} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 17, lineHeight: 1.75, color: '#222', marginBottom: 24 }}>
          {words.map((w, wi) => {
            const isPerson = persons.some(p => block.content.includes(p) && p.split(' ').some(part => w.includes(part)));
            return isPerson ? (
              <span key={wi} style={{ position: 'relative', display: 'inline' }}>
                <span
                  onMouseEnter={() => setHoveredPerson(w)}
                  onMouseLeave={() => setHoveredPerson(null)}
                  style={{ borderBottom: '1px dotted #323F90', cursor: 'pointer', color: '#323F90' }}
                >{w} </span>
              </span>
            ) : <span key={wi}>{w} </span>;
          })}
        </p>
      );
    }
    if (block.type === 'quote') return (
      <blockquote key={i} style={{
        margin: '32px 0', padding: '20px 28px',
        borderLeft: `4px solid ${C.primary}`,
        background: C.bgSoft, borderRadius: '0 6px 6px 0',
      }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 500, color: '#333', lineHeight: 1.65, fontStyle: 'italic', margin: '0 0 10px' }}>"{block.content}"</p>
        {block.attribution && <cite style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textSecondary, fontStyle: 'normal', fontWeight: 600 }}>— {block.attribution}</cite>}
      </blockquote>
    );
    return null;
  });

  const addComment = () => {
    if (!commentText.trim()) return;
    setComments(prev => [{
      id: Date.now(), author: 'You', text: commentText,
      time: 'just now', likes: 0, dislikes: 0, replies: [],
    }, ...prev]);
    setCommentText('');
  };

  return (
    <div style={{ background: C.bg }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48 }}>

          {/* ARTICLE MAIN */}
          <article>
            {/* Breadcrumbs */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              {['Home', article.category, article.title.slice(0, 30) + '…'].map((crumb, i, arr) => (
                <React.Fragment key={i}>
                  <span
                    onClick={() => i === 0 ? navigate('home') : i === 1 ? navigate('category', article.category) : null}
                    style={{
                      fontFamily: 'Montserrat, sans-serif', fontSize: 13,
                      color: i === arr.length - 1 ? C.textSecondary : C.secondary,
                      cursor: i < arr.length - 1 ? 'pointer' : 'default',
                      fontWeight: i === arr.length - 1 ? 400 : 500,
                    }}
                  >{crumb}</span>
                  {i < arr.length - 1 && <span style={{ color: C.neutral, fontSize: 13 }}>›</span>}
                </React.Fragment>
              ))}
            </nav>

            {/* Category */}
            <CategoryPill cat={article.category} />

            {/* Headline */}
            <h1 style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 36, fontWeight: 700,
              color: C.textPrimary, lineHeight: 1.2, margin: '14px 0 16px',
              letterSpacing: '-0.5px',
            }}>{article.title}</h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: 400, color: '#444', lineHeight: 1.5, marginBottom: 24, borderBottom: `1px solid ${C.neutral}`, paddingBottom: 24 }}>
                {article.subtitle}
              </p>
            )}

            {/* Author block + share */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                {(() => {
                  const fullAuthor = NAVO_DATA.authors.find(a => a.name === article.author.name);
                  return (
                    <div
                      onClick={() => fullAuthor && navigate('author', fullAuthor)}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: fullAuthor ? 'pointer' : 'default' }}
                      title={fullAuthor ? `View ${article.author.name}'s profile` : ''}
                    >
                      {fullAuthor?.photoId ? (
                        <img src={`https://images.unsplash.com/${fullAuthor.photoId}?auto=format&fit=crop&w=88&h=88&q=80`}
                          alt={article.author.name}
                          style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `2px solid ${C.primary}`, flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.bgSoft, border: `2px solid ${C.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 700, color: C.primary }}>{article.author.name[0]}</span>
                        </div>
                      )}
                      <div>
                        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, color: C.primary, textDecoration: fullAuthor ? 'underline' : 'none', textDecorationStyle: 'dotted', textUnderlineOffset: 3 }}>{article.author.name}</div>
                        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{article.author.role}</div>
                      </div>
                    </div>
                  );
                })()}
                <span style={{ color: C.neutral }}>·</span>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textSecondary }}>{article.date}</div>
                <span style={{ color: C.neutral }}>·</span>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textSecondary }}>{article.readTime}</div>
              </div>
              {/* Share + bookmark */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {shareButtons.map(s => (
                  <button key={s.label} style={{
                    fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700,
                    color: s.color, background: 'none',
                    border: `1px solid ${s.color}22`, borderRadius: 4, padding: '5px 10px', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = s.color; }}
                  >{s.label}</button>
                ))}
                <button onClick={() => setBookmarked(b => !b)} style={{
                  background: bookmarked ? C.primary : 'none',
                  border: `1px solid ${C.primary}`, borderRadius: 4, padding: '5px 10px', cursor: 'pointer',
                  color: bookmarked ? '#fff' : C.primary, fontSize: 11, fontWeight: 700,
                  fontFamily: 'Montserrat, sans-serif', transition: 'all 0.15s',
                }}>{bookmarked ? '✓ Saved' : '☆ Save'}</button>
              </div>
            </div>

            {/* Hero image */}
            <div style={{ marginBottom: 32 }}>
              <ImgPlaceholder h={440} label={article.title} seed={article.slug} category={article.category} style={{ borderRadius: 6, width: '100%' }} />
              {article.imageCaption && (
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textSecondary, marginTop: 10, fontStyle: 'italic', lineHeight: 1.5 }}>{article.imageCaption}</p>
              )}
            </div>

            {/* Body */}
            <div style={{ maxWidth: 680 }}>
              {article.body ? renderBody(article.body) : (
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 17, lineHeight: 1.75, color: '#222' }}>
                  Full article content appears here. The editorial team has produced a comprehensive investigation into this topic, drawing on sources across multiple continents and months of on-the-ground reporting.
                </p>
              )}

              {/* In-article ad */}
              <div style={{ margin: '32px 0', display: 'flex', justifyContent: 'center' }}>
                <AdBlock w={580} h={90} label="580×90 in-article" />
              </div>

              {(article.body || []).slice(3).map((block, i) => {
                if (!block) return null;
                if (block.type === 'p') return <p key={i} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 17, lineHeight: 1.75, color: '#222', marginBottom: 24 }}>{block.content}</p>;
                if (block.type === 'quote') return (
                  <blockquote key={i} style={{ margin: '32px 0', padding: '20px 28px', borderLeft: `4px solid ${C.primary}`, background: C.bgSoft, borderRadius: '0 6px 6px 0' }}>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 500, color: '#333', lineHeight: 1.65, fontStyle: 'italic', margin: '0 0 10px' }}>"{block.content}"</p>
                    {block.attribution && <cite style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textSecondary, fontStyle: 'normal', fontWeight: 600 }}>— {block.attribution}</cite>}
                  </blockquote>
                );
                return null;
              })}
            </div>

            {/* Tags */}
            {article.tags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.neutral}` }}>
                {article.tags.map(t => <TagPill key={t} tag={t} onClick={() => {}} />)}
              </div>
            )}

            {/* Read Also */}
            <div style={{ marginTop: 48 }}>
              <SectionHeading title="Read Also" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {readAlso.map(a => <NewsCard key={a.slug || a.id} article={a} navigate={navigate} size="sm" />)}
              </div>
            </div>

            {/* Comments */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.neutral}` }}>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 700, color: C.textPrimary, marginBottom: 24 }}>Comments ({comments.reduce((n, c) => n + 1 + c.replies.length, 0)})</h3>

              {/* Comment input */}
              <div style={{ background: C.bgSoft, borderRadius: 8, padding: 20, marginBottom: 32 }}>
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Share your thoughts… (login required to post)"
                  style={{
                    width: '100%', minHeight: 90, fontFamily: 'Montserrat, sans-serif', fontSize: 14,
                    border: `1px solid ${C.neutral}`, borderRadius: 6, padding: 12, resize: 'vertical',
                    outline: 'none', color: C.textPrimary, background: '#fff', boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <button onClick={addComment} style={{
                    fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600,
                    background: C.primary, color: '#fff', border: 'none',
                    borderRadius: 4, padding: '9px 20px', cursor: 'pointer',
                  }}>Post Comment</button>
                </div>
              </div>

              {/* Comment list */}
              {comments.map(c => (
                <div key={c.id} style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: C.bgSoft, border: `1px solid ${C.neutral}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700, color: C.primary }}>{c.author[0]}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, color: C.textPrimary }}>{c.author}</span>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{c.time}</span>
                      </div>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, color: '#333', lineHeight: 1.6, margin: '0 0 10px' }}>{c.text}</p>
                      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                        {[['👍', c.likes], ['👎', c.dislikes]].map(([icon, count]) => (
                          <button key={icon} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.textSecondary, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>{icon} {count}</button>
                        ))}
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: C.secondary, fontWeight: 600, padding: 0 }}>Reply</button>
                      </div>
                      {/* Replies */}
                      {c.replies?.map(r => (
                        <div key={r.id} style={{ display: 'flex', gap: 12, marginTop: 16, paddingLeft: 12, borderLeft: `2px solid ${C.neutral}` }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: C.bgSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>{r.author[0]}</span>
                          </div>
                          <div>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700, color: C.textPrimary }}>{r.author}</span>
                              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: C.textSecondary }}>{r.time}</span>
                            </div>
                            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: '#333', lineHeight: 1.6, margin: 0 }}>{r.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside style={{ position: 'sticky', top: 112, alignSelf: 'start' }}>
            <AdBlock w="100%" h={250} label="300×250" />
            <div style={{ marginTop: 32 }}>
              <SectionHeading title="Most Read" />
              {mostRead.slice(0, 4).map((a, i) => (
                <div key={a.slug || a.id} onClick={() => navigate('article', a)} style={{ display: 'flex', gap: 10, marginBottom: 14, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.querySelector('.sb-title').style.color = C.secondary}
                  onMouseLeave={e => e.currentTarget.querySelector('.sb-title').style.color = C.textPrimary}
                >
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#e8eaf0', fontFamily: 'Montserrat, sans-serif', lineHeight: 1, width: 24, flexShrink: 0 }}>{i + 1}</span>
                  <div className="sb-title" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: C.textPrimary, transition: 'color 0.15s' }}>{a.title}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <SectionHeading title={`More in ${article.category}`} />
              {NAVO_DATA.articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 4).map(a => (
                <NewsCard key={a.slug || a.id} article={a} navigate={navigate} horizontal />
              ))}
              {NAVO_DATA.articles.filter(a => a.category === article.category && a.id !== article.id).length < 2 &&
                NAVO_DATA.articles.filter(a => a.id !== article.id).slice(0, 4).map(a => (
                  <NewsCard key={a.slug || a.id} article={a} navigate={navigate} horizontal />
                ))
              }
            </div>
            <div style={{ marginTop: 16 }}>
              <AdBlock w="100%" h={400} label="300×400" />
            </div>
          </aside>
        </div>
      </div>

      {/* Person tooltip */}
      {hoveredPerson && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
          background: '#fff', border: `1px solid ${C.neutral}`,
          borderRadius: 8, padding: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          maxWidth: 260, fontFamily: 'Montserrat, sans-serif',
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.bgSoft, border: `2px solid ${C.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>{hoveredPerson[0]}</span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>{hoveredPerson}</div>
              <div style={{ fontSize: 12, color: C.textSecondary }}>Mentioned person</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.ArticlePage = ArticlePage;
