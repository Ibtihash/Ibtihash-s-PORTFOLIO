
import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

// EmailJS configuration
const SERVICE_ID = 'service_pch2ewj';
const TEMPLATE_ID = 'template_k9jy1tc';
const PUBLIC_KEY = 'gHmXgBWqb8zmIz6cI'; // Make sure this is your complete public key

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('sending');

    emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      form.current,
      PUBLIC_KEY
    )
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        form.current.reset();
      })
      .catch((error) => {
        console.log(error.text);
        setStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
      });
  };

  return (
    <div className="container contact-container">
      <h1 className="text-center mb-5 section-heading">Contact Me</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card contact-form-card">
            <div className="card-body">
              <h5 className="card-title">Send a Message</h5>
              <form ref={form} onSubmit={sendEmail}>
                <div className="mb-3">
                  <label htmlFor="from_name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="from_name" 
                    name="from_name" 
                    placeholder="Enter your name"
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="from_email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="from_email" 
                    name="from_email" 
                    placeholder="Enter your email"
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea 
                    className="form-control" 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <input 
                  type="hidden" 
                  name="to_email" 
                  value="syedibtihash@gmail.com" 
                />
                <button 
                  type="submit" 
                  className="btn btn-primary w-100" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && (
                  <div className="alert alert-success mt-3">
                    Message sent successfully!
                  </div>
                )}
                {status === 'error' && (
                  <div className="alert alert-danger mt-3">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="alt-contact-info">
            <h5>Other Ways to Connect</h5>
            <p><strong>Email:</strong> syedibtihash@gmail.com</p>
            <p><strong>Phone:</strong> 123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
