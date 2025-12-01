/**
 * ContactForm Component
 * 
 * Minimal contact form integrated with EmailJS.
 * Features validation and animated feedback.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner, faCheck, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_lyhmmox";
const EMAILJS_TEMPLATE_ID = "template_2ag350j";
const EMAILJS_PUBLIC_KEY = "wG8px5150C96d09F3";

interface FormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Project details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const currentTime = new Date().toLocaleString();
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject || "No subject",
          phone: formData.phone || "Not provided",
          message: formData.message,
          to_email: "ibwmahin@gmail.com",
          time: currentTime,
        }
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" });

      // Animate success
      gsap.fromTo(
        containerRef.current,
        { scale: 1 },
        { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
      );

    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-lg mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
            Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-card border ${
              errors.name ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-card border ${
              errors.email ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field (Optional) */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
            Subject <span className="text-muted-foreground/50">(optional)</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            placeholder="Project subject"
          />
        </div>

        {/* Phone Field (Optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
            Phone <span className="text-muted-foreground/50">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            placeholder="+880 1234567890"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
            Project Details <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 bg-card border ${
              errors.message ? "border-destructive" : "border-border"
            } rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none`}
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 ${
            submitStatus === "success"
              ? "bg-green-600 hover:bg-green-700"
              : submitStatus === "error"
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-primary hover:bg-primary/90"
          } ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover-lift"}`}
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              Sending...
            </>
          ) : submitStatus === "success" ? (
            <>
              <FontAwesomeIcon icon={faCheck} />
              Message Sent!
            </>
          ) : submitStatus === "error" ? (
            <>
              <FontAwesomeIcon icon={faExclamationCircle} />
              Failed to Send
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </>
          )}
        </button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <p className="text-green-500 text-sm text-center animate-fade-in">
            Thank you! I'll get back to you soon.
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-destructive text-sm text-center animate-fade-in">
            Something went wrong. Please try again or email directly.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;