import React from 'react';
import { Search, X, Grid, List, SlidersHorizontal } from 'lucide-react';

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedPack,
  setSelectedPack,
  selectedKey,
  setSelectedKey,
  selectedGenre,
  setSelectedGenre,
  bpmRange,
  setBpmRange,
  viewMode,
  setViewMode,
  beatPacks,
  allKeys,
  allGenres,
  onReset
}) => {
  return (
    <div className="filter-bar-container">
      {/* Top Search & Controls Row */}
      <div className="filter-top-row">
        {/* Live Search */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="SEARCH BEAT TITLE, PACK, OR TAG..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* View Mode Switcher & Reset */}
        <div className="filter-actions-right">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <Grid size={16} /> GRID
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <List size={16} /> LIST
          </button>

          {(searchQuery || selectedPack || selectedKey || selectedGenre || bpmRange < 180) && (
            <button className="btn-brutal btn-brutal-secondary reset-btn" onClick={onReset}>
              <X size={14} /> RESET FILTERS
            </button>
          )}
        </div>
      </div>

      {/* Beat Packs Tabs Bar */}
      <div className="filter-packs-row">
        <span className="filter-label"><SlidersHorizontal size={14} /> PACKS:</span>
        <button
          className={`pack-chip ${selectedPack === '' ? 'active' : ''}`}
          onClick={() => setSelectedPack('')}
        >
          ALL PACKS
        </button>
        {beatPacks.map((pack) => (
          <button
            key={pack.id}
            className={`pack-chip ${selectedPack === pack.id ? 'active' : ''}`}
            onClick={() => setSelectedPack(pack.id)}
          >
            {pack.title.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Secondary Controls: Key Select, Genre Filter, BPM Range */}
      <div className="filter-bottom-row">
        {/* Genre Tags */}
        <div className="genre-tags-wrapper">
          <span className="filter-label">GENRE:</span>
          <button
            className={`genre-chip ${selectedGenre === '' ? 'active' : ''}`}
            onClick={() => setSelectedGenre('')}
          >
            ALL
          </button>
          {allGenres.map((g) => (
            <button
              key={g}
              className={`genre-chip ${selectedGenre === g ? 'active' : ''}`}
              onClick={() => setSelectedGenre(g)}
            >
              {g.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Key Select Dropdown */}
        <div className="filter-dropdown-wrapper">
          <label className="filter-label">KEY:</label>
          <select 
            className="filter-select"
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
          >
            <option value="">ALL KEYS</option>
            {allKeys.map((k) => (
              <option key={k} value={k}>{k.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* BPM Slider */}
        <div className="filter-slider-wrapper">
          <label className="filter-label">MAX BPM: <span className="bpm-val">{bpmRange}</span></label>
          <input
            type="range"
            min="100"
            max="180"
            step="5"
            value={bpmRange}
            onChange={(e) => setBpmRange(Number(e.target.value))}
            className="bpm-slider"
          />
        </div>
      </div>

      <style>{`
        .filter-bar-container {
          background: var(--bg-panel);
          border: 2px solid var(--border-steel);
          padding: 20px;
          margin-top: 30px;
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .filter-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .search-input-wrapper {
          flex: 1;
          min-width: 280px;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          background: var(--bg-void);
          border: 2px solid var(--border-steel-bright);
          color: var(--text-main);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          padding: 12px 14px 12px 42px;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .search-input:focus {
          border-color: var(--accent-purple);
        }
        .search-clear-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .search-clear-btn:hover {
          color: var(--accent-purple-bright);
        }
        .filter-actions-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .view-btn {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 10px 14px;
          background: var(--bg-void);
          color: var(--text-muted);
          border: 1px solid var(--border-steel);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .view-btn.active {
          background: var(--border-steel-bright);
          color: var(--text-main);
          border-color: var(--accent-purple);
        }
        .filter-packs-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          border-top: 1px solid var(--border-steel);
          border-bottom: 1px solid var(--border-steel);
          padding: 12px 0;
        }
        .filter-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pack-chip, .genre-chip {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 12px;
          background: var(--bg-void);
          color: var(--text-muted);
          border: 1px solid var(--border-steel);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .pack-chip:hover, .genre-chip:hover {
          color: var(--text-main);
          border-color: var(--accent-purple-bright);
        }
        .pack-chip.active, .genre-chip.active {
          background: var(--accent-purple);
          color: #fff;
          border-color: var(--accent-purple-bright);
        }
        .filter-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .genre-tags-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-dropdown-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .filter-select {
          background: var(--bg-void);
          border: 1px solid var(--border-steel-bright);
          color: var(--text-main);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 10px;
          outline: none;
          cursor: pointer;
        }
        .filter-select:focus {
          border-color: var(--accent-purple);
        }
        .filter-slider-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .bpm-val {
          color: var(--accent-purple-bright);
        }
        .bpm-slider {
          accent-color: var(--accent-purple);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default FilterBar;
