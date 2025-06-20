import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Shield, 
  Zap, 
  Eye, 
  Users, 
  TrendingUp, 
  Calendar,
  Twitter,
  MessageCircle,
  Send,
  Mail,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Globe,
  Lock,
  Cpu,
  Rocket,
  Target,
  Award,
  ExternalLink,
  Download,
  Play
} from 'lucide-react';
import PriceTicker from './components/PriceTicker';
import PriceChart from './components/PriceChart';
import Tokenomics from './components/Tokenomics';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-crypto-darker text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-crypto-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-2xl font-bold gradient-text">
                Panitos
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('features')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">Features</button>
              <button onClick={() => scrollToSection('tokenomics')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">Tokenomics</button>
              <button onClick={() => scrollToSection('roadmap')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">Roadmap</button>
              <button onClick={() => scrollToSection('team')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">Team</button>
              <button 
                onClick={() => scrollToSection('community')}
                className="button-primary"
              >
                Buy Now
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-crypto-dark border-t border-crypto-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-crypto-gray-300 hover:text-crypto-primary">About</button>
              <button onClick={() => scrollToSection('features')} className="block px-3 py-2 text-crypto-gray-300 hover:text-crypto-primary">Features</button>
              <button onClick={() => scrollToSection('tokenomics')} className="block px-3 py-2 text-crypto-gray-300 hover:text-crypto-primary">Tokenomics</button>
              <button onClick={() => scrollToSection('roadmap')} className="block px-3 py-2 text-crypto-gray-300 hover:text-crypto-primary">Roadmap</button>
              <button onClick={() => scrollToSection('team')} className="block px-3 py-2 text-crypto-gray-300 hover:text-crypto-primary">Team</button>
              <button onClick={() => scrollToSection('community')} className="block px-3 py-2 text-crypto-primary font-medium">Buy Now</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-crypto-dark via-crypto-primary/10 to-crypto-secondary/10">
        {/* Background Logo */}
        <div className="absolute inset-0 opacity-45">
          <img 
            src="/panitos.png" 
            alt="Panitos Background" 
            className="w-full h-full object-cover"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        
        {/* Additional Background Overlay for Logo Visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-primary/10 via-transparent to-crypto-secondary/10"></div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D4FF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-crypto-primary rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-crypto-secondary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-2 h-2 bg-crypto-accent rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-crypto-primary rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-crypto-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-crypto-accent rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 animate-float">
            <div className="w-24 h-24 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-500 hover:scale-110">
              <Sparkles className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text animate-gradient">
              Panitos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-crypto-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            The Future of Digital Assets
          </p>
          
          <p className="text-lg text-crypto-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Revolutionary blockchain technology designed for the next generation of decentralized finance, 
            combining cutting-edge innovation with unmatched security and scalability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <button className="group premium-button premium-button-primary">
              <div className="absolute inset-0 bg-gradient-to-r from-crypto-primary/20 via-crypto-secondary/20 to-crypto-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <span>Buy Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="shine-effect shine-effect-primary"></div>
            </button>
            
            <button className="group premium-button premium-button-primary">
              <div className="absolute inset-0 bg-gradient-to-r from-crypto-primary/20 via-crypto-secondary/20 to-crypto-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <span>View Whitepaper</span>
                <Download className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </div>
              <div className="shine-effect shine-effect-primary"></div>
            </button>
            
            <button className="group premium-button premium-button-primary">
              <div className="absolute inset-0 bg-gradient-to-r from-crypto-primary/20 via-crypto-secondary/20 to-crypto-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <span>Track Market</span>
                <TrendingUp className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </div>
              <div className="shine-effect shine-effect-primary"></div>
            </button>
          </div>
          
          <div className="mt-16 animate-bounce">
            <ChevronDown className="h-8 w-8 mx-auto text-crypto-primary drop-shadow-lg" />
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="py-20 bg-crypto-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-primary/5 via-transparent to-crypto-secondary/5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-crypto-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-crypto-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Live <span className="gradient-text animate-gradient">Market Data</span>
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-8 animate-scale-in"></div>
            <p className="text-lg text-crypto-gray-300 max-w-2xl mx-auto animate-fade-in-up">
              Real-time cryptocurrency market information and live trading data
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="animate-slide-in-left">
              <PriceChart />
            </div>
            <div className="animate-slide-in-right">
              <PriceTicker />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-crypto-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-secondary/5 via-transparent to-crypto-accent/5"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-crypto-accent/10 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-crypto-primary/10 rounded-full blur-3xl -translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              About <span className="gradient-text animate-gradient">Panitos</span>
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-8 animate-scale-in"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h3 className="text-2xl font-bold text-white">
                Revolutionizing Digital Finance Through Innovation
              </h3>
              <p className="text-lg text-crypto-gray-300 leading-relaxed">
                Panitos represents the next evolution in blockchain technology, designed to address the 
                critical challenges facing the cryptocurrency ecosystem. Our platform combines advanced 
                security protocols with lightning-fast transaction speeds.
              </p>
              <p className="text-lg text-crypto-gray-300 leading-relaxed">
                Built on cutting-edge blockchain infrastructure, Panitos offers institutional-grade 
                security, seamless scalability, and innovative DeFi solutions that empower users 
                to take control of their financial future.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-2 bg-crypto-gray-800 px-4 py-2 rounded-full shadow-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-crypto-gray-300 font-medium">Secure & Scalable</span>
                </div>
                <div className="flex items-center space-x-2 bg-crypto-gray-800 px-4 py-2 rounded-full shadow-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-crypto-gray-300 font-medium">DeFi Ready</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-br from-crypto-primary/20 to-crypto-secondary/20 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 floating-card">
                <div className="bg-crypto-gray-800 rounded-xl p-6 shadow-2xl glow-effect">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="group">
                      <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">100K+</div>
                      <div className="text-sm text-crypto-gray-400">TPS</div>
                    </div>
                    <div className="group">
                      <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">$0.001</div>
                      <div className="text-sm text-crypto-gray-400">Transaction Fee</div>
                    </div>
                    <div className="group">
                      <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">99.9%</div>
                      <div className="text-sm text-crypto-gray-400">Uptime</div>
                    </div>
                    <div className="group">
                      <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">∞</div>
                      <div className="text-sm text-crypto-gray-400">Potential</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-crypto-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-accent/5 via-transparent to-crypto-primary/5"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-crypto-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-crypto-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Why Choose <span className="gradient-text animate-gradient">Panitos</span>?
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-8 animate-scale-in"></div>
            <p className="text-lg text-crypto-gray-300 max-w-2xl mx-auto animate-fade-in-up">
              Discover the revolutionary features that set Panitos apart from traditional cryptocurrencies
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-crypto-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 floating-card animate-slide-in-left">
              <div className="bg-gradient-to-br from-crypto-primary to-crypto-secondary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-crypto-primary transition-colors">Advanced Security</h3>
              <p className="text-crypto-gray-300 leading-relaxed">
                Multi-layer security architecture with quantum-resistant encryption and 
                institutional-grade protection for your digital assets.
              </p>
              <div className="mt-4 w-full bg-crypto-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-crypto-primary to-crypto-secondary h-1 rounded-full transition-all duration-1000 group-hover:w-full w-0"></div>
              </div>
            </div>
            
            <div className="group bg-crypto-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 floating-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-to-br from-crypto-secondary to-crypto-accent w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-crypto-secondary transition-colors">Lightning Fast</h3>
              <p className="text-crypto-gray-300 leading-relaxed">
                Revolutionary consensus mechanism enabling 100,000+ transactions per second 
                with sub-second finality and minimal fees.
              </p>
              <div className="mt-4 w-full bg-crypto-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-crypto-secondary to-crypto-accent h-1 rounded-full transition-all duration-1000 group-hover:w-full w-0"></div>
              </div>
            </div>
            
            <div className="group bg-crypto-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 floating-card animate-slide-in-right">
              <div className="bg-gradient-to-br from-crypto-accent to-crypto-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-crypto-accent transition-colors">Smart Contracts</h3>
              <p className="text-crypto-gray-300 leading-relaxed">
                Turing-complete smart contract platform supporting complex DeFi applications 
                and decentralized autonomous organizations (DAOs).
              </p>
              <div className="mt-4 w-full bg-crypto-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-crypto-accent to-crypto-primary h-1 rounded-full transition-all duration-1000 group-hover:w-full w-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 bg-crypto-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tokenomics />
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-crypto-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="gradient-text">Roadmap</span>
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-8"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 gradient-bg hidden md:block"></div>
            
            <div className="space-y-12">
              {[
                { quarter: 'Q1 2025', title: 'Whitepaper & Token Launch', description: 'Comprehensive technical documentation and initial token distribution', status: 'completed' },
                { quarter: 'Q2 2025', title: 'Exchange Listings', description: 'Major CEX and DEX integrations for global accessibility', status: 'current' },
                { quarter: 'Q3 2025', title: 'DeFi Ecosystem Launch', description: 'Launch of staking, yield farming, and lending protocols', status: 'upcoming' },
                { quarter: 'Q4 2025', title: 'Institutional Partnerships', description: 'Strategic partnerships with major financial institutions', status: 'upcoming' }
              ].map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:w-1/2">
                    <div className={`bg-crypto-gray-800 rounded-2xl p-6 shadow-lg border-l-4 ${
                      item.status === 'completed' ? 'border-green-500' : 
                      item.status === 'current' ? 'border-crypto-primary' : 'border-crypto-gray-300'
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <Calendar className={`h-5 w-5 ${
                          item.status === 'completed' ? 'text-green-500' : 
                          item.status === 'current' ? 'text-crypto-primary' : 'text-crypto-gray-400'
                        }`} />
                        <span className="text-sm font-medium text-crypto-gray-400">{item.quarter}</span>
                        {item.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {item.status === 'current' && <Star className="h-4 w-4 text-crypto-primary" />}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-crypto-gray-300">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex w-8 h-8 gradient-bg rounded-full items-center justify-center mx-4 z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-crypto-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-crypto-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Alex Chen</h3>
              <p className="text-crypto-primary font-medium mb-3">Founder & CEO</p>
              <p className="text-crypto-gray-300 text-sm">
                Former senior engineer at major tech companies with 10+ years in blockchain 
                development and DeFi protocols.
              </p>
            </div>
            
            <div className="group bg-crypto-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-crypto-secondary to-crypto-accent rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sarah Johnson</h3>
              <p className="text-crypto-secondary font-medium mb-3">CTO</p>
              <p className="text-crypto-gray-300 text-sm">
                Blockchain architect with expertise in consensus mechanisms and 
                distributed systems across multiple chains.
              </p>
            </div>
            
            <div className="group bg-crypto-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-crypto-accent to-crypto-primary rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Michael Rodriguez</h3>
              <p className="text-crypto-accent font-medium mb-3">Head of Strategy</p>
              <p className="text-crypto-gray-300 text-sm">
                Former investment banker and crypto analyst with deep understanding 
                of market dynamics and institutional adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our <span className="text-crypto-gray-200">Community</span>
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-crypto-gray-200 max-w-3xl mx-auto">
              Be part of the revolution that's transforming digital finance. 
              Connect with developers, investors, and enthusiasts worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <a href="#" className="group glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Twitter className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Twitter</h3>
              <p className="text-crypto-gray-200 text-sm">Follow for updates</p>
            </a>
            
            <a href="#" className="group glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Send className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Telegram</h3>
              <p className="text-crypto-gray-200 text-sm">Join discussions</p>
            </a>
            
            <a href="#" className="group glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <MessageCircle className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Discord</h3>
              <p className="text-crypto-gray-200 text-sm">Chat with community</p>
            </a>
            
            <a href="#" className="group glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Mail className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-2">Newsletter</h3>
              <p className="text-crypto-gray-200 text-sm">Get updates</p>
            </a>
          </div>
          
          <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
            <div className="flex space-x-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white placeholder-crypto-gray-200 border border-white/30 focus:outline-none focus:border-white"
              />
              <button className="bg-white text-crypto-primary px-6 py-3 rounded-full font-semibold hover:bg-crypto-gray-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-crypto-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-2xl font-bold">Panitos</span>
              </div>
              <p className="text-crypto-gray-400 mb-6 max-w-md">
                The future of digital assets, combining cutting-edge blockchain technology 
                with institutional-grade security and unmatched scalability.
              </p>
              <div className="flex space-x-4">
                <Twitter className="h-6 w-6 text-crypto-gray-400 hover:text-crypto-primary cursor-pointer transition-colors" />
                <Send className="h-6 w-6 text-crypto-gray-400 hover:text-crypto-primary cursor-pointer transition-colors" />
                <MessageCircle className="h-6 w-6 text-crypto-gray-400 hover:text-crypto-primary cursor-pointer transition-colors" />
                <Mail className="h-6 w-6 text-crypto-gray-400 hover:text-crypto-primary cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('about')} className="text-crypto-gray-400 hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('features')} className="text-crypto-gray-400 hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('tokenomics')} className="text-crypto-gray-400 hover:text-white transition-colors">Tokenomics</button></li>
                <li><button onClick={() => scrollToSection('roadmap')} className="text-crypto-gray-400 hover:text-white transition-colors">Roadmap</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-crypto-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-crypto-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-crypto-gray-400 hover:text-white transition-colors">Whitepaper</a></li>
                <li><a href="#" className="text-crypto-gray-400 hover:text-white transition-colors">Audit Report</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-crypto-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-crypto-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Panitos – All Rights Reserved.
              </p>
              <p className="text-crypto-gray-500 text-xs">
                Disclaimer: Cryptocurrency investments carry risk. Please invest responsibly.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;