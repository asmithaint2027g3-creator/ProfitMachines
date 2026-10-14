import React, { useState, useEffect, useCallback } from 'react';

/**
 * VisitorDashboard
 * Admin page at /admin/visitors
 * Reads visitor records directly from Airtable and renders a live table.
 * Secured behind PIN-based admin authentication gate.
 */

interface Visitor {
  id: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  page: string;
  referrer: string;
  device: string;
  browser: string;
  os: string;
  coordinates?: string;
  visitedAt: string;
  sessionId: string;
}

const COUNTRY_FLAGS: Record<string, string> = {
  IN: '🇮🇳', US: '🇺🇸', GB: '🇬🇧', AU: '🇦🇺', CA: '🇨🇦',
  DE: '🇩🇪', FR: '🇫🇷', JP: '🇯🇵', SG: '🇸🇬', AE: '🇦🇪',
  SA: '🇸🇦', NL: '🇳🇱', BR: '🇧🇷', ZA: '🇿🇦', NG: '🇳🇬',
  KE: '🇰🇪', PK: '🇵🇰', BD: '🇧🇩', LK: '🇱🇰', MY: '🇲🇾',
};

const DEVICE_ICONS: Record<string, string> = {
  Desktop: '🖥️', Mobile: '📱', Tablet: '📟',
};

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flex: '1',
      minWidth: '160px',
    }}>
      <div style={{
        fontSize: '28px',
        background: `${color}20`,
        borderRadius: '12px',
        width: '52px', height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div>
        <div style={{ color, fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>{value}</div>
        <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>{label}</div>
      </div>
    </div>
  );
}

export default function VisitorDashboard() {
  // ── Admin Security Gate ──
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('pm_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // ── Dashboard State ──
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterDevice, setFilterDevice] = useState('All');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchVisitors = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch from Airtable directly via the get-visitors API endpoint
      const res = await fetch('/api/get-visitors');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setVisitors(data.visitors || []);
      setLastRefreshed(new Date());
    } catch (err) {
      setError('Could not load visitors. Make sure the Airtable "Visitors" table is created.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchVisitors();
  }, [fetchVisitors, isAuthenticated]);

  // ── Security Gate Handlers ──
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = passcode.trim();
    const validPasscodes = ['pm2026', 'profitmachines2026', 'profitmachines_analytics_secure_key_2026'];
    if (validPasscodes.includes(entered)) {
      sessionStorage.setItem('pm_admin_auth', 'true');
      sessionStorage.setItem('pm_admin_key', entered);
      setIsAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid Admin Passcode. Access denied.');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem('pm_admin_auth');
    sessionStorage.removeItem('pm_admin_key');
    setIsAuthenticated(false);
    setPasscode('');
  };

  // ── Security Gate UI ──
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #091a0f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: '#e2e8f0',
      }}>
        <div style={{
          maxWidth: '440px',
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(52,211,153,0.3)',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '120px', height: '120px',
            background: 'rgba(52,211,153,0.08)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }} />

          <div style={{
            width: '64px', height: '64px',
            borderRadius: '16px',
            background: 'rgba(52,211,153,0.15)',
            border: '1px solid rgba(52,211,153,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '28px',
          }}>🔒</div>

          <div style={{ textAlign: 'center' }}>
            <span style={{
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: 700,
              background: 'rgba(52,211,153,0.15)',
              color: '#6ee7b7',
              border: '1px solid rgba(52,211,153,0.25)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>Restricted Admin Area</span>
            <h2 style={{
              fontSize: '22px', fontWeight: 900, color: 'white',
              marginTop: '12px', letterSpacing: '-0.02em',
            }}>Visitor Intelligence Perimeter</h2>
            <p style={{
              fontSize: '12px', color: '#94a3b8',
              marginTop: '8px', lineHeight: 1.6,
            }}>
              Real-time visitor tracking data is restricted to authorized administrators only. Enter your Admin Key to continue.
            </p>
          </div>

          <form onSubmit={handleUnlock} style={{ marginTop: '24px' }}>
            <label style={{
              display: 'block', fontSize: '12px', fontWeight: 700,
              color: '#6ee7b7', marginBottom: '6px',
            }}>Admin Passcode / Security Key</label>
            <input
              type="password"
              value={passcode}
              onChange={e => { setPasscode(e.target.value); setPasscodeError(''); }}
              placeholder="Enter admin key"
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(52,211,153,0.4)',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '14px',
                color: 'white',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              autoFocus
            />
            {passcodeError && (
              <p style={{
                fontSize: '12px', color: '#f87171',
                marginTop: '8px', fontWeight: 500,
              }}>⚠️ {passcodeError}</p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '12px',
                borderRadius: '12px',
                background: '#34d399',
                color: '#0a0f1e',
                fontWeight: 800,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(52,211,153,0.2)',
              }}
            >🔑 Unlock Visitor Dashboard</button>
          </form>

          <div style={{
            marginTop: '24px', paddingTop: '16px',
            borderTop: '1px solid rgba(52,211,153,0.15)',
            textAlign: 'center',
          }}>
            <a href="/" style={{
              fontSize: '12px', color: '#64748b',
              textDecoration: 'none',
            }}>← Return to ProfitMachines Homepage</a>
          </div>
        </div>
      </div>
    );
  }

  const filtered = visitors.filter(v => {
    const matchSearch =
      v.ip.includes(search) ||
      v.country.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase()) ||
      v.page.toLowerCase().includes(search.toLowerCase()) ||
      v.browser.toLowerCase().includes(search.toLowerCase());
    const matchDevice = filterDevice === 'All' || v.device === filterDevice;
    return matchSearch && matchDevice;
  });

  const uniqueCountries = [...new Set(visitors.map(v => v.country))].filter(c => c !== 'Unknown').length;
  const uniqueIPs = [...new Set(visitors.map(v => v.ip))].filter(ip => ip !== 'Unknown').length;
  const mobileCount = visitors.filter(v => v.device === 'Mobile').length;

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #091a0f 100%)',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: '#e2e8f0',
      padding: '40px 24px',
    },
    header: {
      maxWidth: '1400px',
      margin: '0 auto 32px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexWrap: 'wrap' as const,
      gap: '16px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 800,
      background: 'linear-gradient(90deg, #34d399, #6ee7b7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '4px',
    },
    subtitle: { color: '#64748b', fontSize: '14px' },
    refreshBtn: {
      background: 'linear-gradient(135deg, #1B5E91, #2878B5)',
      color: '#34d399',
      border: '1px solid #34d39930',
      borderRadius: '10px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    statsRow: {
      maxWidth: '1400px',
      margin: '0 auto 32px',
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap' as const,
    },
    controls: {
      maxWidth: '1400px',
      margin: '0 auto 24px',
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap' as const,
    },
    searchInput: {
      flex: 1,
      minWidth: '200px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '10px',
      padding: '10px 16px',
      color: '#e2e8f0',
      fontSize: '14px',
      outline: 'none',
    },
    filterSelect: {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '10px',
      padding: '10px 16px',
      color: '#e2e8f0',
      fontSize: '14px',
      outline: 'none',
    },
    tableWrap: {
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      overflow: 'auto',
    },
    table: { width: '100%', borderCollapse: 'collapse' as const },
    th: {
      padding: '14px 16px',
      textAlign: 'left' as const,
      fontSize: '11px',
      fontWeight: 700,
      color: '#64748b',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      whiteSpace: 'nowrap' as const,
      background: 'rgba(255,255,255,0.02)',
    },
    td: {
      padding: '12px 16px',
      fontSize: '13px',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      whiteSpace: 'nowrap' as const,
    },
  };

  const badge = (color: string): React.CSSProperties => ({
    background: `${color}20`,
    color,
    border: `1px solid ${color}40`,
    borderRadius: '6px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: 600,
  });

  const formatTime = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    } catch { return iso; }
  };

  const truncatePage = (url: string) => {
    try {
      const u = new URL(url);
      const path = u.pathname + u.search;
      return path.length > 30 ? path.substring(0, 30) + '…' : path || '/';
    } catch { return url.substring(0, 30); }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.title}>👥 Visitor Intelligence</div>
          <div style={styles.subtitle}>
            Live visitor tracking · Last updated: {lastRefreshed.toLocaleTimeString()}
          </div>
        </div>
        <button style={styles.refreshBtn} onClick={fetchVisitors}>
          🔄 Refresh
        </button>
        <button
          style={{
            ...styles.refreshBtn,
            background: 'rgba(239,68,68,0.1)',
            color: '#f87171',
            border: '1px solid rgba(239,68,68,0.2)',
          }}
          onClick={handleLock}
        >
          🔒 Lock
        </button>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <StatCard label="Total Visits" value={visitors.length} icon="👁️" color="#34d399" />
        <StatCard label="Unique IPs" value={uniqueIPs} icon="🌐" color="#60a5fa" />
        <StatCard label="Countries" value={uniqueCountries} icon="🗺️" color="#f59e0b" />
        <StatCard label="Mobile Visitors" value={mobileCount} icon="📱" color="#a78bfa" />
        <StatCard label="Showing Now" value={filtered.length} icon="📊" color="#f472b6" />
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <input
          style={styles.searchInput}
          placeholder="🔍  Search by IP, country, city, page, browser..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={styles.filterSelect}
          value={filterDevice}
          onChange={e => setFilterDevice(e.target.value)}
        >
          <option value="All">All Devices</option>
          <option value="Desktop">🖥️ Desktop</option>
          <option value="Mobile">📱 Mobile</option>
          <option value="Tablet">📟 Tablet</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
          <div>Loading visitors from Airtable...</div>
        </div>
      ) : error ? (
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          background: '#450a0a', border: '1px solid #991b1b',
          borderRadius: '16px', padding: '32px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
          <div style={{ color: '#fca5a5', fontWeight: 600, marginBottom: '8px' }}>Setup Required</div>
          <div style={{ color: '#f87171', fontSize: '14px' }}>{error}</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '16px' }}>
            👉 In Airtable, create a table named <strong style={{ color: '#fbbf24' }}>Visitors</strong> with these fields:<br />
            IP Address · Country · City · Region · Timezone · Page Visited · Referrer ·
            Device Type · Browser · Operating System · User Agent · Visited At · Session ID · Coordinates
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔭</div>
          <div>{visitors.length === 0 ? 'No visitors yet. Deploy and visit the site to see data appear here.' : 'No visitors match your search.'}</div>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['#', 'IP Address', 'Location', 'Page Visited', 'Referrer', 'Device', 'Browser', 'OS', 'Time'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.id} style={{
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,211,153,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)')}
                >
                  <td style={{ ...styles.td, color: '#475569' }}>{filtered.length - i}</td>
                  <td style={styles.td}>
                    <code style={{ color: '#60a5fa', fontSize: '12px' }}>{v.ip}</code>
                  </td>
                  <td style={styles.td}>
                    <span style={{ marginRight: '6px' }}>{COUNTRY_FLAGS[v.country] || '🌍'}</span>
                    <span style={{ color: '#e2e8f0' }}>{v.city !== 'Unknown' ? v.city : ''}</span>
                    {v.city !== 'Unknown' && v.country !== 'Unknown' && <span style={{ color: '#475569' }}>, </span>}
                    <span style={{ color: '#94a3b8' }}>{v.country}</span>
                  </td>
                  <td style={styles.td}>
                    <span title={v.page} style={{ color: '#a78bfa' }}>
                      {truncatePage(v.page)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: v.referrer && v.referrer !== 'Direct' ? '#f59e0b' : '#475569' }}>
                      {v.referrer && v.referrer !== 'Direct' ? '🔗 ' + v.referrer.substring(0, 20) : '—'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={badge(v.device === 'Mobile' ? '#a78bfa' : v.device === 'Tablet' ? '#f59e0b' : '#60a5fa')}>
                      {DEVICE_ICONS[v.device] || '💻'} {v.device}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: '#34d399' }}>{v.browser}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: '#94a3b8' }}>{v.os}</span>
                  </td>
                  <td style={{ ...styles.td, color: '#64748b', fontSize: '12px' }}>
                    {formatTime(v.visitedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
