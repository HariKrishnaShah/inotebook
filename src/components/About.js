import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>About iNotebook</h1>
      <div className="about-content">
        <section className="app-description">
          <h2>Your Digital Notebook</h2>
          <p>
            iNotebook is a powerful, user-friendly online note-taking application designed to help you capture, organize, and access your thoughts and ideas from anywhere. With iNotebook, you can create, edit, and store your notes securely in the cloud, ensuring that your important information is always at your fingertips.
          </p>
        </section>

        <section className="features">
          <h2>Key Features</h2>
          <ul>
            <li>Create and edit notes with a rich text editor</li>
            <li>Organize notes with tags and categories</li>
            <li>Access your notes from any device with internet connection</li>
            <li>Secure cloud storage for your data</li>
            <li>User-friendly interface for seamless note-taking experience</li>
          </ul>
        </section>

        <section className="developer-info">
          <h2>Meet the Developer</h2>
          <img src="/path-to-developer-image.jpg" alt="Hari Krishna Shah" className="developer-image" />
          <h3>Hari Krishna Shah</h3>
          <p>
            iNotebook is created by Hari Krishna Shah, a passionate MERN stack developer. With expertise in MongoDB, Express.js, React, and Node.js, Hari has crafted this application to provide users with a seamless and efficient note-taking experience.
          </p>
        </section>

        <section className="contact">
          <h2>Get in Touch</h2>
          <p>
            We value your feedback and are constantly working to improve iNotebook. If you have any questions, suggestions, or concerns, please don't hesitate to reach out to us at:
          </p>
          <a href="mailto:contact@inotebook.com" className="contact-button">Contact Us</a>
        </section>
      </div>
    </div>
  );
}