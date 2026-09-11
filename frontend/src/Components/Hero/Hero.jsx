import "./Hero.css";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import hoverSound from "../../assets/Where_The_Mind_Breathes.mp4";

function ScrollSection({ id, children }) {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true });

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      initial={{ y: 20, opacity: 0 }}
      animate={sectionInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {children}
    </motion.section>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const API_URL = import.meta.env.VITE_API_URL;
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handshake otimizado com tratamento de erro isolado
  useEffect(() => {
    if (!API_URL) return;

    fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "teste@aura.com" }),
    })
      .then((res) => res.ok && res.json())
      .then((data) => data && console.log("Handshake OK"))
      .catch((err) => console.log("Handshake ignorado/falhou:", err));
  }, [API_URL]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  setIsSubmitting(true);
  setSuccessMsg("");

  const form = e.target;
  const fullName = form["full-name"].value.trim();
  const email = form["email-address"].value.trim();

  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email }),
    });

    if (!res.ok) {
      throw new Error("Erro ao enviar o formulário");
    }

    const data = await res.json();

    setSuccessMsg(data.message || "Enviado com sucesso!");
  } catch (err) {
    console.error("ERRO NO FETCH:", err);
    setSuccessMsg("Falha ao enviar. Tente novamente.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <main>
      <motion.section
        id="hero"
        ref={heroRef}
        initial={{ y: 20, opacity: 0 }}
        animate={heroInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <img src="/hero.webp" alt="Aura Hero Image" />
        <h1>Design a Life That Feels Grounded and Purposeful</h1>
        <p>
          A minimalist lifestyle platform built to help you cultivate mindful
          daily habits, organize your wellness routines, and focus on what truly
          matters.
        </p>
        <a href="/Download" className="cta-button">Start Your Journey</a>

        <button
          className="sound-trigger"
          onTouchStart={() => {
            const sound = document.getElementById("hoverSound");
            if (sound) {
              sound.currentTime = 0;
              sound.play();
              sound.volume = 0.1;
            }
          }}
          onMouseEnter={() => {
            const sound = document.getElementById("hoverSound");
            if (sound) {
              sound.currentTime = 0;
              sound.play();
              sound.volume = 0.1;
            }
          }}
        >
          Passe ou toque aqui
        </button>

        <audio id="hoverSound" src={hoverSound} preload="auto"></audio>
        <div id="link"></div>
      </motion.section>

      <ScrollSection id="about">
        <h2>The Aura Philosophy</h2>
        <p>
          Modern life is noisy. Aura provides a serene space to align your day
          with your core values—combining habit tracking, wellness journaling,
          and mindful planning in one seamless daily experience.
        </p>
        <div id="link-1"></div>
      </ScrollSection>

      <ScrollSection id="features">
        <h2>Designed for Your Wellbeing</h2>

        <article>
          <h3>Intentional Daily Routines</h3>
          <p>
            Build custom morning and evening rituals that fit your lifestyle
            without the overwhelm of bloated task lists.
          </p>
        </article>

        <article>
          <h3>Mindful Reflection Journal</h3>
          <p>
            Guided daily prompts designed to build gratitude, process thoughts,
            and keep you present throughout your day.
          </p>
        </article>

        <article>
          <h3>Calm Progress Analytics</h3>
          <p>
            Track your consistency over time with clean, distraction-free visual
            insights that reward progress, not perfection.
          </p>
        </article>
        <div id="link-2"></div>
      </ScrollSection>
        <ScrollSection id="community">
          <h2>Join a Growing Mindful Community</h2>

          <article>
            <blockquote>
              "Aura completely changed how I start my mornings. Less scrolling,
              more focus, and a steady sense of calm."
            </blockquote>
            <p>
              <strong>— Elena R.</strong>, Interior Designer
            </p>
          </article>

          <article>
            <blockquote>
              "The cleanest habit tracker I have ever used. It gives me clarity
              without cluttering my mind."
            </blockquote>
            <p>
              <strong>— Marcus V.</strong>, Digital Creator
            </p>
          </article>

        <div id="link-3"></div>
        </ScrollSection>
      
      
      <ScrollSection id="subscribe">
        <h2>Begin Your Mindful Routine Today</h2>
        <p>
          Available on iOS, Android, and Web. Sign up for early access to our
          daily habit guide.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="full-name">Full Name:</label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email-address">Email Address:</label>
            <input
              type="email"
              id="email-address"
              name="email-address"
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" id="submit-button" >
            {isSubmitting ? "Enviando..." : "Get Early Access"}
          </button>
          {successMsg && <p className="success">{successMsg}</p>}
        </form>
      </ScrollSection>
    </main>
  );
}

export default Hero;
