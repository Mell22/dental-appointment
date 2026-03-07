import React from 'react';

export default function Modals({
    confirmDelete, setConfirmDelete, cancelAppt,
    reminderAppt, setReminderAppt, reminderSent, setReminderSent,
    reminderChannel, setReminderChannel, sendReminder, formatDate
}) {
    return (
        <>
            {/* DELETE MODAL */}
            {confirmDelete && (
                <div className="overlay" onClick={e => { if (e.target.className === 'overlay') setConfirmDelete(null); }}>
                    <div className="modal">
                        <div className="modal-icon">🗑️</div>
                        <h3>Cancel Appointment?</h3>
                        <p>This action cannot be undone.</p>
                        <div className="modal-btns">
                            <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Keep It</button>
                            <button className="btn btn-primary" style={{ background: '#EF4444', color: 'white', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)' }} onClick={cancelAppt}>Yes, Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* REMINDER MODAL */}
            {reminderAppt && (
                <div className="overlay" onClick={e => { if (e.target.className === 'overlay') setReminderAppt(null); }}>
                    <div className="modal">
                        {!reminderSent ? (
                            <>
                                <div className="modal-icon">🔔</div>
                                <h3>Send Reminder</h3>
                                <p>Choose how to remind this patient</p>
                                <div style={{ textAlign: 'left', background: 'var(--gray-100)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                                    <strong>Patient:</strong> {reminderAppt.name}<br />
                                    <strong>Service:</strong> {reminderAppt.service}<br />
                                    <strong>Date:</strong> {formatDate(reminderAppt.date)} at {reminderAppt.time}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
                                    {['SMS', 'Email', 'Both'].map(ch => (
                                        <button key={ch}
                                            className={`btn ${reminderChannel === ch ? 'btn-primary' : 'btn-secondary'}`}
                                            style={{ padding: '8px 16px', fontSize: '14px' }}
                                            onClick={() => setReminderChannel(ch)}>
                                            {ch === 'SMS' ? '📱 SMS' : ch === 'Email' ? '✉️ Email' : '📱✉️ Both'}
                                        </button>
                                    ))}
                                </div>
                                <div className="modal-btns">
                                    <button className="btn btn-secondary" onClick={() => setReminderAppt(null)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={sendReminder}>Send Reminder</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ padding: '32px 0' }}>
                                <div className="modal-icon" style={{ color: '#10B981' }}>✅</div>
                                <h3>Reminder Sent!</h3>
                                <p>{reminderChannel} reminder successfully sent to {reminderAppt.name}</p>
                                <button className="btn btn-primary" onClick={() => setReminderAppt(null)}>Close</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
