import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Video, Bot, Palette, LayoutDashboard, ArrowRight, Check, Mail, Phone, Building2, User, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Toaster, toast } from "sonner";
import Scene3D from "./components/Scene3D";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      title: "Campañas de Publicidad",
      desc: "Tráfico Calificado que Compra",
      icon: Target,
      features: ["Segmentación Avanzada con IA", "Retargeting Omnicanal", "Reportes de ROI en Vivo"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "Contenido con IA",
      desc: "Omnipresencia Digital Sin Límites",
      icon: Video,
      features: ["Clonación de Voz y Avatares", "Guiones de Alta Conversión", "Calendarios Automatizados"],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Automatizaciones con IA",
      desc: "Tu Fuerza de Ventas 24/7",
      icon: Bot,
      features: ["Chatbots con NLP Avanzado", "Integración CRM Total", "Nurturing Automático"],
      gradient: "from-green-600 to-emerald-600"
    },
    {
      title: "Branding & Diseño",
      desc: "Ingeniería Visual para Vender",
      icon: Palette,
      features: ["Identidad Visual Estratégica", "UI/UX para Conversión", "Manual de Marca Escalable"],
      gradient: "from-orange-600 to-red-600"
    },
    {
      title: "Dashboards",
      desc: "Control Total en Tiempo Real",
      icon: LayoutDashboard,
      features: ["Conexión de Bases de Datos", "Visualización Intuitiva", "Alertas Inteligentes"],
      gradient: "from-indigo-600 to-purple-600"
    }
  ];

  const stats = [
    { value: "+300%", label: "Eficiencia Operativa", icon: TrendingUp },
    { value: "24/7", label: "Operatividad", icon: Zap },
    { value: "500+", label: "Clientes Satisfechos", icon: Sparkles },
    { value: "5x", label: "ROI Promedio", icon: TrendingUp }
  ];

  const methodology = [
    {
      step: "01",
      title: "Análisis",
      desc: "Evaluamos tu negocio y mercado para identificar oportunidades de crecimiento exponencial",
      items: ["Auditoría completa digital", "Análisis de competencia", "Identificación de oportunidades"]
    },
    {
      step: "02",
      title: "Estrategia",
      desc: "Desarrollamos un plan personalizado alineado con tus objetivos de negocio",
      items: ["Plan de acción personalizado", "Definición de objetivos SMART", "Estrategia de contenido omnicanal"]
    },
    {
      step: "03",
      title: "Implementación",
      desc: "Ejecutamos las estrategias con precisión quirúrgica y seguimiento continuo",
      items: ["Configuración de campañas", "Creación de contenido estratégico", "Automatización de procesos"]
    },
    {
      step: "04",
      title: "Optimización",
      desc: "Mejoramos continuamente basados en datos reales y resultados medibles",
      items: ["Análisis de rendimiento semanal", "A/B testing continuo", "Reportes mensuales detallados"]
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "CMO",
      company: "TechVision",
      text: "Salesport transformó completamente nuestra estrategia digital. Los resultados superaron todas nuestras expectativas. En 3 meses triplicamos nuestro ROI.",
      avatar: "M"
    },
    {
      name: "Carlos Mendoza",
      role: "CEO",
      company: "InnovateLab",
      text: "La automatización con IA nos ahorró 40% en costos operativos. Un verdadero game changer para nuestro modelo de negocio.",
      avatar: "C"
    },
    {
      name: "Ana Torres",
      role: "Founder",
      company: "EcomPro",
      text: "Increíble experiencia. El equipo de Salesport siempre está disponible y los resultados hablan por sí solos. 100% recomendado.",
      avatar: "A"
    },
    {
      name: "Roberto Díaz",
      role: "Director",
      company: "Digital Solutions",
      text: "Pasamos de 0 a 100 leads calificados en solo 2 meses. Salesport cumple lo que promete y más. Inversión totalmente recuperada.",
      avatar: "R"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      toast.error("Error al enviar el mensaje. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="navbar"
        data-testid="navbar"
      >
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Sparkles className="inline-block mr-2" size={24} />
          Salesport
        </motion.div>
        <motion.button
          data-testid="navbar-contact-btn"
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          className="nav-cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contactar
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <Scene3D />
        <motion.div 
          className="hero-content"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hero-badge"
          >
            <Sparkles size={16} className="inline-block mr-2" />
            Tecnología de Vanguardia en IA
          </motion.div>
          
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="hero-title"
          >
            Escalamos tu negocio con
            <span className="hero-gradient"> Marketing </span>
            e
            <span className="hero-gradient"> Inteligencia Artificial</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="hero-subtitle"
          >
            Tu partner en crecimiento exponencial. Automatizamos ventas, optimizamos resultados y transformamos tu negocio con el poder de la IA.
          </motion.p>
          
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="hero-buttons"
          >
            <motion.button
              data-testid="hero-cta-btn"
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(112, 0, 255, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Soluciones
              <ArrowRight size={20} className="ml-2" />
            </motion.button>
            <motion.button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Demo
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-line"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" data-testid="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="stat-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Icon className="stat-icon" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section" data-testid="services-section">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Soluciones Tecnológicas Avanzadas</h2>
            <p className="section-subtitle">Fusionamos creatividad humana con potencia artificial para resultados sin precedentes</p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0, rotateX: -15 }}
                  whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="service-card"
                  whileHover={{ y: -10, scale: 1.02 }}
                  data-testid={`service-card-${index}`}
                >
                  <div className={`service-icon-wrapper bg-gradient-to-br ${service.gradient}`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <Check size={16} className="text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div 
                    className="service-glow"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="methodology-section" data-testid="methodology-section">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Nuestra Metodología</h2>
            <p className="section-subtitle">Un proceso probado para escalar tu negocio de forma predecible</p>
          </motion.div>

          <div className="methodology-grid">
            {methodology.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="methodology-card"
                whileHover={{ scale: 1.03, y: -5 }}
                data-testid={`methodology-step-${index}`}
              >
                <div className="methodology-number">{item.step}</div>
                <h3 className="methodology-title">{item.title}</h3>
                <p className="methodology-desc">{item.desc}</p>
                <ul className="methodology-items">
                  {item.items.map((feature, idx) => (
                    <li key={idx}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" data-testid="testimonials-section">
        <div className="container">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Lo que Dicen Nuestros Clientes</h2>
            <p className="section-subtitle">Historias reales de transformación digital y crecimiento acelerado</p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="testimonial-card"
                whileHover={{ y: -10, scale: 1.02 }}
                data-testid={`testimonial-card-${index}`}
              >
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role} • {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" data-testid="contact-section">
        <div className="container-small">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">¿Listo para Escalar tu Negocio?</h2>
            <p className="section-subtitle">Agenda una consulta estratégica gratuita y descubre tu potencial</p>
          </motion.div>

          <motion.form
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="contact-form"
            data-testid="contact-form"
          >
            <div className="form-grid">
              <div className="form-group">
                <label><User size={16} /> Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="contact-name-input"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="form-group">
                <label><Mail size={16} /> Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="contact-email-input"
                  placeholder="tu@email.com"
                />
              </div>
              <div className="form-group">
                <label><Phone size={16} /> Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  data-testid="contact-phone-input"
                  placeholder="+52 123 456 7890"
                />
              </div>
              <div className="form-group">
                <label><Building2 size={16} /> Empresa</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  data-testid="contact-company-input"
                  placeholder="Tu empresa"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Mensaje *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                data-testid="contact-message-input"
                placeholder="Cuéntanos sobre tu proyecto y objetivos..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              data-testid="contact-submit-btn"
              className="btn-submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-testid="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Sparkles className="inline-block mr-2" size={24} />
              Salesport
            </div>
            <p className="footer-text">Escalamos tu negocio con Marketing e Inteligencia Artificial</p>
            <p className="footer-copy">© 2025 Salesport. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
