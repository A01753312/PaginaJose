import { useState } from "react";
import "@/App.css";
import axios from "axios";
import { motion } from "framer-motion";
import { Target, Video, Bot, Palette, LayoutDashboard, ArrowRight, Check, Mail, Phone, Building2, User } from "lucide-react";
import Scene from "./components/Scene";
import { Toaster, toast } from "sonner";

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

  const services = [
    {
      title: "Campañas de Publicidad",
      desc: "Tráfico Calificado que Compra. Segmentación Avanzada con IA.",
      icon: Target,
      features: ["Segmentación Avanzada con IA", "Retargeting Omnicanal", "Reportes de ROI en Vivo"]
    },
    {
      title: "Contenido con IA",
      desc: "Omnipresencia Digital. Clonación de Voz y Avatares.",
      icon: Video,
      features: ["Clonación de Voz y Avatares", "Guiones de Alta Conversión", "Calendarios Automatizados"]
    },
    {
      title: "Automatizaciones con IA",
      desc: "Tu Fuerza de Ventas 24/7. Chatbots con NLP Avanzado.",
      icon: Bot,
      features: ["Chatbots con NLP Avanzado", "Integración CRM Total", "Nurturing Automático"]
    },
    {
      title: "Branding & Diseño",
      desc: "Ingeniería Visual para Vender. Identidad Estratégica.",
      icon: Palette,
      features: ["Identidad Visual Estratégica", "UI/UX para Conversión", "Manual de Marca Escalable"]
    },
    {
      title: "Dashboards Personalizados",
      desc: "Control total con datos en tiempo real.",
      icon: LayoutDashboard,
      features: ["Conexión de Bases de Datos", "Visualización Intuitiva", "Alertas Inteligentes"]
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "@marketingpro",
      text: "Salesport transformó completamente nuestra estrategia digital. Los resultados superaron todas nuestras expectativas."
    },
    {
      name: "Carlos Mendoza",
      role: "CEO TechStart",
      text: "La automatización con IA nos ahorró 40% en costos operativos. Un verdadero game changer."
    },
    {
      name: "Ana Torres",
      role: "@ecommercepro",
      text: "Increíble experiencia. El equipo de Salesport siempre está disponible y los resultados hablan por sí solos."
    },
    {
      name: "Roberto Díaz",
      role: "Founder Digital Solutions",
      text: "Pasamos de 0 a 100 leads calificados en solo 2 meses. Salesport cumple lo que promete."
    }
  ];

  const methodology = [
    {
      step: "1",
      title: "Análisis",
      desc: "Evaluamos tu negocio y mercado para identificar oportunidades",
      items: ["Auditoría completa", "Análisis de competencia", "Identificación de oportunidades"]
    },
    {
      step: "2",
      title: "Estrategia",
      desc: "Desarrollamos un plan personalizado para tus objetivos",
      items: ["Plan de acción personalizado", "Definición de objetivos SMART", "Estrategia de contenido"]
    },
    {
      step: "3",
      title: "Implementación",
      desc: "Ejecutamos las estrategias con precisión y seguimiento",
      items: ["Configuración de campañas", "Creación de contenido", "Automatización de procesos"]
    },
    {
      step: "4",
      title: "Optimización",
      desc: "Mejoramos continuamente basados en resultados",
      items: ["Análisis de rendimiento", "A/B testing continuo", "Reportes mensuales"]
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    } catch (error) {
      toast.error("Error al enviar el mensaje. Por favor intenta de nuevo.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-full z-50 px-6 py-4 flex justify-between items-center"
        data-testid="navbar"
      >
        <div className="text-2xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          Salesport
        </div>
        <button
          data-testid="navbar-contact-btn"
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          className="rounded-full bg-primary text-white px-6 py-2 font-semibold hover:shadow-[0_0_20px_rgba(112,0,255,0.5)] transition-all duration-300 hover:scale-105"
        >
          Contactar
        </button>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <Scene />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Escalamos tu negocio con Marketing e Inteligencia Artificial
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Tu partner en crecimiento exponencial. Automatizamos ventas y optimizamos resultados.
          </motion.p>
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            data-testid="hero-cta-btn"
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-primary text-white px-8 py-4 font-bold text-lg hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            Ver Soluciones
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-surface" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "+300%", label: "Eficiencia Operativa" },
              { value: "24/7", label: "Operatividad" },
              { value: "500+", label: "Clientes Satisfechos" },
              { value: "5x", label: "ROI Promedio" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Soluciones Tecnológicas Avanzadas</h2>
            <p className="text-lg text-gray-400">Fusionamos creatividad humana con potencia artificial</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
                  data-testid={`service-card-${index}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300" />
                  <div className="relative z-10">
                    <Icon size={40} className="text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.desc}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 md:py-32 bg-surface" data-testid="methodology-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Nuestra Metodología</h2>
            <p className="text-lg text-gray-400">Un proceso probado para el éxito de tu negocio</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                data-testid={`methodology-step-${index}`}
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full">
                  <div className="text-5xl font-bold text-primary/30 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Lo que Dicen Nuestros Clientes</h2>
            <p className="text-lg text-gray-400">Testimonios reales de empresas que han transformado su presencia digital</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
                data-testid={`testimonial-card-${index}`}
              >
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-surface" data-testid="contact-section">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">¿Listo para escalar tu negocio?</h2>
            <p className="text-lg text-gray-400">Agenda una consulta estratégica gratuita y descubre cómo podemos ayudarte</p>
          </motion.div>

          <motion.form
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
            data-testid="contact-form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <User size={16} />
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="contact-name-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="contact-email-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  data-testid="contact-phone-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="+52 123 456 7890"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Building2 size={16} />
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  data-testid="contact-company-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu empresa"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Mensaje *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                data-testid="contact-message-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Cuéntanos sobre tu proyecto..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="contact-submit-btn"
              className="w-full rounded-full bg-primary text-white px-8 py-4 font-bold text-lg hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10" data-testid="footer">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Salesport
          </div>
          <p className="text-gray-400 mb-4">Escalamos tu negocio con Marketing e Inteligencia Artificial</p>
          <p className="text-sm text-gray-500">© 2025 Salesport. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
