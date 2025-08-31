import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, Facebook, Instagram} from 'lucide-react';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.website) return;
    try {
      await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (err) {
      toast.error("Failed to send feedback. Please try again.");
    }
  };

  return (
    <div className="bg-light text-dark">
  <section className="bg-white py-5 text-center border-bottom">
    <div className="container">
      <h1 className="display-4 text-primary">Contact Us</h1>
      <p className="lead">Have questions or feedback? We'd love to hear from you.</p>
    </div>
  </section>

  <section className="py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-md-6">
          <h2 className="text-primary">Get in Touch</h2>
          <p>Need help or want to share feedback? We're here to assist.</p>

          <div className="mb-4 d-flex">
            <MapPin className="text-success me-3 mt-1" />
            <div>
              <h5 className="fw-bold">Our Location</h5>
              <address>
                14 Blossom Arcade<br />
                Near Aarey Garden Center <br />
                Marol, Andheri East, Mumbai 400059<br />
                Maharashtra, India
              </address>
            </div>
          </div>

          <div className="mb-4 d-flex">
            <Mail className="text-success me-3 mt-1" />
            <div>
              <h5 className="fw-bold">Email Us</h5>
              <p>
                <a href="mailto:support@vanaspati.com" className="text-decoration-none">support@vanaspati.com</a>
              </p>
            </div>
          </div>

          <div className="mb-4 d-flex">
            <Phone className="text-success me-3 mt-1" />
            <div>
              <h5 className="fw-bold">Call Us</h5>
              <p>
                <a href="tel:+919876543210" className="text-decoration-none">+91-9112312423</a><br />
                <span className="text-muted">Mon–Fri: 9am–5pm IST</span>
              </p>
            </div>
          </div>

          <div>
            <h5 className="fw-bold">Connect with us</h5>
            <div className="d-flex gap-3">
              <a href="https://www.facebook.com/"><Facebook className="text-primary" /></a>
              <a href="https://www.instagram.com/"><Instagram className="text-danger" /></a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-white text-dark p-4 shadow-sm">
            <h3 className="mb-4 text-primary">Send Us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" className="d-none" {...register('website')} />

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  disabled={isSubmitting}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  disabled={isSubmitting}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  disabled={isSubmitting}
                />
                {errors.subject && <div className="invalid-feedback">{errors.subject.message}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  rows={5}
                  className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  id="message"
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 20,
                      message: 'Message must be at least 20 characters',
                    },
                  })}
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : <>
                  <Send className="me-2" size={16} /> Send Message
                </>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="py-5 bg-white border-top">
    <div className="container">
      <h3 className="text-center text-primary mb-4">Visit Our Office</h3>
      <div className="rounded shadow" style={{ height: "400px", overflow: "hidden" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109168.2562253487!2d72.6814015972656!3d19.114714900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9bf0628a9e1%3A0x655f4077e15252a0!2sCentre%20for%20Development%20of%20Advanced%20Computing!5e1!3m2!1sen!2sin!4v1749412449688!5m2!1sen!2sin"
          title="Google Map Location"
          style={{ border: 0, width: "100%", height: "100%" }}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  </section>
</div>

  );
};

export default ContactPage;
