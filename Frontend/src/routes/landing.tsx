import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#102217] via-[#1a3325] to-[#102217]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2bee79] to-[#20bd5e] flex items-center justify-center shadow-lg shadow-[#2bee79]/30">
                <span className="material-symbols-outlined text-[#102217] font-bold text-2xl">school</span>
              </div>
              <h1 className="text-white font-bold text-2xl">EduControl</h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate('/singup')}
                className="px-6 py-3 bg-gradient-to-r from-[#2bee79] to-[#20bd5e] text-[#102217] rounded-xl font-bold hover:shadow-lg hover:shadow-[#2bee79]/30 transition-all transform hover:scale-105"
              >
                Comenzar Gratis
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-all"
              >
                Iniciar Sesión
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#102217]/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-6 py-4 space-y-3">
              <button
                onClick={() => navigate('/singup')}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#2bee79] to-[#20bd5e] text-[#102217] rounded-xl font-bold"
              >
                Comenzar Gratis
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full px-6 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2bee79]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2bee79]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-[#2bee79]/10 border border-[#2bee79]/30 rounded-full">
            <span className="text-[#2bee79] font-semibold text-sm">✨ Plataforma de Clases Particulares</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Aprende y Enseña con
            <span className="block bg-gradient-to-r from-[#2bee79] to-[#20bd5e] bg-clip-text text-transparent">Flexibilidad Total</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Conecta con profesores expertos o comparte tu conocimiento.
            Clases particulares online o presenciales adaptadas a tus necesidades.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/singup')}
              className="px-8 py-4 bg-gradient-to-r from-[#2bee79] to-[#20bd5e] text-[#102217] rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#2bee79]/40 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Comenzar Gratis
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white font-bold text-lg hover:bg-white/20 transition-all"
            >
              Ya tengo cuenta
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-[#2bee79] mb-2">500+</div>
              <div className="text-gray-400 text-sm">Profesores</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[#2bee79] mb-2">10k+</div>
              <div className="text-gray-400 text-sm">Estudiantes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[#2bee79] mb-2">50k+</div>
              <div className="text-gray-400 text-sm">Clases</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
              Todo lo que necesitas
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Plataforma completa para gestionar tus clases particulares
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'calendar_month', title: 'Gestión de Calendario', desc: 'Organiza tus clases fácilmente' },
              { icon: 'video_call', title: 'Clases Online', desc: 'Conecta desde cualquier lugar' },
              { icon: 'payments', title: 'Pagos Seguros', desc: 'Proceso seguro y transparente' },
              { icon: 'rate_review', title: 'Calificaciones', desc: 'Sistema de reseñas y calidad' },
              { icon: 'chat', title: 'Mensajería', desc: 'Comunicación directa' },
              { icon: 'analytics', title: 'Reportes', desc: 'Estadísticas detalladas' }
            ].map((feature, i) => (
              <div key={i} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#2bee79]/50 transition-all hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2bee79]/20 to-[#2bee79]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl text-[#2bee79]">{feature.icon}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
              ¿Cómo funciona?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Regístrate', desc: 'Crea tu cuenta en minutos' },
              { num: '2', title: 'Conecta', desc: 'Busca o publica clases' },
              { num: '3', title: 'Aprende', desc: 'Disfruta de tus clases' }
            ].map((step, i) => (
              <div key={i} className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#2bee79] to-[#20bd5e] rounded-full flex items-center justify-center font-black text-2xl text-[#102217] shadow-lg shadow-[#2bee79]/30">
                  {step.num}
                </div>
                <h4 className="text-2xl font-bold text-white mb-3 mt-4">{step.title}</h4>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#2bee79]/10 to-[#20bd5e]/10 backdrop-blur-sm border border-[#2bee79]/30 rounded-3xl p-12">
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            ¿Listo para comenzar?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de alumnos y profesores que ya están usando EduControl
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/singup')}
              className="px-8 py-4 bg-gradient-to-r from-[#2bee79] to-[#20bd5e] text-[#102217] rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#2bee79]/40 transition-all transform hover:scale-105"
            >
              Registrarse Gratis
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white font-bold text-lg hover:bg-white/20 transition-all"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2bee79] to-[#20bd5e] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#102217] font-bold">school</span>
                </div>
                <h4 className="text-xl font-bold text-white">EduControl</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Tu plataforma de clases particulares de confianza
              </p>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-white">Enlaces</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#2bee79] transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-[#2bee79] transition-colors">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-[#2bee79] transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-white">Soporte</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#2bee79] transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-[#2bee79] transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-[#2bee79] transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-white">Síguenos</h5>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#2bee79] hover:bg-white/20 transition-all">
                  <span className="material-symbols-outlined">share</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#2bee79] hover:bg-white/20 transition-all">
                  <span className="material-symbols-outlined">mail</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>&copy; 2025 EduControl. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
