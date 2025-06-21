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
import { usePumpFunData } from './hooks/usePumpFunData';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<'en' | 'el'>('en');
  
  // Use the custom hook for real-time market data
  const { marketData, isConnected, error, refreshData } = usePumpFunData();

  const t = {
    en: {
      nav: ["About", "Features", "Tokenomics", "Roadmap", "Buy Now"],
      heroTitle: "The Best Crypto Coin",
      heroSubtitle: "The Future of Digital Assets",
      heroDesc: "Revolutionary blockchain technology designed for the next generation of decentralized finance, combining cutting-edge innovation with unmatched security and scalability.",
      buy: "Buy Now",
      whitepaper: "View Whitepaper",
      track: "Track Market",
      marketTitle: "Live Market Data",
      marketSubtitle: "Real-time Panitos (PAN) token data from Pump.fun - Track live price, market cap, volume, and trading activity",
      aboutTitle: "About Panitos",
      aboutSubtitle: "Panitos is a newly launched Solana token on the Pump.fun platform, designed to provide trading opportunities and liquidity in the growing meme coin ecosystem.",
      aboutCardTitle: "New Token on Pump.fun Platform",
      aboutCardDesc1: "Panitos represents an exciting opportunity for early investors in the meme coin space. With a current market cap of $4,049, it's positioned for potential growth as the community expands and trading volume increases.",
      aboutCardDesc2: "Built on Solana's high-performance blockchain, Panitos benefits from lightning-fast transactions, minimal fees, and a growing DeFi ecosystem. The token is designed to provide liquidity and trading opportunities on the popular Pump.fun platform.",
      badgeSolana: "Solana Network",
      badgePump: "Pump.fun Listed",
      stats: ["Market Cap", "Total Supply", "Blockchain", "Token Standard"],
      featuresTitle: "Why Choose Panitos?",
      featuresSubtitle: "Discover the advantages of trading Panitos on the Pump.fun platform",
      feature1Title: "Solana Security",
      feature1Desc: "Built on Solana's robust blockchain infrastructure with advanced security features and protection against common vulnerabilities in the crypto space.",
      feature2Title: "Fast & Low Cost",
      feature2Desc: "Solana's high-performance network enables lightning-fast transactions with minimal fees, making Panitos trading efficient and cost-effective.",
      feature3Title: "Pump.fun Platform",
      feature3Desc: "Listed on Pump.fun, a popular platform for discovering and trading new tokens with a growing community of crypto enthusiasts and traders.",
      tokenomics: {
        title: "Tokenomics",
        detailsTitle: "Token Details",
        totalSupply: "Total Supply",
        circulatingSupply: "Circulating Supply",
        currentPrice: "Current Price",
        marketCap: "Market Cap",
        blockchain: "Blockchain",
        tokenStandard: "Token Standard",
        launchInfoTitle: "Launch Info",
        launchInfoStatus: "Recently Launched",
        launchInfoDesc: "New token on Pump.fun platform",
        utilityTitle: "Token Utility",
        utilityTrading: "Trading",
        utilityAvailable: "Available",
        utilityLiquidity: "Liquidity",
        utilityLocked: "Locked",
        utilityPlatform: "Platform",
        distribution: {
          lp: 'Liquidity Pool',
          sale: 'Public Sale',
          dev: 'Development',
          marketing: 'Marketing',
        }
      },
      roadmap: {
        title: "Our Roadmap",
        items: [
          { quarter: 'December 2024', title: 'Token Launch', description: 'Panitos token launched on Pump.fun platform with initial liquidity', status: 'completed' },
          { quarter: 'January 2025', title: 'Community Growth', description: 'Building community awareness and expanding holder base', status: 'current' },
          { quarter: 'Q1 2025', title: 'Exchange Expansion', description: 'Seeking additional DEX listings and trading opportunities', status: 'upcoming' },
          { quarter: 'Q2 2025', title: 'Ecosystem Development', description: 'Exploring partnerships and utility development', status: 'upcoming' }
        ]
      },
      community: {
        title: "Join Our Community",
        subtitle: "Be part of the revolution that's transforming digital finance. Connect with developers, investors, and enthusiasts worldwide.",
        twitter: "Twitter",
        twitterDesc: "Follow for updates",
        telegram: "Telegram",
        telegramDesc: "Join discussions",
        discord: "Discord",
        discordDesc: "Chat with community",
        newsletter: "Newsletter",
        newsletterDesc: "Get updates",
        stayUpdated: "Stay Updated",
        emailPlaceholder: "Enter your email",
        subscribe: "Subscribe"
      },
      whyInvest: {
        title: "Why Invest in Panitos?",
        subtitle: "Discover the unique advantages that make Panitos an attractive investment opportunity in the growing Solana ecosystem",
        earlyOpportunity: "Early Investment Opportunity",
        earlyDesc: "Panitos represents a unique opportunity to get in early on a promising Solana token. With a current market cap of just $4,049, the potential for significant growth is substantial as the project gains traction and community support.",
        highGrowth: "High Growth Potential",
        highGrowthDesc: "Low market cap with room for exponential growth as adoption increases",
        solanaBenefits: "Solana Benefits",
        solanaBenefitsDesc: "Fast transactions, low fees, and growing ecosystem support",
        communityDriven: "Community Driven",
        communityDrivenDesc: "Transparent project with active community engagement",
        pumpFunListed: "Pump.fun Listed",
        pumpFunListedDesc: "Listed on popular platform with growing user base",
        readyToInvest: "Ready to Invest?",
        readyDesc: "Join early investors and be part of the Panitos growth story",
        buyNow: "Buy Panitos Now"
      },
      footer: {
        description: "A community-driven Solana token listed on Pump.fun platform, focused on transparency and sustainable growth in the crypto ecosystem.",
        quickLinks: "Quick Links",
        legal: "Legal",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        whitepaper: "Whitepaper",
        audit: "Audit Report",
        copyright: "© 2025 Panitos – All Rights Reserved.",
        disclaimer: "Disclaimer: Cryptocurrency investments carry risk. Please invest responsibly."
      }
    },
    el: {
      nav: ["Σχετικά", "Χαρακτηριστικά", "Tokenomics", "Οδικός Χάρτης", "Αγορά Τώρα"],
      heroTitle: "Το Καλύτερο Κρυπτονόμισμα",
      heroSubtitle: "Το Μέλλον των Ψηφιακών Περιουσιακών Στοιχείων",
      heroDesc: "Επαναστατική τεχνολογία blockchain σχεδιασμένη για τη νέα γενιά αποκεντρωμένης χρηματοδότησης, συνδυάζοντας καινοτομία αιχμής με απαράμιλλη ασφάλεια και επεκτασιμότητα.",
      buy: "Αγορά Τώρα",
      whitepaper: "Λευκή Βίβλος",
      track: "Παρακολούθηση Αγοράς",
      marketTitle: "Ζωντανά Στοιχεία Αγοράς",
      marketSubtitle: "Ζωντανά δεδομένα του Panitos (PAN) από το Pump.fun - Δείτε τιμή, κεφαλαιοποίηση, όγκο και δραστηριότητα σε πραγματικό χρόνο",
      aboutTitle: "Σχετικά με το Panitos",
      aboutSubtitle: "Το Panitos είναι ένα πρόσφατα λανσαρισμένο token του Solana στην πλατφόρμα Pump.fun, σχεδιασμένο για να παρέχει ευκαιρίες συναλλαγών και ρευστότητα στο αναπτυσσόμενο οικοσύστημα των meme coins.",
      aboutCardTitle: "Νέο Token στην Πλατφόρμα Pump.fun",
      aboutCardDesc1: "Το Panitos αποτελεί μια συναρπαστική ευκαιρία για πρώιμους επενδυτές στον χώρο των meme coin. Με τρέχουσα κεφαλαιοποίηση αγοράς $4,049, είναι τοποθετημένο για πιθανή ανάπτυξη καθώς η κοινότητα επεκτείνεται και ο όγκος συναλλαγών αυξάνεται.",
      aboutCardDesc2: "Χτισμένο στο υψηλής απόδοσης blockchain του Solana, το Panitos επωφελείται από αστραπιαίες συναλλαγές, ελάχιστα τέλη και ένα αναπτυσσόμενο οικοσύστημα DeFi. Το token έχει σχεδιαστεί για να παρέχει ρευστότητα και ευκαιρίες συναλλαγών στη δημοφιλή πλατφόρμα Pump.fun.",
      badgeSolana: "Δίκτυο Solana",
      badgePump: "Εισηγμένο στο Pump.fun",
      stats: ["Κεφ/ποίηση Αγοράς", "Συνολική Προσφορά", "Blockchain", "Πρότυπο Token"],
      featuresTitle: "Γιατί να επιλέξετε το Panitos;",
      featuresSubtitle: "Ανακαλύψτε τα πλεονεκτήματα των συναλλαγών Panitos στην πλατφόρμα Pump.fun",
      feature1Title: "Ασφάλεια Solana",
      feature1Desc: "Χτισμένο στην ισχυρή υποδομή blockchain του Solana με προηγμένα χαρακτηριστικά ασφαλείας και προστασία από κοινές ευπάθειες στον χώρο των κρυπτονομισμάτων.",
      feature2Title: "Γρήγορο & Χαμηλό Κόστος",
      feature2Desc: "Το δίκτυο υψηλής απόδοσης του Solana επιτρέπει αστραπιαίες συναλλαγές με ελάχιστα τέλη, καθιστώντας τις συναλλαγές Panitos αποδοτικές και οικονομικές.",
      feature3Title: "Πλατφόρμα Pump.fun",
      feature3Desc: "Εισηγμένο στο Pump.fun, μια δημοφιλή πλατφόρμα για την ανακάλυψη και τη διαπραγμάτευση νέων token με μια αυξανόμενη κοινότητα ενθουσιωδών και εμπόρων κρυπτονομισμάτων.",
      tokenomics: {
        title: "Tokenomics",
        detailsTitle: "Λεπτομέρειες Token",
        totalSupply: "Συνολική Προσφορά",
        circulatingSupply: "Κυκλοφορούσα Προσφορά",
        currentPrice: "Τρέχουσα Τιμή",
        marketCap: "Κεφ/ποίηση Αγοράς",
        blockchain: "Blockchain",
        tokenStandard: "Πρότυπο Token",
        launchInfoTitle: "Πληροφορίες Εκκίνησης",
        launchInfoStatus: "Πρόσφατη Εκκίνηση",
        launchInfoDesc: "Νέο token στην πλατφόρμα Pump.fun",
        utilityTitle: "Χρησιμότητα Token",
        utilityTrading: "Συναλλαγές",
        utilityAvailable: "Διαθέσιμο",
        utilityLiquidity: "Ρευστότητα",
        utilityLocked: "Κλειδωμένη",
        utilityPlatform: "Πλατφόρμα",
        distribution: {
          lp: 'Πισίνα Ρευστότητας',
          sale: 'Δημόσια Πώληση',
          dev: 'Ανάπτυξη',
          marketing: 'Μάρκετινγκ',
        }
      },
      roadmap: {
        title: "Ο Οδικός μας Χάρτης",
        items: [
          { quarter: 'Δεκέμβριος 2024', title: 'Εκκίνηση Token', description: 'Το token Panitos λανσαρίστηκε στην πλατφόρμα Pump.fun με αρχική ρευστότητα', status: 'completed' },
          { quarter: 'Ιανουάριος 2025', title: 'Ανάπτυξη Κοινότητας', description: 'Δημιουργία αναγνωρισιμότητας και επέκταση της βάσης κατόχων', status: 'current' },
          { quarter: 'Q1 2025', title: 'Επέκταση σε Ανταλλακτήρια', description: 'Αναζήτηση για εισαγωγή σε επιπλέον αποκεντρωμένα ανταλλακτήρια (DEX) και ευκαιρίες συναλλαγών', status: 'upcoming' },
          { quarter: 'Q2 2025', title: 'Ανάπτυξη Οικοσυστήματος', description: 'Διερεύνηση συνεργασιών και ανάπτυξη χρησιμότητας', status: 'upcoming' }
        ]
      },
      community: {
        title: "Γίνετε Μέλος της Κοινότητάς Μας",
        subtitle: "Γίνετε μέρος της επανάστασης που μεταμορφώνει την ψηφιακή χρηματοδότηση. Συνδεθείτε με προγραμματιστές, επενδυτές και ενθουσιώδεις παγκοσμίως.",
        twitter: "Twitter",
        twitterDesc: "Ακολουθήστε για νέα",
        telegram: "Telegram",
        telegramDesc: "Συμμετέχετε σε συζητήσεις",
        discord: "Discord",
        discordDesc: "Συνομιλήστε με την κοινότητα",
        newsletter: "Newsletter",
        newsletterDesc: "Λάβετε ενημερώσεις",
        stayUpdated: "Μείνετε Ενημερωμένοι",
        emailPlaceholder: "Εισάγετε το email σας",
        subscribe: "Εγγραφή"
      },
      whyInvest: {
        title: "Γιατί να Επενδύσετε στο Panitos;",
        subtitle: "Ανακαλύψτε τα μοναδικά πλεονεκτήματα που κάνουν το Panitos μια ελκυστική επενδυτική ευκαιρία στο αναπτυσσόμενο οικοσύστημα του Solana",
        earlyOpportunity: "Ευκαιρία Πρώιμης Επένδυσης",
        earlyDesc: "Το Panitos αντιπροσωπεύει μια μοναδική ευκαιρία να μπειτε νωρίς σε ένα υποσχόμενο token του Solana. Με τρέχουσα κεφαλαιοποίηση αγοράς μόνο $4,049, η δυνατότητα για σημαντική ανάπτυξη είναι σημαντική καθώς το project κερδίζει έλξη και υποστήριξη από την κοινότητα.",
        highGrowth: "Υψηλό Δυναμικό Ανάπτυξης",
        highGrowthDesc: "Χαμηλή κεφαλαιοποίηση αγοράς με χώρο για εκθετική ανάπτυξη καθώς η υιοθέτηση αυξάνεται",
        solanaBenefits: "Οφέλη του Solana",
        solanaBenefitsDesc: "Γρήγορες συναλλαγές, χαμηλά τέλη και αυξανόμενη υποστήριξη οικοσυστήματος",
        communityDriven: "Καθοδηγούμενο από την Κοινότητα",
        communityDrivenDesc: "Διαφανές project με ενεργή συμμετοχή της κοινότητας",
        pumpFunListed: "Εισηγμένο στο Pump.fun",
        pumpFunListedDesc: "Εισηγμένο σε δημοφιλή πλατφόρμα με αυξανόμενη βάση χρηστών",
        readyToInvest: "Είστε Έτοιμοι να Επενδύσετε;",
        readyDesc: "Γίνετε μέλος των πρώιμων επενδυτών και μέρος της ιστορίας ανάπτυξης του Panitos",
        buyNow: "Αγοράστε Panitos Τώρα"
      },
      footer: {
        description: "Ένα token του Solana καθοδηγούμενο από την κοινότητα, εισηγμένο στην πλατφόρμα Pump.fun, που εστιάζει στη διαφάνεια και τη βιώσιμη ανάπτυξη στο οικοσύστημα των κρυπτονομισμάτων.",
        quickLinks: "Γρήγοροι Σύνδεσμοι",
        legal: "Νομικά",
        privacy: "Πολιτική Απορρήτου",
        terms: "Όροι Χρήσης",
        whitepaper: "Λευκή Βίβλος",
        audit: "Έκθεση Ελέγχου",
        copyright: "© 2025 Panitos – Με την επιφύλαξη παντός δικαιώματος.",
        disclaimer: "Αποποίηση ευθύνης: Οι επενδύσεις σε κρυπτονομίσματα ενέχουν κίνδυνο. Παρακαλούμε επενδύστε υπεύθυνα."
      }
    }
  };

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
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src="/arrow.png" alt="Panitos Crypto Coin Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
              <span className="text-lg sm:text-2xl font-bold gradient-text">
                Panitos Crypto Coin
              </span>
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">{t[lang].nav[0]}</button>
              <button onClick={() => scrollToSection('features')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">{t[lang].nav[1]}</button>
              <button onClick={() => scrollToSection('tokenomics')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">{t[lang].nav[2]}</button>
              <button onClick={() => scrollToSection('roadmap')} className="text-crypto-gray-300 hover:text-crypto-primary transition-colors">{t[lang].nav[3]}</button>
              <a 
                href="https://pump.fun/coin/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump" 
                target="_blank" 
                rel="noopener noreferrer"
                className="button-primary"
              >
                {t[lang].nav[4]}
              </a>
              <button onClick={() => setLang(lang === 'en' ? 'el' : 'en')} className="ml-4 px-3 py-1 rounded bg-crypto-primary text-white font-bold hover:bg-crypto-secondary transition-colors">
                {lang === 'en' ? 'ΕΛ' : 'EN'}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-crypto-dark border-t border-crypto-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-sm text-crypto-gray-300 hover:text-crypto-primary">{t[lang].nav[0]}</button>
              <button onClick={() => scrollToSection('features')} className="block px-3 py-2 text-sm text-crypto-gray-300 hover:text-crypto-primary">{t[lang].nav[1]}</button>
              <button onClick={() => scrollToSection('tokenomics')} className="block px-3 py-2 text-sm text-crypto-gray-300 hover:text-crypto-primary">{t[lang].nav[2]}</button>
              <button onClick={() => scrollToSection('roadmap')} className="block px-3 py-2 text-sm text-crypto-gray-300 hover:text-crypto-primary">{t[lang].nav[3]}</button>
              <a 
                href="https://pump.fun/coin/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm text-crypto-primary font-medium"
              >
                {t[lang].nav[4]}
              </a>
              <button onClick={() => setLang(lang === 'en' ? 'el' : 'en')} className="block w-full text-left px-3 py-2 text-sm bg-crypto-primary text-white font-bold hover:bg-crypto-secondary transition-colors">
                {lang === 'en' ? 'ΕΛ' : 'EN'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-crypto-dark via-crypto-primary/10 to-crypto-secondary/10 px-4">
        {/* Background Logo */}
        <div 
          className="absolute inset-0 opacity-45 bg-no-repeat bg-center md:bg-cover bg-[length:auto_100%] md:bg-[length:100%_100%]"
          style={{ backgroundImage: 'url(/panitos.png)' }}
        >
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
          <div className="mb-4 sm:mb-0 animate-float">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-2xl mx-auto mb-0 flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-500 hover:scale-110">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4 animate-fade-in text-white leading-tight">
            {t[lang].heroTitle}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-4 sm:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up px-2">
            {t[lang].heroSubtitle}
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-white mb-8 sm:mb-12 max-w-2xl mx-auto animate-fade-in-up px-4" style={{animationDelay: '0.2s'}}>
            {t[lang].heroDesc}
          </p>
          
          <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 animate-fade-in-up px-4" style={{animationDelay: '0.4s'}}>
            <a 
              href="https://pump.fun/coin/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group premium-button premium-button-primary w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-crypto-primary/20 via-crypto-secondary/20 to-crypto-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <span className="text-sm sm:text-base">{t[lang].buy}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="shine-effect shine-effect-primary"></div>
            </a>
            
            <a 
              href="/whitepaper.pdf" 
              download="Panitos-Whitepaper.pdf"
              className="group premium-button premium-button-primary w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-crypto-primary/20 via-crypto-secondary/20 to-crypto-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <span className="text-sm sm:text-base">{t[lang].whitepaper}</span>
                <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </div>
              <div className="shine-effect shine-effect-primary"></div>
            </a>
            
            <a 
              href="https://pump.fun/coin/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group premium-button premium-button-primary w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-crypto-primary/20 via-crypto-secondary/20 to-crypto-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <span className="text-sm sm:text-base">{t[lang].track}</span>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </div>
              <div className="shine-effect shine-effect-primary"></div>
            </a>
          </div>
          
          <button 
            onClick={() => scrollToSection('market-data')}
            className="mt-8 sm:mt-16 animate-bounce focus:outline-none"
            aria-label="Scroll to market data"
          >
            <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-crypto-primary drop-shadow-lg" />
          </button>
        </div>
      </section>

      {/* Market Data Section */}
      <section id="market-data" className="py-12 sm:py-20 bg-crypto-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-primary/5 via-transparent to-crypto-secondary/5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-crypto-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-crypto-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fade-in">
              {lang === 'en' ? (
                <>Live <span className="gradient-text animate-gradient">Market Data</span></>
              ) : (
                <><span className="gradient-text animate-gradient">{t[lang].marketTitle}</span></>
              )}
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
            <p className="text-base sm:text-lg text-crypto-gray-300 max-w-2xl mx-auto animate-fade-in-up px-4">
              {t[lang].marketSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="animate-slide-in-left">
              <PriceChart marketData={marketData} onRefresh={refreshData} />
            </div>
            <div className="animate-slide-in-right">
              <PriceTicker 
                marketData={marketData} 
                isConnected={isConnected} 
                error={error} 
                onRefresh={refreshData} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 bg-crypto-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-secondary/5 via-transparent to-crypto-accent/5"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-crypto-accent/10 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-crypto-primary/10 rounded-full blur-3xl -translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fade-in">
              {lang === 'en' ? (
                <>About <span className="gradient-text animate-gradient">Panitos</span></>
              ) : (
                <><span className="gradient-text animate-gradient">{t[lang].aboutTitle}</span></>
              )}
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
            <p className="text-base sm:text-lg text-crypto-gray-300 max-w-3xl mx-auto animate-fade-in-up px-4">
              {t[lang].aboutSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 animate-slide-in-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t[lang].aboutCardTitle}
              </h3>
              <p className="text-base sm:text-lg text-crypto-gray-300 leading-relaxed">
                {t[lang].aboutCardDesc1}
              </p>
              <p className="text-base sm:text-lg text-crypto-gray-300 leading-relaxed">
                {t[lang].aboutCardDesc2}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                <div className="flex items-center space-x-2 bg-crypto-gray-800 px-3 sm:px-4 py-2 rounded-full shadow-lg">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-sm sm:text-base text-crypto-gray-300 font-medium">{t[lang].badgeSolana}</span>
                </div>
                <div className="flex items-center space-x-2 bg-crypto-gray-800 px-3 sm:px-4 py-2 rounded-full shadow-lg">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-sm sm:text-base text-crypto-gray-300 font-medium">{t[lang].badgePump}</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-br from-crypto-primary/20 to-crypto-secondary/20 rounded-2xl p-4 sm:p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 floating-card">
                <div className="bg-crypto-gray-800 rounded-xl p-4 sm:p-6 shadow-2xl glow-effect">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                    <div className="group">
                      <div className="text-xl sm:text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">
                        ${marketData.marketCap.toLocaleString()}
                      </div>
                      <div className="text-xs sm:text-sm text-crypto-gray-400">{t[lang].stats[0]}</div>
                    </div>
                    <div className="group">
                      <div className="text-xl sm:text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">1B</div>
                      <div className="text-xs sm:text-sm text-crypto-gray-400">{t[lang].stats[1]}</div>
                    </div>
                    <div className="group">
                      <div className="text-lg sm:text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">Solana</div>
                      <div className="text-xs sm:text-sm text-crypto-gray-400">{t[lang].stats[2]}</div>
                    </div>
                    <div className="group">
                      <div className="text-lg sm:text-3xl font-bold gradient-text group-hover:scale-110 transition-transform">SPL</div>
                      <div className="text-xs sm:text-sm text-crypto-gray-400">{t[lang].stats[3]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-crypto-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-accent/5 via-transparent to-crypto-primary/5"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-crypto-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-crypto-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fade-in">
              {lang === 'en' ? (
                <>Why Choose <span className="gradient-text">Panitos</span>?</>
              ) : (
                <><span className="gradient-text animate-gradient">{t[lang].featuresTitle}</span></>
              )}
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
            <p className="text-base sm:text-lg text-crypto-gray-300 max-w-2xl mx-auto animate-fade-in-up px-4">
              {t[lang].featuresSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-crypto-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 floating-card animate-slide-in-left">
              <div className="bg-gradient-to-br from-crypto-primary to-crypto-secondary w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-crypto-primary transition-colors">{t[lang].feature1Title}</h3>
              <p className="text-sm sm:text-base text-crypto-gray-300 leading-relaxed">
                {t[lang].feature1Desc}
              </p>
              <div className="mt-4 w-full bg-crypto-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-crypto-primary to-crypto-secondary h-1 rounded-full transition-all duration-1000 group-hover:w-full w-0"></div>
              </div>
            </div>
            
            <div className="group bg-crypto-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 floating-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-to-br from-crypto-secondary to-crypto-accent w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-crypto-secondary transition-colors">{t[lang].feature2Title}</h3>
              <p className="text-sm sm:text-base text-crypto-gray-300 leading-relaxed">
                {t[lang].feature2Desc}
              </p>
              <div className="mt-4 w-full bg-crypto-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-crypto-secondary to-crypto-accent h-1 rounded-full transition-all duration-1000 group-hover:w-full w-0"></div>
              </div>
            </div>
            
            <div className="group bg-crypto-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 floating-card animate-slide-in-right">
              <div className="bg-gradient-to-br from-crypto-accent to-crypto-primary w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-crypto-accent transition-colors">{t[lang].feature3Title}</h3>
              <p className="text-sm sm:text-base text-crypto-gray-300 leading-relaxed">
                {t[lang].feature3Desc}
              </p>
              <div className="mt-4 w-full bg-crypto-gray-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-crypto-accent to-crypto-primary h-1 rounded-full transition-all duration-1000 group-hover:w-full w-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-12 sm:py-20 bg-crypto-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tokenomics lang={lang} t={t} marketData={marketData} />
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-12 sm:py-20 bg-crypto-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              {lang === 'en' ? (
                <>Our <span className="gradient-text">Roadmap</span></>
              ) : (
                <><span className="gradient-text">{t[lang].roadmap.title}</span></>
              )}
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-6 sm:mb-8"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 gradient-bg hidden md:block"></div>
            
            <div className="space-y-8 sm:space-y-12">
              {t[lang].roadmap.items.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:w-1/2">
                    <div className={`bg-crypto-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 ${
                      item.status === 'completed' ? 'border-green-500' : 
                      item.status === 'current' ? 'border-crypto-primary' : 'border-crypto-gray-300'
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <Calendar className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          item.status === 'completed' ? 'text-green-500' : 
                          item.status === 'current' ? 'text-crypto-primary' : 'text-crypto-gray-400'
                        }`} />
                        <span className="text-xs sm:text-sm font-medium text-crypto-gray-400">{item.quarter}</span>
                        {item.status === 'completed' && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />}
                        {item.status === 'current' && <Star className="h-3 w-3 sm:h-4 sm:w-4 text-crypto-primary" />}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-crypto-gray-300">{item.description}</p>
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

      {/* Why Invest in Panitos Section */}
      <section className="py-12 sm:py-20 bg-crypto-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-primary/5 via-transparent to-crypto-secondary/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-crypto-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-crypto-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fade-in">
              {lang === 'en' ? (
                <>Why Invest in <span className="gradient-text animate-gradient">Panitos</span>?</>
              ) : (
                <>{t[lang].whyInvest.title}</>
              )}
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
            <p className="text-base sm:text-lg text-crypto-gray-300 max-w-3xl mx-auto animate-fade-in-up px-4">
              {t[lang].whyInvest.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left Column - Images */}
            <div className="space-y-6 sm:space-y-8 animate-slide-in-left">
              {/* First Image */}
              <div className="relative group">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-crypto-primary/30 to-crypto-secondary/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-crypto-gray-800 to-crypto-gray-900 rounded-3xl p-4 sm:p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-500 floating-card">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src="/panitos.png" 
                      alt="Panitos Token" 
                      className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-crypto-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-crypto-primary/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-white text-xs sm:text-sm font-bold animate-pulse">
                      HOT
                    </div>
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-crypto-secondary/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-white text-xs sm:text-sm font-bold">
                      SOLANA
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-6 sm:w-8 h-6 sm:h-8 bg-crypto-primary rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-4 sm:w-6 h-4 sm:h-6 bg-crypto-secondary rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Second Image */}
              <div className="relative group">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-crypto-secondary/30 to-crypto-accent/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-crypto-gray-800 to-crypto-gray-900 rounded-3xl p-4 sm:p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-500 floating-card">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src="/pan.png" 
                      alt="Panitos Token Alternative" 
                      className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-crypto-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-crypto-secondary/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-white text-xs sm:text-sm font-bold animate-pulse">
                      NEW
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-6 sm:w-8 h-6 sm:h-8 bg-crypto-secondary rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="space-y-6 sm:space-y-8 animate-slide-in-right">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {t[lang].whyInvest.earlyOpportunity}
                </h3>
                <p className="text-base sm:text-lg text-crypto-gray-300 leading-relaxed">
                  {t[lang].whyInvest.earlyDesc.replace('$4,049', `$${marketData.marketCap.toLocaleString()}`)}
                </p>
              </div>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="group bg-crypto-gray-800 rounded-xl p-4 sm:p-6 hover:bg-crypto-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{t[lang].whyInvest.highGrowth}</h4>
                  </div>
                  <p className="text-crypto-gray-300 text-xs sm:text-sm">
                    {t[lang].whyInvest.highGrowthDesc}
                  </p>
                </div>
                
                <div className="group bg-crypto-gray-800 rounded-xl p-4 sm:p-6 hover:bg-crypto-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-crypto-primary to-crypto-secondary rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{t[lang].whyInvest.solanaBenefits}</h4>
                  </div>
                  <p className="text-crypto-gray-300 text-xs sm:text-sm">
                    {t[lang].whyInvest.solanaBenefitsDesc}
                  </p>
                </div>
                
                <div className="group bg-crypto-gray-800 rounded-xl p-4 sm:p-6 hover:bg-crypto-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-crypto-secondary to-crypto-accent rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{t[lang].whyInvest.communityDriven}</h4>
                  </div>
                  <p className="text-crypto-gray-300 text-xs sm:text-sm">
                    {t[lang].whyInvest.communityDrivenDesc}
                  </p>
                </div>
                
                <div className="group bg-crypto-gray-800 rounded-xl p-4 sm:p-6 hover:bg-crypto-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-crypto-accent to-crypto-primary rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{t[lang].whyInvest.pumpFunListed}</h4>
                  </div>
                  <p className="text-crypto-gray-300 text-xs sm:text-sm">
                    {t[lang].whyInvest.pumpFunListedDesc}
                  </p>
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="bg-gradient-to-r from-crypto-primary/20 to-crypto-secondary/20 rounded-2xl p-4 sm:p-6 border border-crypto-primary/30">
                <div className="text-center">
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-3">{t[lang].whyInvest.readyToInvest}</h4>
                  <p className="text-sm sm:text-base text-crypto-gray-300 mb-4">
                    {t[lang].whyInvest.readyDesc}
                  </p>
                  <a 
                    href="https://pump.fun/coin/72uC9rda8N12zWKYLyCeiQBiYU1EavgYKvDyQoCepump" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-crypto-primary to-crypto-secondary text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                  >
                    <span>{t[lang].whyInvest.buyNow}</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-12 sm:py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              {lang === 'en' ? (
                <>Join Our <span className="text-crypto-gray-200">Community</span></>
              ) : (
                <>{t[lang].community.title}</>
              )}
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-xl text-crypto-gray-200 max-w-3xl mx-auto px-4">
              {t[lang].community.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <a href="#" className="group glass-effect rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Twitter className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{t[lang].community.twitter}</h3>
              <p className="text-crypto-gray-200 text-xs sm:text-sm">{t[lang].community.twitterDesc}</p>
            </a>
            
            <a href="#" className="group glass-effect rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Send className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{t[lang].community.telegram}</h3>
              <p className="text-crypto-gray-200 text-xs sm:text-sm">{t[lang].community.telegramDesc}</p>
            </a>
            
            <a href="#" className="group glass-effect rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{t[lang].community.discord}</h3>
              <p className="text-crypto-gray-200 text-xs sm:text-sm">{t[lang].community.discordDesc}</p>
            </a>
            
            <a href="#" className="group glass-effect rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{t[lang].community.newsletter}</h3>
              <p className="text-crypto-gray-200 text-xs sm:text-sm">{t[lang].community.newsletterDesc}</p>
            </a>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{t[lang].community.stayUpdated}</h3>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <input 
                type="email" 
                placeholder={t[lang].community.emailPlaceholder}
                className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white placeholder-crypto-gray-200 border border-white/30 focus:outline-none focus:border-white text-sm sm:text-base"
              />
              <button className="bg-white text-crypto-primary px-6 py-3 rounded-full font-semibold hover:bg-crypto-gray-50 transition-colors text-sm sm:text-base">
                {t[lang].community.subscribe}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-crypto-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/panitos.png" alt="Panitos Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-lg sm:text-2xl font-bold">Panitos Crypto Coin</span>
              </div>
              <p className="text-sm sm:text-base text-crypto-gray-400 mb-4 sm:mb-6 max-w-md">
                {t[lang].footer.description}
              </p>
              <div className="flex space-x-4">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-crypto-gray-400 hover:text-crypto-primary cursor-pointer transition-colors" />
                <Send className="h-5 w-5 sm:h-6 sm:w-6 text-crypto-gray-400 hover:text-crypto-primary cursor-pointer transition-colors" />
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-crypto-gray-400 hover:text-crypto-primary cursor-pointer transition-colors" />
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-crypto-gray-400 hover:text-crypto-primary cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t[lang].footer.quickLinks}</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('about')} className="text-sm sm:text-base text-crypto-gray-400 hover:text-white transition-colors">{t[lang].nav[0]}</button></li>
                <li><button onClick={() => scrollToSection('features')} className="text-sm sm:text-base text-crypto-gray-400 hover:text-white transition-colors">{t[lang].nav[1]}</button></li>
                <li><button onClick={() => scrollToSection('tokenomics')} className="text-sm sm:text-base text-crypto-gray-400 hover:text-white transition-colors">{t[lang].nav[2]}</button></li>
                <li><button onClick={() => scrollToSection('roadmap')} className="text-sm sm:text-base text-crypto-gray-400 hover:text-white transition-colors">{t[lang].nav[3]}</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t[lang].footer.legal}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm sm:text-base text-crypto-gray-400 hover:text-white transition-colors">{t[lang].footer.privacy}</a></li>
                <li><a href="#" className="text-sm sm:text-base text-crypto-gray-400 hover:text-white transition-colors">{t[lang].footer.terms}</a></li>
                <li><a href="#" className="text-sm sm:text-base text-crypto-gray-400 hover:text-white transition-colors">{t[lang].footer.whitepaper}</a></li>
                <li><a href="#" className="text-sm sm:text-base text-crypto-gray-400 hover:text-white transition-colors">{t[lang].footer.audit}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-crypto-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-xs sm:text-sm text-crypto-gray-400 text-center md:text-left">
                {t[lang].footer.copyright}
              </p>
              <p className="text-xs text-crypto-gray-500 text-center md:text-right">
                {t[lang].footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;