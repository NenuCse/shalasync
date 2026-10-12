'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Clock, Zap, BookOpen, Bell, Shield } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [enrollment, setEnrollment] = useState('');
  const [remember, setRemember]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [now, setNow]               = useState(new Date());
  const [online, setOnline]         = useState(true);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('enrollment_no');
    if (saved) { setEnrollment(saved); setRemember(true); }
    const t = setInterval(() => setNow(new Date()), 1000);
    const onOn  = () => setOnline(true);
    const onOff = () => setOnline(false);
    window.addEventListener('online',  onOn);
    window.addEventListener('offline', onOff);
    return () => {
      clearInterval(t);
      window.removeEventListener('online',  onOn);
      window.removeEventListener('offline', onOff);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = enrollment.trim().toUpperCase().replace(/\s+/g, '');
    if (!val) { setError('Enter your enrollment number'); return; }
    if (val.length < 6) { setError('Enrollment number too short'); return; }
    setLoading(true);
    if (remember) localStorage.setItem('enrollment_no', val);
    else localStorage.removeItem('enrollment_no');
    router.push(`/student/${val}`);
  };

  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const h12    = ((now.getHours() % 12) || 12).toString().padStart(2, '0');
  const mm     = now.getMinutes().toString().padStart(2, '0');
  const ss     = now.getSeconds().toString().padStart(2, '0');
  const ampm   = now.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div style={{ minHeight: '100dvh', background: '#0a0a14', position: 'relative', overflowX: 'hidden' }}>

      {/* ── Aurora glow blobs ────────────────────── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-15%', left: '-10%',
          width: '60%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(177,178,255,0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '50%', height: '50%',
          background: 'radial-gradient(ellipse, rgba(170,196,255,0.1) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <div style={{
          position: 'absolute', top: '45%', left: '50%',
          width: '40%', height: '40%',
          background: 'radial-gradient(ellipse, rgba(139,141,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      {/* ── Top bar ──────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: online ? '#34d399' : '#fbbf24',
            boxShadow: online ? '0 0 6px #34d399' : '0 0 6px #fbbf24',
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#7b7daa', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {online ? 'Live' : 'Offline'}
          </span>
        </div>
        <a href="/admin/login" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 10,
          background: 'rgba(177,178,255,0.08)',
          border: '1px solid rgba(177,178,255,0.18)',
          color: '#D2DAFF', fontSize: 12, fontWeight: 700,
          textDecoration: 'none', transition: 'all 0.2s',
        }}>
          <Shield style={{ width: 12, height: 12 }} />
          Admin
        </a>
      </div>

      {/* ── Main content ─────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 440, margin: '0 auto', padding: '0 20px 48px' }}>

        {/* College header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              position: 'absolute', inset: -5, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(177,178,255,0.25), transparent)',
              filter: 'blur(10px)',
            }} />
            <div style={{
              position: 'relative', width: 54, height: 54, borderRadius: 14,
              overflow: 'hidden', background: '#16162e',
              border: '1.5px solid rgba(177,178,255,0.25)',
              boxShadow: '0 4px 20px rgba(177,178,255,0.15)',
            }}>
              <Image src="/logo.jpg" alt="GEC Palanpur" fill sizes="54px" className="object-contain p-1" priority />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7b7daa', marginBottom: 3 }}>
              Govt. Engineering College
            </div>
            <div style={{
              fontSize: 21, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1,
              background: 'linear-gradient(135deg, #D2DAFF, #B1B2FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              PALANPUR
            </div>
          </div>
        </div>

        {/* Big headline */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 9vw, 3.2rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1.05,
            color: '#eef1ff', marginBottom: 12,
          }}>
            Shala<br />
            <span style={{
              background: 'linear-gradient(135deg, #B1B2FF 0%, #AAC4FF 55%, #D2DAFF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Sync</span>
          </h1>
          <p style={{ fontSize: 14.5, color: '#7b7daa', lineHeight: 1.65, maxWidth: 300 }}>
            Your lectures, live room changes &amp; campus<br />updates — always in sync.
          </p>
        </div>

        {/* Enrollment form card */}
        <div style={{
          background: 'rgba(22,22,46,0.9)',
          border: '1px solid rgba(177,178,255,0.15)',
          borderRadius: 22, padding: '26px 22px',
          marginBottom: 14,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(177,178,255,0.08)',
        }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7b7daa', marginBottom: 10 }}>
            Enrollment Number
          </div>
          <form onSubmit={handleSubmit}>
            <input
              id="enrollment"
              type="text"
              value={enrollment}
              onChange={e => { setEnrollment(e.target.value); setError(''); }}
              placeholder="e.g. 220123456"
              autoComplete="off"
              autoCapitalize="characters"
              disabled={loading}
              maxLength={20}
              style={{
                width: '100%', padding: '13px 15px',
                background: '#111124',
                border: '1.5px solid rgba(177,178,255,0.15)',
                borderRadius: 12, color: '#eef1ff',
                fontSize: 15, fontFamily: 'inherit',
                outline: 'none', marginBottom: 11,
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(177,178,255,0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(177,178,255,0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(177,178,255,0.15)';
                e.target.style.boxShadow = 'none';
              }}
            />

            {error && (
              <div style={{
                background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)',
                borderRadius: 10, padding: '8px 12px', marginBottom: 11,
                color: '#fb7185', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              id="viewTimetableBtn"
              type="submit"
              disabled={loading || !enrollment.trim()}
              style={{
                width: '100%', padding: '14px 24px',
                background: loading || !enrollment.trim()
                  ? 'rgba(177,178,255,0.12)'
                  : 'linear-gradient(135deg, #7b7dff, #B1B2FF)',
                border: '1px solid rgba(177,178,255,0.2)',
                borderRadius: 13,
                color: loading || !enrollment.trim() ? '#4a4a7a' : '#0a0a14',
                fontSize: 15, fontWeight: 800,
                fontFamily: 'inherit',
                cursor: loading || !enrollment.trim() ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s', letterSpacing: '-0.01em',
                boxShadow: loading || !enrollment.trim() ? 'none' : '0 6px 28px rgba(177,178,255,0.3)',
              }}>
              {loading ? (
                <>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%',
                    border: '2px solid rgba(177,178,255,0.25)',
                    borderTopColor: '#B1B2FF',
                    animation: 'spin 0.75s linear infinite',
                  }} />
                  Finding timetable…
                </>
              ) : (
                <>View My Timetable <ArrowRight style={{ width: 17, height: 17 }} /></>
              )}
            </button>

            {/* Remember toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
              <button
                type="button"
                role="switch"
                aria-checked={remember}
                onClick={() => setRemember(r => !r)}
                style={{
                  position: 'relative', width: 42, height: 23, borderRadius: 12,
                  border: '1px solid rgba(177,178,255,0.2)',
                  cursor: 'pointer', flexShrink: 0,
                  background: remember
                    ? 'linear-gradient(135deg, #7b7dff, #B1B2FF)'
                    : 'rgba(177,178,255,0.08)',
                  transition: 'all 0.25s',
                  boxShadow: remember ? '0 0 12px rgba(177,178,255,0.3)' : 'none',
                }}>
                <div style={{
                  position: 'absolute', top: 3, left: 3,
                  width: 15, height: 15, borderRadius: '50%',
                  background: remember ? '#0a0a14' : '#7b7daa',
                  transition: 'transform 0.25s',
                  transform: remember ? 'translateX(19px)' : 'translateX(0)',
                }} />
              </button>
              <span style={{ fontSize: 13, color: '#7b7daa' }}>Remember my enrollment number</span>
            </div>
          </form>
        </div>

        {/* Live clock card */}
        <div style={{
          background: 'rgba(19,19,42,0.8)',
          border: '1px solid rgba(177,178,255,0.1)',
          borderRadius: 18, padding: '18px 22px',
          marginBottom: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: 'blur(16px)',
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7b7daa', marginBottom: 5 }}>
              Current Time
            </div>
            {mounted ? (
              <>
                <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: '-0.04em', color: '#eef1ff', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  {h12}:{mm}
                  <span style={{ fontSize: 17, color: '#B1B2FF', fontWeight: 700 }}>{ampm}</span>
                  <span style={{ fontSize: 13, color: '#2e2e55', fontWeight: 600 }}>{ss}s</span>
                </div>
                <div style={{ fontSize: 13, color: '#7b7daa', marginTop: 4 }}>
                  {days[now.getDay()]}, {now.getDate()} {months[now.getMonth()]} {now.getFullYear()}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 34, fontWeight: 900, color: '#eef1ff' }}>--:--</div>
            )}
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: 'rgba(170,196,255,0.08)',
            border: '1px solid rgba(170,196,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Clock style={{ width: 22, height: 22, color: '#AAC4FF' }} />
          </div>
        </div>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[
            { icon: BookOpen, label: 'Personalised', sub: 'Timetable',     color: '#B1B2FF', bg: 'rgba(177,178,255,0.08)',  border: 'rgba(177,178,255,0.15)' },
            { icon: Zap,      label: 'Live Updates', sub: 'Room changes',  color: '#AAC4FF', bg: 'rgba(170,196,255,0.08)',  border: 'rgba(170,196,255,0.15)' },
            { icon: Bell,     label: 'Alerts',       sub: 'Announcements', color: '#D2DAFF', bg: 'rgba(210,218,255,0.06)',  border: 'rgba(210,218,255,0.12)' },
          ].map(f => (
            <div key={f.label} style={{
              background: f.bg,
              border: `1px solid ${f.border}`,
              borderRadius: 14, padding: '14px 10px', textAlign: 'center',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 9, margin: '0 auto 8px',
                background: `${f.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <f.icon style={{ width: 15, height: 15, color: f.color }} />
              </div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: '#D2DAFF', lineHeight: 1.3 }}>{f.label}</div>
              <div style={{ fontSize: 9.5, color: '#7b7daa', marginTop: 2 }}>{f.sub}</div>
            </div>
          ))}
        </div>

        {/* Demo hint */}
        <div style={{
          background: 'rgba(19,19,42,0.7)',
          border: '1px solid rgba(177,178,255,0.1)',
          borderRadius: 16, padding: '16px 18px',
          backdropFilter: 'blur(16px)',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7b7daa', marginBottom: 10 }}>
            🧪 Try a demo enrollment
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {['240010101001', '240010201001', '240010301001', '240010401001'].map(en => (
              <button key={en} onClick={() => setEnrollment(en)}
                style={{
                  padding: '6px 12px', borderRadius: 9,
                  background: 'rgba(177,178,255,0.08)',
                  border: '1px solid rgba(177,178,255,0.18)',
                  color: '#B1B2FF', fontSize: 11, fontFamily: 'monospace', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                {en}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#2e2e55', marginTop: 10, lineHeight: 1.5 }}>
            Works after connecting Supabase &amp; running the SQL migrations
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingBottom: 24 }}>
        <p style={{ fontSize: 11, color: '#2e2e55' }}>
          ShalaSync · GEC Palanpur · {new Date().getFullYear()}
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #2e2e55; }
        body { font-family: 'Inter', system-ui, sans-serif; }
        #viewTimetableBtn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(177,178,255,0.4) !important;
        }
      `}</style>
    </div>
  );
}
