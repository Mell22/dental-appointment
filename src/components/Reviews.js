import React from 'react';

export default function Reviews({
    reviews, reviewForm, setReviewForm, reviewErrors, setReviewErrors,
    SERVICES, hoveredStar, setHoveredStar, submitReview, avgRating, starCounts
}) {
    return (
        <section id="reviews" className="section section-reviews">
            <div className="container">
                <div className="section-label animate-up">Testimonials</div>
                <h2 className="section-title animate-up">What Our Patients Say</h2>
                <div className="review-summary animate-up">
                    <div>
                        <div className="review-avg">{avgRating}</div>
                        <div className="review-stars" style={{ color: 'var(--gold-primary)' }}>
                            {'★'.repeat(Math.round(Number(avgRating)))}{'☆'.repeat(5 - Math.round(Number(avgRating)))}
                        </div>
                        <div className="review-avg-label">{reviews.length} reviews</div>
                    </div>
                    <div className="review-bars">
                        {starCounts.map(({ star, count }) => (
                            <div key={star} className="review-bar-row">
                                <span className="review-bar-label">{star}★</span>
                                <div className="review-bar-bg">
                                    <div className="review-bar-fill"
                                        style={{ width: reviews.length ? (count / reviews.length * 100) + '%' : '0%' }} />
                                </div>
                                <span className="review-bar-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="reviews-grid">
                    {reviews.map((r, i) => (
                        <div key={r.id} className={'review-card animate-up delay-' + ((i % 3) + 1)}>
                            <div className="review-header">
                                <div className="review-avatar">{r.initials}</div>
                                <div>
                                    <div className="review-author">{r.author}</div>
                                    <div className="review-date">{r.date}</div>
                                </div>
                                <div className="review-stars" style={{ marginLeft: 'auto', color: 'var(--gold-primary)' }}>
                                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                                </div>
                            </div>
                            <p className="review-text">"{r.text}"</p>
                            <span className="review-service">{r.service}</span>
                        </div>
                    ))}
                </div>

                {/* Review Form */}
                <div className="card review-form-card animate-up" style={{ marginTop: '48px' }}>
                    <div className="section-label">Share Your Experience</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy-900)', marginBottom: '32px', fontSize: '24px', fontWeight: '700' }}>Leave a Review</h3>
                    <form onSubmit={submitReview} noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Your Name <span className="req">*</span></label>
                                <input type="text" placeholder="Jane Doe" value={reviewForm.author}
                                    className={reviewErrors.author ? 'invalid' : ''}
                                    onChange={e => { setReviewForm(f => ({ ...f, author: e.target.value })); setReviewErrors(x => ({ ...x, author: '' })); }} />
                                {reviewErrors.author && <span className="err">{reviewErrors.author}</span>}
                            </div>
                            <div className="form-group">
                                <label>Service Received <span className="req">*</span></label>
                                <select value={reviewForm.service} className={reviewErrors.service ? 'invalid' : ''}
                                    onChange={e => { setReviewForm(f => ({ ...f, service: e.target.value })); setReviewErrors(x => ({ ...x, service: '' })); }}>
                                    <option value="">— Select —</option>
                                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {reviewErrors.service && <span className="err">{reviewErrors.service}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Rating <span className="req">*</span></label>
                            <div className="star-picker" style={{ color: 'var(--gold-primary)' }}>
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button key={n} type="button" className="star-btn" style={{ color: 'var(--gold-primary)' }}
                                        onMouseEnter={() => setHoveredStar(n)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        onClick={() => { setReviewForm(f => ({ ...f, rating: n })); setReviewErrors(x => ({ ...x, rating: '' })); }}>
                                        {n <= (hoveredStar || reviewForm.rating) ? '★' : '☆'}
                                    </button>
                                ))}
                            </div>
                            {reviewErrors.rating && <span className="err">{reviewErrors.rating}</span>}
                        </div>
                        <div className="form-group full" style={{ marginTop: '24px' }}>
                            <label>Your Review <span className="req">*</span></label>
                            <textarea rows="4" placeholder="Tell us about your experience…"
                                value={reviewForm.text} className={reviewErrors.text ? 'invalid' : ''}
                                onChange={e => { setReviewForm(f => ({ ...f, text: e.target.value })); setReviewErrors(x => ({ ...x, text: '' })); }} />
                            {reviewErrors.text && <span className="err">{reviewErrors.text}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '24px' }}>Submit Review</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
