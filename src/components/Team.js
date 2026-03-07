import React from 'react';

export default function Team() {
    const doctors = [
        { name: 'Dr. Emily Carter', role: 'Lead Dentist', emoji: '👩‍⚕️', bio: '15+ years in general and cosmetic dentistry. Harvard Dental School graduate.', delay: 'delay-1' },
        { name: 'Dr. James Okoye', role: 'Orthodontist', emoji: '👨‍⚕️', bio: 'Specialist in braces and Invisalign with 1,000+ successful smile transformations.', delay: 'delay-2' },
        { name: 'Dr. Aisha Benali', role: 'Oral Surgeon', emoji: '👩‍⚕️', bio: 'Expert in implants and extractions. Known for her gentle approach with patients.', delay: 'delay-3' },
        { name: 'Dr. Lucas Ferreira', role: 'Pediatric Dentist', emoji: '👨‍⚕️', bio: 'Specializes in making dental visits fun for children. Certified pediatric specialist.', delay: 'delay-4' },
    ];

    return (
        <section id="team" className="section section-team">
            <div className="container">
                <div className="section-label animate-up">Meet the Team</div>
                <h2 className="section-title animate-up">Our Expert Doctors</h2>
                <div className="team-grid">
                    {doctors.map(doc => (
                        <div key={doc.name} className={'team-card animate-up ' + doc.delay}>
                            <div className="team-avatar">{doc.emoji}</div>
                            <div className="team-info">
                                <div className="team-name">{doc.name}</div>
                                <div className="team-role">{doc.role}</div>
                                <div className="team-bio">{doc.bio}</div>
                                <div className="team-socials">
                                    <button className="team-social-btn" title="LinkedIn">💼</button>
                                    <button className="team-social-btn" title="Email">✉️</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
