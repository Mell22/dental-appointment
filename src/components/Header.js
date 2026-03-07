import React from 'react';

export default function Header() {
    return (
        <header className="site-header">
            <div className="container header-inner">
                <a href="/" className="logo">
                    <span className="logo-icon">🦷</span>
                    <span className="logo-text">PearlSmile <em>Dental</em></span>
                </a>
                <nav className="nav">
                    <a href="#book">Book</a>
                    <a href="#appointments">Appointments</a>
                    <a href="#team">Our Team</a>
                    <a href="#reviews">Reviews</a>
                    <a href="tel:+905353497041" className="nav-cta">📞 Call Us</a>
                </nav>
            </div>
        </header>
    );
}
