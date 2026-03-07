import React from 'react';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <span className="hero-sub">World-class dental care</span>
                <h1>Your Perfect Smile<br /><span>Starts Here</span></h1>
                <p className="hero-desc">
                    Book your appointment in under 60 seconds. Flexible scheduling,
                    gentle care, and stunning results.
                </p>
                <div className="hero-actions">
                    <a href="#book" className="btn btn-primary">Book an Appointment</a>
                    <a href="#team" className="btn btn-secondary">Meet the Team</a>
                </div>
            </div>
            <div className="container hero-badges">
                <div className="badge">
                    <span>⭐ 4.9</span>
                    <small>Google Reviews</small>
                </div>
                <div className="badge">
                    <span>20+</span>
                    <small>Years Experience</small>
                </div>
                <div className="badge">
                    <span>5,000+</span>
                    <small>Happy Patients</small>
                </div>
            </div>
        </section>
    );
}
