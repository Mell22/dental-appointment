import React from 'react';

export default function BookingForm({
    name, setName, email, setEmail, phone, setPhone, service, setService,
    date, setDate, time, setTime, notes, setNotes, errors, setErrors,
    SERVICES, TIMES, today, submit, toast
}) {
    return (
        <section id="book" className="section">
            <div className="container">
                <div className="section-label">Schedule a Visit</div>
                <h2 className="section-title">Book Your Appointment</h2>
                {toast && <div className="toast success">{toast}</div>}
                <div className="card form-card">
                    <form onSubmit={submit} noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name <span className="req">*</span></label>
                                <input type="text" value={name} placeholder="Jane Doe"
                                    className={errors.name ? 'invalid' : ''}
                                    onChange={e => { setName(e.target.value); setErrors(x => ({ ...x, name: '' })); }} />
                                {errors.name && <span className="err">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label>Email <span className="req">*</span></label>
                                <input type="email" value={email} placeholder="jane@example.com"
                                    className={errors.email ? 'invalid' : ''}
                                    onChange={e => { setEmail(e.target.value); setErrors(x => ({ ...x, email: '' })); }} />
                                {errors.email && <span className="err">{errors.email}</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone <span className="req">*</span></label>
                                <input type="tel" value={phone} placeholder="(555) 000-0000"
                                    className={errors.phone ? 'invalid' : ''}
                                    onChange={e => { setPhone(e.target.value); setErrors(x => ({ ...x, phone: '' })); }} />
                                {errors.phone && <span className="err">{errors.phone}</span>}
                            </div>
                            <div className="form-group">
                                <label>Service <span className="req">*</span></label>
                                <select value={service} className={errors.service ? 'invalid' : ''}
                                    onChange={e => { setService(e.target.value); setErrors(x => ({ ...x, service: '' })); }}>
                                    <option value="">— Select —</option>
                                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {errors.service && <span className="err">{errors.service}</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Date <span className="req">*</span></label>
                                <input type="date" value={date} min={today}
                                    className={errors.date ? 'invalid' : ''}
                                    onChange={e => { setDate(e.target.value); setErrors(x => ({ ...x, date: '' })); }} />
                                {errors.date && <span className="err">{errors.date}</span>}
                            </div>
                            <div className="form-group">
                                <label>Time <span className="req">*</span></label>
                                <select value={time} className={errors.time ? 'invalid' : ''}
                                    onChange={e => { setTime(e.target.value); setErrors(x => ({ ...x, time: '' })); }}>
                                    <option value="">— Select —</option>
                                    {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                {errors.time && <span className="err">{errors.time}</span>}
                            </div>
                        </div>
                        <div className="form-group full">
                            <label>Notes</label>
                            <textarea rows="3" value={notes}
                                placeholder="Any concerns or special requirements…"
                                onChange={e => setNotes(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-submit">
                            Confirm Appointment
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
