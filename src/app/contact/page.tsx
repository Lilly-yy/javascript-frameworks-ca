"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSubmitted(false);
    let isValid = false;

    if (name === "fullName" || name === "subject") {
      isValid = value.trim().length >= 3;
    }

    if (name === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    if (name === "message") {
      isValid = value.trim().length >= 10;
    }

    if (isValid) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      fullName: "",
      subject: "",
      email: "",
      message: "",
    };

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === "")) {
      setIsSubmitted(true);

      setFormData({
        fullName: "",
        subject: "",
        email: "",
        message: "",
      });
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-semibold">Contact us</h1>
          <p className="text-lg text-foreground/70">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm md:p-10">
          {isSubmitted && (
            <p
              role="status"
              className="mb-6 rounded-lg bg-green-50 p-4 text-center text-sm text-green-800"
            >
              Thank you! Your message has been sent.
            </p>
          )}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label htmlFor="fullName" className="mb-2 block font-medium">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your full name"
                className="w-full rounded-lg border border-black/20 px-4 py-3 outline-none focus:border-foreground"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What is your question about?"
                className="w-full rounded-lg border border-black/20 px-4 py-3 outline-none focus:border-foreground"
                value={formData.subject}
                onChange={handleChange}
              />
              {errors.subject && (
                <p className="mt-2 text-sm text-red-600">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-black/20 px-4 py-3 outline-none focus:border-foreground"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full rounded-lg border border-black/20 px-4 py-3 outline-none focus:border-foreground"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-foreground px-8 py-4 font-medium text-background transition-colors hover:bg-accent hover:text-white"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
