import React from 'react';

export default function AppointmentsTable({
    search, setSearch, statusFilter, setStatusFilter, filtered, STATUSES,
    updateStatus, setReminderAppt, setReminderSent, setConfirmDelete, formatDate
}) {

    function statusStyle(status) {
        if (status === 'Confirmed') return { background: '#ecfdf5', color: '#065f46' };
        if (status === 'Pending') return { background: '#fffbeb', color: '#92400e' };
        if (status === 'Cancelled') return { background: '#fef2f2', color: '#991b1b' };
        return {};
    }

    return (
        <section id="appointments" className="section section-alt">
            <div className="container">
                <div className="section-label">Manage</div>
                <h2 className="section-title">Scheduled Appointments</h2>
                <div className="table-toolbar">
                    <input className="search-input"
                        placeholder="🔍 Search by name or service…"
                        value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="status-filters">
                        {['All', 'Pending', 'Confirmed', 'Cancelled'].map(s => (
                            <button key={s}
                                className={'filter-btn' + (statusFilter === s ? ' active' : '')}
                                onClick={() => setStatusFilter(s)}>{s}
                            </button>
                        ))}
                    </div>
                    <span className="appt-count">
                        {filtered.length} appointment{filtered.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="card table-card">
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th><th>Patient</th><th>Phone</th><th>Service</th>
                                    <th>Date</th><th>Time</th><th>Status</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((a, i) => (
                                    <tr key={a.id}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <div className="pt-name">{a.name}</div>
                                            <div className="pt-email">{a.email}</div>
                                        </td>
                                        <td>{a.phone}</td>
                                        <td>{a.service}</td>
                                        <td>{formatDate(a.date)}</td>
                                        <td>{a.time}</td>
                                        <td>
                                            <select className="status-select" value={a.status}
                                                style={statusStyle(a.status)}
                                                onChange={e => updateStatus(a.id, e.target.value)}>
                                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <button className="btn-secondary" style={{ padding: '6px', fontSize: '14px', borderRadius: '6px' }} title="Send Reminder"
                                                    onClick={() => { setReminderAppt(a); setReminderSent(false); }}>
                                                    🔔
                                                </button>
                                                <button className="btn-secondary" style={{ padding: '6px', fontSize: '14px', borderRadius: '6px', color: '#991b1b', borderColor: '#991b1b' }}
                                                    onClick={() => setConfirmDelete(a.id)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length === 0 && (
                        <div className="empty">
                            <div className="empty-icon">📅</div>
                            <p>{search ? 'No results found.' : 'No appointments yet. Book your first visit above!'}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
