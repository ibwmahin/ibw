/**
 * AIBot Component
 * 
 * Small AI chat bot powered by Gemini API.
 * Fixed position in bottom right corner.
 * 
 * @author Abdulla Al Mahin (@ibwmahin)
 */

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faTimes, faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";

// Gemini API Configuration
const GEMINI_API_KEY = "AIzaSyDnJXpg3ZrFse5P5Vlthc6C3AbO9b3zycc";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Mahin's AI assistant. Ask me anything about his video editing services, pricing, or availability!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Animate chat open/close
  useEffect(() => {
    if (chatRef.current) {
      if (isOpen) {
        gsap.fromTo(
          chatRef.current,
          { scale: 0.8, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
        );
      }
    }
  }, [isOpen]);

  // Pulse animation for button
  useEffect(() => {
    if (buttonRef.current && !isOpen) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
    return () => {
      if (buttonRef.current) {
        gsap.killTweensOf(buttonRef.current);
      }
    };
  }, [isOpen]);

  // Send message to Gemini
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Build conversation context
      const systemPrompt = `You are a helpful AI assistant for Abdulla Al Mahin (A.Mahin), a professional video editor from Bangladesh.

About Mahin:
- Professional video editor with 3+ years experience
- Former web developer (ex-Web Developer)
- Specializes in YouTube video editing, motion graphics, color grading
- Works with Adobe Premiere Pro, After Effects, Photoshop, DaVinci Resolve
- Based in Bangladesh
- Contact: ibwmahin@gmail.com
- Social media: @ibwmahin (Instagram, Twitter, YouTube, etc.)

Services:
- YouTube video editing (long-form and shorts)
- Motion graphics and animations
- Color grading and correction
- Thumbnail design
- Social media content

Keep responses concise, friendly, and helpful. If asked about pricing, suggest contacting directly for a custom quote.`;

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again or contact Mahin directly at ibwmahin@gmail.com" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 w-80 sm:w-96 h-[450px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          style={{ boxShadow: "0 0 40px hsl(var(--primary) / 0.2)" }}
        >
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faRobot} className="text-primary-foreground" />
              <span className="font-semibold text-primary-foreground">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-muted border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-all duration-300 ${
          isOpen
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground shadow-lg"
        }`}
        style={{
          boxShadow: isOpen ? "none" : "0 0 30px hsl(var(--primary) / 0.5)",
        }}
        aria-label={isOpen ? "Close chat" : "Open AI assistant"}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faRobot} className="text-xl" />
      </button>
    </>
  );
};

export default AIBot;