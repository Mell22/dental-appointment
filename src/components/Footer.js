import React from 'react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <div className="footer-brand">
                    <div className="logo">
                        <span className="logo-icon">🦷</span>
                        <span className="logo-text">PearlSmile <em>Dental</em></span>
                    </div>
                    <p>Exceptional dental care with a gentle touch. Your comfort is our priority.</p>
                </div>
                <div className="footer-links">
                    <h4>Services</h4>
                    <ul>
                        <li>General Checkup</li>
                        <li>Teeth Whitening</li>
                        <li>Orthodontics</li>
                        <li>Dental Implants</li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p><span>📍</span> 123 Smile Avenue, NY 10001</p>
                    <p><span>📞</span> +905353497041</p>
                    <p><span>✉️</span> Dental@pearlsmile.com</p>
                    <p><span>🕐</span> Mon–Fri: 8AM – 6PM</p>
                </div>
            </div>
            <div className="container footer-bottom">
                © {new Date().getFullYear()} PearlSmile Dental. All rights reserved.
            </div>
        </footer>
    );
}
