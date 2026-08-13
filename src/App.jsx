import React, { useState, useEffect, useMemo } from 'react';
import { AudioProvider, useAudio } from './context/AudioContext';
import Header from './components/Header';
import Hero from './components/Hero';
import PackGridShowcase from './components/PackGridShowcase';
import FilterBar from './components/FilterBar';
import TrackCard from './components/TrackCard';
import AudioPlayer from './components/AudioPlayer';
import QueueDrawer from './components/QueueDrawer';
import { SearchX, ArrowLeft, Sliders, Disc } from 'lucide-react';

const MainAppContent = () => {
  const { tracks, beatPacks, scanlinesActive } = useAudio();

  // Initialize navigation & filter states from URL SearchParams or localStorage for reload persistence
  const getInitialState = () => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace('#', '');
    
    const viewFromUrl = params.get('view') || (['home', 'packs', 'catalog'].includes(hash) ? hash : null);
    const initialView = viewFromUrl || localStorage.getItem('beat_vault_view') || 'home';
    const initialPack = params.get('pack') || localStorage.getItem('beat_vault_pack') || '';
    const initialQuery = params.get('search') || '';
    const initialKey = params.get('key') || '';
    const initialGenre = params.get('genre') || '';
    const initialBpm = params.get('bpm') ? Number(params.get('bpm')) : 180;
    const initialMode = localStorage.getItem('beat_vault_view_mode') || 'grid';

    return {
      activeView: ['home', 'packs', 'catalog'].includes(initialView) ? initialView : 'home',
      selectedPack: initialPack,
      searchQuery: initialQuery,
      selectedKey: initialKey,
      selectedGenre: initialGenre,
      bpmRange: initialBpm,
      viewMode: initialMode
    };
  };

  const initial = useMemo(getInitialState, []);

  const [activeView, setActiveView] = useState(initial.activeView);
  const [searchQuery, setSearchQuery] = useState(initial.searchQuery);
  const [selectedPack, setSelectedPack] = useState(initial.selectedPack);
  const [selectedKey, setSelectedKey] = useState(initial.selectedKey);
  const [selectedGenre, setSelectedGenre] = useState(initial.selectedGenre);
  const [bpmRange, setBpmRange] = useState(initial.bpmRange);
  const [viewMode, setViewMode] = useState(initial.viewMode);

  // Sync state changes to URL SearchParams & localStorage
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeView !== 'home') params.set('view', activeView);
    if (selectedPack) params.set('pack', selectedPack);
    if (searchQuery) params.set('search', searchQuery);
    if (selectedKey) params.set('key', selectedKey);
    if (selectedGenre) params.set('genre', selectedGenre);
    if (bpmRange < 180) params.set('bpm', bpmRange.toString());

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    
    window.history.replaceState(null, '', newUrl);

    localStorage.setItem('beat_vault_view', activeView);
    localStorage.setItem('beat_vault_pack', selectedPack);
    localStorage.setItem('beat_vault_view_mode', viewMode);
  }, [activeView, selectedPack, searchQuery, selectedKey, selectedGenre, bpmRange, viewMode]);

  // Handle browser back/forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const state = getInitialState();
      setActiveView(state.activeView);
      setSelectedPack(state.selectedPack);
      setSearchQuery(state.searchQuery);
      setSelectedKey(state.selectedKey);
      setSelectedGenre(state.selectedGenre);
      setBpmRange(state.bpmRange);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Extract unique Keys and Genres for dropdown filters
  const allKeys = useMemo(() => {
    const keysSet = new Set(tracks.map(t => t.key).filter(Boolean));
    return Array.from(keysSet).sort();
  }, [tracks]);

  const allGenres = useMemo(() => {
    const genreSet = new Set(tracks.map(t => t.genre).filter(Boolean));
    return Array.from(genreSet).sort();
  }, [tracks]);

  // Real-time Filtering Engine
  const filteredTracks = useMemo(() => {
    return tracks.filter(t => {
      // Search query check (title, pack, tags)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        t.title.toLowerCase().includes(q) ||
        (t.packTitle && t.packTitle.toLowerCase().includes(q)) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );

      // Pack filter
      const matchesPack = !selectedPack || t.packId === selectedPack;

      // Key filter
      const matchesKey = !selectedKey || t.key === selectedKey;

      // Genre filter
      const matchesGenre = !selectedGenre || t.genre === selectedGenre;

      // BPM Filter
      const matchesBpm = t.bpm <= bpmRange;

      return matchesSearch && matchesPack && matchesKey && matchesGenre && matchesBpm;
    });
  }, [tracks, searchQuery, selectedPack, selectedKey, selectedGenre, bpmRange]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPack('');
    setSelectedKey('');
    setSelectedGenre('');
    setBpmRange(180);
  };

  const handleSelectPackFromHome = (packId) => {
    setSelectedPack(packId);
    setActiveView('packs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="vault-app-root">
      {scanlinesActive && <div className="scanlines-overlay"></div>}
      <div className="industrial-grid-bg"></div>

      <Header activeView={activeView} setActiveView={setActiveView} />

      {/* VIEW 1: LANDING PAGE ('home') */}
      {activeView === 'home' && (
        <div className="view-home">
          <Hero 
            onGoToPacks={() => {
              setSelectedPack('');
              setActiveView('packs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToCatalog={() => {
              setSelectedPack('');
              setActiveView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <PackGridShowcase 
            beatPacks={beatPacks}
            tracks={tracks}
            onSelectPack={handleSelectPackFromHome}
          />
        </div>
      )}

      {/* VIEW 2 & 3: PACK LIST / BEAT CATALOG VIEW ('packs' | 'catalog') */}
      {(activeView === 'packs' || activeView === 'catalog') && (
        <main className="vault-container view-catalog-container" id="catalog">
          <div className="catalog-header-row">
            <div className="catalog-title-box">
              <button 
                className="btn-brutal back-home-btn"
                onClick={() => setActiveView('home')}
              >
                <ArrowLeft size={16} /> BACK TO HOME
              </button>

              <h2 className="catalog-heading">
                {activeView === 'packs' ? 'PACK LIST' : 'ALL BEATS'} <span className="accent-text">STREAM VAULT</span>
              </h2>

              <span className="catalog-count-badge">
                SHOWING {filteredTracks.length} OF {tracks.length} PREVIEW STREAMS
              </span>
            </div>
          </div>

          {/* Filter Controls Bar */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedPack={selectedPack}
            setSelectedPack={setSelectedPack}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            bpmRange={bpmRange}
            setBpmRange={setBpmRange}
            viewMode={viewMode}
            setViewMode={setViewMode}
            beatPacks={beatPacks}
            allKeys={allKeys}
            allGenres={allGenres}
            onReset={handleResetFilters}
          />

          {/* Catalog List / Grid */}
          {filteredTracks.length === 0 ? (
            <div className="empty-catalog-card card-tactile">
              <SearchX size={48} className="empty-icon" />
              <h3 className="empty-title">NO BEATS FOUND MATCHING CRITERIA</h3>
              <p className="empty-desc">Try resetting your filter parameters or search keywords.</p>
              <button className="btn-brutal btn-brutal-primary" onClick={handleResetFilters}>
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className={`catalog-layout-${viewMode}`}>
              {filteredTracks.map((track, idx) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={idx}
                  viewMode={viewMode}
                  allFilteredTracks={filteredTracks}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="industrial-footer">
        <div className="vault-container footer-inner">
          <div className="footer-left">
            <span className="footer-brand">RAYR // BEAT SHOWCASE</span>
            <span className="footer-copy">© 2026 RAYR BEATS. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => setActiveView('home')}>HOME</button>
            <button className="footer-link-btn" onClick={() => setActiveView('packs')}>BEAT PACKS</button>
            <button className="footer-link-btn" onClick={() => setActiveView('catalog')}>ALL BEATS</button>
          </div>
        </div>
      </footer>

      <AudioPlayer />
      <QueueDrawer />

      <style>{`
        .vault-app-root {
          position: relative;
          min-height: 100vh;
        }
        .view-catalog-container {
          padding-top: 40px;
        }
        .back-home-btn {
          margin-bottom: 20px;
          padding: 8px 16px;
        }
        .catalog-heading {
          font-family: var(--font-impact);
          font-size: 2.8rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .catalog-count-badge {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-purple-bright);
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid var(--accent-purple);
          padding: 4px 10px;
          display: inline-block;
          margin-top: 10px;
        }
        .catalog-layout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 20px;
          margin-bottom: 80px;
        }
        .catalog-layout-list {
          display: flex;
          flex-direction: column;
          margin-bottom: 80px;
        }
        .empty-catalog-card {
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 80px;
        }
        .empty-icon {
          color: var(--accent-purple-bright);
        }
        .empty-title {
          font-family: var(--font-impact);
          font-size: 1.6rem;
          font-weight: 900;
        }
        .empty-desc {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .industrial-footer {
          border-top: 2px solid var(--border-steel);
          background: var(--bg-panel);
          padding: 30px 0;
          margin-bottom: var(--player-height);
        }
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .footer-brand {
          font-family: var(--font-impact);
          font-size: 1.1rem;
          font-weight: 900;
        }
        .footer-copy {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .footer-links {
          display: flex;
          gap: 20px;
        }
        .footer-link-btn {
          background: none;
          border: none;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
        }
        .footer-link-btn:hover {
          color: var(--accent-purple-bright);
        }
      `}</style>
    </div>
  );
};

const App = () => (
  <AudioProvider>
    <MainAppContent />
  </AudioProvider>
);

export default App;
