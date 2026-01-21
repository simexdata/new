import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import EmployeeList from './components/EmployeeList.jsx';
import EmployeeCard from './components/EmployeeCard.jsx';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('name', { ascending: true });
      if (cancelled) return;
      if (error) {
        console.error('Error loading employees', error);
        setError(error.message);
      } else {
        setEmployees(data || []);
        if (data && data.length && !selectedId) {
          setSelectedId(data[0].id);
        }
      }
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const selectedEmployee = employees.find(e => e.id === selectedId) || null;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="title-row">
          <div className="brand">SIMEX DATA · SIMS v6.2</div>
          <div className="spacer" />
          <span className="user-label">Control panel</span>
        </div>
      </header>

      <main className="content-grid">
        <section className="list-pane">
          <EmployeeList
            employees={employees}
            loading={loading}
            error={error}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </section>
        <section className="detail-pane">
          <EmployeeCard employee={selectedEmployee} />
        </section>
      </main>

      <footer className="app-footer">
        Simex Data Ltd · Employee System v6.2
      </footer>
    </div>
  );
}
