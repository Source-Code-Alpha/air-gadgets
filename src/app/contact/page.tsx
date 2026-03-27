"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle, Send } from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const inputClass =
    "w-full rounded-lg border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#0080FF] focus:outline-none transition-colors";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">Get in Touch</h1>
        <p className="mx-auto max-w-xl text-gray-400">
          Have a question, suggestion, or just want to say hello? We&apos;d
          love to hear from you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-[#1f2937] bg-[#111827] p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                <h2 className="mb-2 text-xl font-bold text-white">
                  Message Sent!
                </h2>
                <p className="mb-6 text-gray-400">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="rounded-lg border border-[#1f2937] px-6 py-2 text-sm text-gray-300 hover:border-gray-500 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm text-gray-400">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-gray-400">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="How can we help?"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us more..."
                    required
                    rows={5}
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0080FF] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0066cc] disabled:opacity-50 sm:w-auto sm:px-8"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {[
            {
              icon: Mail,
              title: "Email",
              lines: ["support@airgadgets.com", "sales@airgadgets.com"],
            },
            {
              icon: Phone,
              title: "Phone",
              lines: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
            },
            {
              icon: MapPin,
              title: "Address",
              lines: ["123 Tech Boulevard", "San Francisco, CA 94105"],
            },
            {
              icon: Clock,
              title: "Business Hours",
              lines: ["Mon - Fri: 9AM - 6PM", "Sat: 10AM - 4PM", "Sun: Closed"],
            },
          ].map((info) => (
            <div
              key={info.title}
              className="rounded-2xl border border-[#1f2937] bg-[#111827] p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0080FF]/10">
                  <info.icon className="h-5 w-5 text-[#0080FF]" />
                </div>
                <h3 className="font-semibold text-white">{info.title}</h3>
              </div>
              {info.lines.map((line) => (
                <p key={line} className="text-sm text-gray-400">
                  {line}
                </p>
              ))}
            </div>
          ))}

          {/* Map placeholder */}
          <div className="flex h-48 items-center justify-center rounded-2xl border border-[#1f2937] bg-[#111827]">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-gray-600" />
              <p className="text-sm text-gray-500">Map coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
