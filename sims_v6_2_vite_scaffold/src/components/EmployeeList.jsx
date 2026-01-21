import React, { useMemo, useState } from 'react';

export default function EmployeeList({ employees, loading, error, selectedId, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(e =>
      (e.name || '').toLowerCase().includes(q) ||
      (e.email || '').toLowerCase().includes(q) ||
      (e.department || '').toLowerCase().includes(q)
    );
  }, [employees, query]);

  return (
    <div className="employee-list">
      <div className="list-header">
        <h2>Картотека</h2>
        <input
          className="input"
          placeholder="Търсене по име, имейл, отдел..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="list-table">
        <div className="list-row list-head">
          <div className="cell">Име</div>
          <div className="cell">Отдел</div>
          <div className="cell">Роля</div>
          <div className="cell">Имейл</div>
        </div>
        {loading && (
          <div className="list-row">
            <div className="cell">Зареждане...</div>
          </div>
        )}
        {error && !loading && (
          <div className="list-row">
            <div className="cell" style={{ color: '#b91c1c' }}>Грешка: {error}</div>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="list-row">
            <div className="cell">Няма резултати.</div>
          </div>
        )}
        {!loading && !error && filtered.map(emp => (
          <button
            key={emp.id}
            className={'list-row list-row-btn' + (emp.id === selectedId ? ' active' : '')}
            type="button"
            onClick={() => onSelect && onSelect(emp.id)}
          >
            <div className="cell">
              <span className="name">{emp.name || '—'}</span>
              {emp.nickname && <span className="nickname"> ({emp.nickname})</span>}
            </div>
            <div className="cell">{emp.department || '—'}</div>
            <div className="cell">{emp.role || '—'}</div>
            <div className="cell monospace">{emp.email || '—'}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
