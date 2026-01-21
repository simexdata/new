import React from 'react';

export default function EmployeeCard({ employee }) {
  if (!employee) {
    return (
      <div className="empty-card">
        <h2>Няма избран служител</h2>
        <p>Избери служител от списъка отляво.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div>
        <img
          className="photo"
          src={employee.photo_url || 'https://placehold.co/640x640?text=Employee'}
          alt={employee.name}
        />
      </div>
      <div>
        <div className="title">
          <h3>{employee.name}{employee.nickname ? ` (${employee.nickname})` : ''}</h3>
          <div className="subtitle">
            {employee.department || '—'} · {employee.role || '—'}
          </div>
        </div>

        <div className="section meta">
          <div className="item">
            <div className="label">Имейл</div>
            <div className="value monospace">{employee.email || '—'}</div>
          </div>
          <div className="item">
            <div className="label">Телефон</div>
            <div className="value">{employee.phone || '—'}</div>
          </div>
          <div className="item">
            <div className="label">Ставка (лв/ч)</div>
            <div className="value">{employee.hourly_rate ?? '—'}</div>
          </div>
        </div>

        <div className="section">
          <div className="label">Адрес</div>
          <div className="value">{employee.address || '—'}</div>
        </div>

        <div className="section">
          <div className="label">Бележки</div>
          <div className="value">{employee.notes || '—'}</div>
        </div>
      </div>
    </div>
  );
}
