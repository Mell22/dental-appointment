import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import AppointmentsTable from './components/AppointmentsTable';
import Team from './components/Team';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Modals from './components/Modals';

let idCounter = 1;

export default function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm Pearl, your dental assistant. How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, author: 'Sarah M.', service: 'Teeth Whitening', rating: 5, text: 'Absolutely amazing experience! My teeth are so white now. The staff was incredibly gentle and professional.', date: 'Jan 12, 2024', initials: 'SM' },
    { id: 2, author: 'James K.', service: 'General Checkup', rating: 5, text: 'Best dental clinic I have ever been to. Very modern equipment and the doctors explain everything clearly.', date: 'Feb 3, 2024', initials: 'JK' },
    { id: 3, author: 'Amira L.', service: 'Root Canal', rating: 4, text: 'I was terrified of root canals but the team made me feel completely at ease. Painless procedure!', date: 'Feb 28, 2024', initials: 'AL' },
    { id: 4, author: 'Tom R.', service: 'Dental Implants', rating: 5, text: 'My implants look and feel completely natural. Worth every penny. Highly recommend PearlSmile!', date: 'Mar 15, 2024', initials: 'TR' },
    { id: 5, author: 'Nina P.', service: 'Orthodontics Consult', rating: 5, text: 'Very thorough consultation. The doctor took time to explain all my options. Booking my treatment next month!', date: 'Apr 2, 2024', initials: 'NP' },
  ]);
  const [reviewForm, setReviewForm] = useState({ author: '', service: '', rating: 0, text: '' });
  const [reviewErrors, setReviewErrors] = useState({});
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reminderAppt, setReminderAppt] = useState(null);
  const [reminderChannel, setReminderChannel] = useState('SMS');
  const [reminderSent, setReminderSent] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const SERVICES = [
    'General Checkup', 'Teeth Cleaning', 'Teeth Whitening',
    'Dental Filling', 'Root Canal', 'Orthodontics Consult',
    'Dental Implants', 'Emergency Care'
  ];
  const TIMES = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];
  const STATUSES = ['Pending', 'Confirmed', 'Cancelled'];

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    if (!phone.trim()) e.phone = 'Phone is required.';
    if (!service) e.service = 'Please select a service.';
    if (!date) e.date = 'Please choose a date.';
    if (!time) e.time = 'Please choose a time.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    const appt = { id: idCounter++, name, email, phone, service, date, time, notes, status: 'Pending' };
    setList(old => [...old, appt]);
    setToast('✅ Appointment booked for ' + name + '!');
    setTimeout(() => setToast(''), 4000);
    setName(''); setEmail(''); setPhone('');
    setService(''); setDate(''); setTime(''); setNotes('');
    setErrors({});
    setTimeout(() => {
      const el = document.getElementById('appointments');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  function updateStatus(id, newStatus) {
    setList(old => old.map(a => a.id === id ? { ...a, status: newStatus } : a));
  }

  function cancelAppt() {
    setList(old => old.filter(a => a.id !== confirmDelete));
    setConfirmDelete(null);
    setToast('Appointment cancelled.');
    setTimeout(() => setToast(''), 3000);
  }

  function submitReview(e) {
    e.preventDefault();
    const err = {};
    if (!reviewForm.author.trim()) err.author = 'Name is required.';
    if (!reviewForm.service) err.service = 'Please select a service.';
    if (!reviewForm.rating) err.rating = 'Please select a rating.';
    if (!reviewForm.text.trim()) err.text = 'Please write a review.';
    setReviewErrors(err);
    if (Object.keys(err).length > 0) return;
    const newReview = {
      id: Date.now(),
      author: reviewForm.author.trim(),
      service: reviewForm.service,
      rating: reviewForm.rating,
      text: reviewForm.text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      initials: reviewForm.author.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    };
    setReviews(prev => [newReview, ...prev]);
    setReviewForm({ author: '', service: '', rating: 0, text: '' });
    setReviewErrors({});
    setToast('⭐ Thank you for your review!');
    setTimeout(() => setToast(''), 4000);
  }

  function sendReminder() {
    setReminderSent(true);
    setTimeout(() => {
      setReminderSent(false);
      setReminderAppt(null);
      setReminderChannel('SMS');
    }, 3000);
  }

  function getBotReply(msg) {
    const m = msg.toLowerCase();
    if (/^(hi|hello|hey)/.test(m)) return "Hello! 👋 Welcome to PearlSmile Dental. How can I help you?";
    if (m.includes('book') || m.includes('appointment')) return "📅 Scroll up to the booking form and fill in your details!";
    if (m.includes('service') || m.includes('treatment')) return "🦷 We offer:\n• General Checkup\n• Teeth Cleaning\n• Teeth Whitening\n• Dental Filling\n• Root Canal\n• Orthodontics\n• Dental Implants\n• Emergency Care";
    if (m.includes('price') || m.includes('cost')) return "💰 Prices:\n• Checkup: $50\n• Cleaning: $80\n• Whitening: $200\n• Filling: $150\n• Root Canal: $800\n• Implants: $1,500";
    if (m.includes('hour') || m.includes('open')) return "🕐 Hours:\n• Mon–Fri: 8AM–6PM\n• Saturday: 9AM–2PM\n• Sunday: Closed";
    if (m.includes('location') || m.includes('address')) return "📍 123 Smile Avenue, New York, NY 10001";
    if (m.includes('contact') || m.includes('phone')) return "📞 +905353497041\n✉️ Dental@pearlsmile.com";
    if (m.includes('emergency') || m.includes('pain')) return "🚨 Call us immediately: +905353497041\nWe have same-day emergency appointments!";
    if (m.includes('insurance')) return "🏥 We accept Delta Dental, Cigna, Aetna, and BlueCross.";
    if (m.includes('thank')) return "You're welcome! 😊 See you at PearlSmile Dental!";
    if (m.includes('bye')) return "Goodbye! 👋 Keep smiling! 😁";
    return "I can help with:\n• 📅 Booking\n• 🦷 Services & prices\n• 📍 Location & hours\n• 📞 Contact\n• 🚨 Emergencies";
  }

  function sendMessage() {
    if (!userInput.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: userInput }]);
    setUserInput('');
    setBotTyping(true);
    const reply = getBotReply(userInput);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
      setBotTyping(false);
    }, 800);
  }

  function formatDate(s) {
    if (!s) return '';
    const [y, m, d] = s.split('-');
    return new Date(Number(y), Number(m) - 1, Number(d))
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  const starCounts = [5, 4, 3, 2, 1].map(n => ({
    star: n, count: reviews.filter(r => r.rating === n).length
  }));

  const q = search.toLowerCase();
  const filtered = list
    .filter(a =>
      (a.name.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q)) &&
      (statusFilter === 'All' || a.status === statusFilter)
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  React.useEffect(() => {
    // Basic Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));
    return () => document.querySelectorAll('.animate-up').forEach(el => observer.unobserve(el));
  }, [reviews, list, search, statusFilter]);

  return (
    <div>
      <Header />
      <Hero />
      <BookingForm
        name={name} setName={setName} email={email} setEmail={setEmail}
        phone={phone} setPhone={setPhone} service={service} setService={setService}
        date={date} setDate={setDate} time={time} setTime={setTime} notes={notes} setNotes={setNotes}
        errors={errors} setErrors={setErrors} SERVICES={SERVICES} TIMES={TIMES}
        today={today} submit={submit} toast={toast}
      />
      <AppointmentsTable
        search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        filtered={filtered} STATUSES={STATUSES} updateStatus={updateStatus}
        setReminderAppt={setReminderAppt} setReminderSent={setReminderSent}
        setConfirmDelete={setConfirmDelete} formatDate={formatDate}
      />
      <Team />
      <Reviews
        reviews={reviews} setReviews={setReviews} reviewForm={reviewForm} setReviewForm={setReviewForm}
        reviewErrors={reviewErrors} setReviewErrors={setReviewErrors} SERVICES={SERVICES}
        hoveredStar={hoveredStar} setHoveredStar={setHoveredStar} submitReview={submitReview}
        avgRating={avgRating} starCounts={starCounts}
      />
      <Footer />

      <Modals
        confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} cancelAppt={cancelAppt}
        reminderAppt={reminderAppt} setReminderAppt={setReminderAppt} reminderSent={reminderSent}
        setReminderSent={setReminderSent} reminderChannel={reminderChannel} setReminderChannel={setReminderChannel}
        sendReminder={sendReminder} formatDate={formatDate}
      />
      <Chatbot
        chatOpen={chatOpen} setChatOpen={setChatOpen} messages={messages}
        botTyping={botTyping} userInput={userInput} setUserInput={setUserInput} sendMessage={sendMessage}
      />
    </div>
  );
}