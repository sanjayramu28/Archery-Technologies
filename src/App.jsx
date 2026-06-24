import { useState, useEffect } from "react";
import {
  Archive,
  Users,
  BatteryCharging,
  AlertCircle,
  Code,
  Database,
  Settings,
  Cloud,
  Repeat,
  Rocket,
  Brain,
  BarChart3
} from "lucide-react";
import './App.css'
import { Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";

// ─── LOGO ─────────────────────────────────────────────────────────────────
function ArcheryLogo({ size = 44 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width={size} height={size} >

      {/* <!-- Blue wave path --> */}
      <path
        d="M 48 230
       C 50 230, 70 80, 110 80
       C 150 80, 160 230, 180 230
       C 195 225, 205 185, 220 155"
        fill="none"
        stroke="#2233cc"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      {/* <!-- Red diagonal line --> */}
      <line
        x1="40" y1="190"
        x2="240" y2="149"
        stroke="#dd2222"
        stroke-width="6"
        stroke-linecap="round"
      />
    </svg>
  );
}

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; overflow-x: hidden; }
  body { font-family: 'Lora', Georgia, serif; background: #fff; color: #222; }

  .nav-link {
    text-decoration: none; color: #222;
    font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase; padding: 8px 14px;
    transition: color 0.2s; cursor: pointer; border-bottom: 2px solid transparent;
  }
  .nav-link:hover { color: #3B3FB5; }
  .nav-link.active { color: #3B3FB5; border-bottom-color: #E53935; }

  .page-hero {
    background: linear-gradient(135deg, #0e0e2c 0%, #1e1f6b 50%, #3B3FB5 100%);
    padding: 110px 24px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .page-hero::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, transparent, #E53935 40%, #E53935 60%, transparent);
    opacity: 0.7;
  }
  .page-hero h1 {
    font-family: 'Montserrat', sans-serif; font-weight: 800;
    font-size: clamp(28px, 5vw, 48px); color: #fff;
    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }
  .page-hero p {
    font-family: 'Lora', serif; font-size: 17px; color: rgba(255,255,255,0.8);
    margin: 14px auto 0; font-style: italic; max-width: 560px; line-height: 1.7;
  }

  .section-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(20px, 3vw, 32px);
    font-weight: 800; color: #1a1a2e; margin-bottom: 40px; text-align: center; position: relative;
  }
  .section-title::after {
    content: ''; display: block; width: 52px; height: 4px;
    background: linear-gradient(90deg, #3B3FB5, #E53935);
    margin: 12px auto 0; border-radius: 2px;
  }
  .section-title.left { text-align: left; }
  .section-title.left::after { margin-left: 0; }

  .cta-btn {
    display: inline-block; background: #E53935; color: #fff;
    font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px;
    letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 38px;
    border: none; cursor: pointer; text-decoration: none;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(229,57,53,0.35); border-radius: 2px;
  }
  .cta-btn:hover { background: #c62828; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(229,57,53,0.45); }

  .card { background: #fff; border: 1px solid #e8eaf6; border-radius: 10px; padding: 28px; box-shadow: 0 2px 12px rgba(59,63,181,0.05); transition: box-shadow 0.22s, transform 0.22s; }
  .card:hover { box-shadow: 0 10px 36px rgba(59,63,181,0.13); transform: translateY(-4px); }
  .card-blue { background: #f7f7fd; border-left: 4px solid #3B3FB5; border-radius: 0 8px 8px 0; padding: 28px 24px; transition: box-shadow 0.22s, transform 0.22s; }
  .card-blue:hover { box-shadow: 0 8px 28px rgba(59,63,181,0.12); transform: translateY(-3px); }

  .badge { font-family: 'Montserrat',sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; background: #eef0fb; color: #3B3FB5; border: 1px solid #d0d4f5; }

  .form-input {
    width: 100%; padding: 14px 16px; font-size: 14px; font-family: 'Montserrat', sans-serif;
    border: 1.5px solid #e0e0f0; border-radius: 6px; outline: none;
    background: #fafafa; transition: border-color 0.2s, background 0.2s; margin-bottom: 16px;
  }
  .form-input:focus { border-color: #3B3FB5; background: #fff; }
  .form-input::placeholder { color: #bbb; }

  .chat-input {
    width: 100%; border: none; border-bottom: 1.5px solid #e0e0e0;
    padding: 12px 14px; font-size: 14px; font-family: 'Montserrat', sans-serif;
    outline: none; background: #fafafa; transition: border-color 0.2s;
  }
  .chat-input:focus { border-bottom-color: #3B3FB5; background: #fff; }
  .chat-input::placeholder { color: #aaa; }

  @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  .fade-in { animation: fadeIn 0.35s ease forwards; }

  .grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 28px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }

  @media (max-width: 900px) {
    .grid-3 { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 700px) {
    .nav-desktop { display: none !important; }
    .hamburger   { display: flex !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
  }
`;

// ─── NAV ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", page: "/" },

  {
    label: "Who We Are",
    dropdown: [
      { label: "About Us", page: "/about" },
      { label: "Leadership Team", page: "/leadership" },
      { label: "Contact Us", page: "/contact" }
    ]
  },

  {
    label: "Insights",
    dropdown: [
      { label: "Blog", page: "/blog" },
      { label: "Webinar", page: "/webinar" },
      { label: "Events", page: "/events" }
    ]
  },

  {
    label: "Products",
    dropdown: [
      { label: "All Products", page: "/products" },
      { label: "Asset Management App", page: "/products/asset-management-application" },
      { label: "Smart Meeting Room", page: "/products/smart-meeting-room" },
      { label: "Energy Management", page: "/products/energy-management-application" },
      { label: "People Counting Application", page: "/products/people-counting-application" },
      { label: "Fault Detection", page: "/products/fault-detection-diagnosis" },
      { label: "Fault Detection AI", page: "/products/ai-based-fault-detection-diagnosis" },
      { label: "Google Analytics", page: "/products/google-analytics" },
    ]
  },

  {
    label: "Our Solution",
    dropdown: [
      { label: "Services", page: "/services" }
    ]
  }
];


const PRODUCTS = [

  /* ───────────────────────────── */
  /* 1. ASSET MANAGEMENT */
  /* ───────────────────────────── */
  {
    slug: "asset-management-application",
    icon: Archive,
    title: "Asset Management Application",
    category: "Core Platform",
    short: "Enterprise-grade platform for managing asset lifecycle.",
    desc: "Comprehensive enterprise solution for complete visibility and control over organizational assets.",

    details: [
      { content: "The Asset Management Application is a comprehensive enterprise platform designed to provide complete visibility, control, and intelligence over organizational assets across their entire lifecycle. In large-scale environments, assets are distributed across departments, locations, and operational units, making manual tracking inefficient and prone to errors. This solution centralizes all asset-related data into a unified digital system, enabling organizations to monitor asset status, location, performance, and lifecycle stage in real time." },
      { content: "The platform goes beyond traditional inventory systems by introducing intelligent lifecycle management. From procurement and onboarding to maintenance and retirement, every stage is optimized through automation and structured workflows. This ensures that organizations not only track assets but also maximize their utilization and operational efficiency." },
      { content: "One of the most powerful capabilities is predictive maintenance. By analyzing historical data and usage patterns, the system can anticipate failures before they occur, reducing downtime and extending asset lifespan. This proactive approach minimizes disruptions and ensures business continuity." },
      { content: "With advanced analytics and reporting, organizations gain insights into asset performance, cost optimization, and resource allocation. The platform enables data-driven decision-making that improves efficiency and reduces unnecessary expenditure across operations." }
    ],

    metrics: [
      { value: "48%", label: "Downtime Reduction" },
      { value: "35%", label: "Cost Optimization" },
      { value: "2.3X", label: "Asset Visibility Increase" },
      { value: "60%", label: "Maintenance Efficiency" }
    ],

    highlights: [
      { title: "Lifecycle Intelligence", desc: "Track assets from procurement to retirement." },
      { title: "Predictive Maintenance", desc: "Prevent failures before they occur." },
      { title: "Enterprise Scalability", desc: "Supports multi-location deployments." }
    ],

    steps: [
      { title: "Capture", desc: "Register all assets digitally." },
      { title: "Track", desc: "Monitor assets in real time." },
      { title: "Analyze", desc: "Generate insights from usage." },
      { title: "Optimize", desc: "Improve efficiency and reduce cost." }
    ],

    features: [
      { name: "Real-Time Tracking", icon: "⚙️" },
      { name: "Predictive Analytics", icon: "📊" },
      { name: "Maintenance Scheduling", icon: "⏰" },
      { name: "Multi-Location Support", icon: "🌍" }
    ],

    useCases: ["Enterprise", "Manufacturing", "Healthcare", "Retail"],
    tech: ["React", "Node.js", "AWS"]
  },

  /* ───────────────────────────── */
  /* 2. SMART MEETING ROOM */
  /* ───────────────────────────── */
  {
    slug: "smart-meeting-room",
    icon: Users,
    title: "Smart Meeting Room",
    category: "Smart Workplace",
    short: "Smart automation for meeting rooms.",
    desc: "Intelligent platform to optimize workspace collaboration.",

    details: [
      { content: "The Smart Meeting Room solution is designed to transform how organizations manage and utilize collaborative spaces. In modern workplaces, inefficient room usage, scheduling conflicts, and lack of visibility can reduce productivity. This platform introduces automation and real-time intelligence to optimize meeting room utilization." },
      { content: "By integrating with calendar systems and IoT devices, employees can seamlessly find, book, and access meeting rooms. Automated check-ins and smart scheduling eliminate conflicts and ensure efficient resource utilization." },
      { content: "The system provides analytics on room usage, enabling organizations to identify underutilized spaces and optimize office layouts. This leads to better planning and improved workspace efficiency." },
      { content: "With real-time monitoring and automation, organizations can create a smarter, more adaptive workplace that aligns with modern hybrid work environments." }
    ],

    metrics: [
      { value: "52%", label: "Room Utilization Increase" },
      { value: "30%", label: "Time Saved" },
      { value: "27%", label: "Productivity Boost" },
      { value: "2X", label: "Booking Efficiency" }
    ],

    highlights: [
      { title: "Smart Scheduling", desc: "Automated room booking." },
      { title: "Real-Time Visibility", desc: "Instant availability tracking." }
    ],

    steps: [
      { title: "Search", desc: "Find rooms instantly." },
      { title: "Book", desc: "Reserve with one click." },
      { title: "Access", desc: "Auto entry enabled." },
      { title: "Optimize", desc: "Analyze usage patterns." }
    ],

    features: [
      { name: "Smart Booking", icon: "📅" },
      { name: "Calendar Integration", icon: "🔗" },
      { name: "Occupancy Tracking", icon: "👥" },
      { name: "Analytics Dashboard", icon: "📈" }
    ],

    useCases: ["Corporate Offices", "Hybrid Workspaces"],
    tech: ["React", "IoT", "Azure"]
  },

  /* ───────────────────────────── */
  /* 3. ENERGY MANAGEMENT */
  /* ───────────────────────────── */
  {
    slug: "energy-management-application",
    icon: BatteryCharging,
    title: "Energy Management Application",
    category: "Core Platform",
    short: "Energy monitoring and optimization.",
    desc: "Platform to monitor and optimize energy consumption.",

    details: [
      { content: "The Energy Management Application enables organizations to monitor and optimize energy consumption across facilities. Rising energy costs and sustainability demands require deeper insights into usage patterns." },
      { content: "The platform collects real-time data from IoT devices and provides insights into consumption trends. Organizations can identify inefficiencies and reduce waste." },
      { content: "AI-driven analytics predict future consumption and recommend optimization strategies. This reduces cost while improving sustainability." },
      { content: "Centralized dashboards enable multi-location monitoring and consistent energy management practices." }
    ],

    metrics: [
      { value: "42%", label: "Energy Savings" },
      { value: "28%", label: "Cost Reduction" },
      { value: "65%", label: "Efficiency Improvement" }
    ],

    highlights: [
      { title: "Real-Time Monitoring", desc: "Track usage instantly." }
    ],

    steps: [
      { title: "Monitor", desc: "Track energy usage." },
      { title: "Analyze", desc: "Identify inefficiencies." },
      { title: "Optimize", desc: "Reduce waste." }
    ],

    features: [
      { name: "Real-Time Monitoring", icon: "⚡" },
      { name: "Analytics", icon: "📊" }
    ],

    useCases: ["Buildings", "Factories"],
    tech: ["Python", "IoT", "AWS"]
  },

  /* ───────────────────────────── */
  /* 4. PEOPLE COUNTING */
  /* ───────────────────────────── */
  {
    slug: "people-counting-application",
    icon: Users,
    title: "People Counting Application",
    category: "AI Vision",
    short: "AI-powered people analytics.",
    desc: "Track and analyze human movement patterns.",

    details: [
      { content: "The People Counting Application uses AI and computer vision to analyze human movement patterns in real time. It helps organizations understand how people interact with spaces." },
      { content: "The system tracks entry, exit, and occupancy levels, providing insights into peak hours and traffic patterns." },
      { content: "Analytics dashboards visualize trends, helping improve layout planning and staffing decisions." },
      { content: "The platform enhances operational efficiency and customer experience across industries." }
    ],

    metrics: [
      { value: "95%", label: "Accuracy" },
      { value: "40%", label: "Efficiency Improvement" }
    ],

    highlights: [
      { title: "Real-Time Tracking", desc: "Monitor movement live." }
    ],

    steps: [
      { title: "Capture", desc: "Video input." },
      { title: "Detect", desc: "AI detection." },
      { title: "Analyze", desc: "Insights generation." }
    ],

    features: [
      { name: "Live Counting", icon: "👥" },
      { name: "Heatmaps", icon: "🔥" }
    ],

    useCases: ["Retail", "Airports"],
    tech: ["AI", "OpenCV"]
  },

  /* ───────────────────────────── */
  /* 5. FAULT DETECTION */
  /* ───────────────────────────── */
  {
    slug: "fault-detection-diagnosis",
    icon: AlertCircle,
    title: "Fault Detection & Monitoring System",
    category: "Monitoring",
    short: "Real-time monitoring with manual control.",
    desc: "System that detects abnormal conditions like temperature variations and alerts operators for manual intervention.",

    details: [
      {
        content: "The Fault Detection and Monitoring System is designed to continuously track operational parameters such as temperature, load, and environmental conditions in critical systems. Many devices, including servers and industrial machinery, must operate within specific thresholds to ensure stability and performance. This platform provides real-time visibility into these parameters."
      },
      {
        content: "The system collects data from sensors and monitoring tools, analyzing it to detect abnormal conditions such as overheating, excessive load, or environmental fluctuations. When these anomalies are identified, the system generates immediate alerts, enabling operators to take corrective action."
      },
      {
        content: "Unlike AI-driven systems, this solution focuses on accurate detection and timely notification rather than automation. It ensures that human operators are informed with precise and actionable insights, allowing them to respond effectively to potential issues."
      },
      {
        content: "This approach provides a reliable and controlled method for maintaining system stability, especially in environments where manual oversight is required. It reduces the risk of unexpected failures while giving organizations full control over operational decisions."
      }
    ],

    metrics: [
      { value: "60%+", label: "Reduction in Critical Failures" },
      { value: "40%+", label: "Faster Issue Detection" },
      { value: "35%+", label: "Improved System Monitoring" },
      { value: "2X", label: "Response Time Improvement" }
    ],

    highlights: [
      { title: "Real-Time Monitoring", desc: "Continuous tracking of system conditions." },
      { title: "Instant Alerts", desc: "Immediate notifications for abnormal events." },
      { title: "Operator Control", desc: "Manual intervention with full visibility." }
    ],

    steps: [
      { title: "Monitor", desc: "Collect system data continuously." },
      { title: "Detect", desc: "Identify abnormal conditions." },
      { title: "Alert", desc: "Notify operators instantly." },
      { title: "Respond", desc: "Manual corrective action taken." }
    ],

    features: [
      { name: "Temperature Monitoring", icon: "🌡️" },
      { name: "Alert System", icon: "🚨" },
      { name: "Live Dashboard", icon: "📊" },
      { name: "System Logs", icon: "📁" }
    ],

    useCases: ["Data Centers", "Manufacturing", "Server Rooms"],
    tech: ["Node.js", "Monitoring Tools", "IoT Sensors"]
  },

  /* ───────────────────────────── */
  /* 6. AI FAULT */
  /* ───────────────────────────── */
  {
    slug: "ai-based-fault-detection-diagnosis",
    icon: Brain,
    title: "AI-Based Fault Detection & Intelligent Control",
    category: "AI Automation",
    short: "Predictive fault detection with automated system optimization.",
    desc: "AI-driven system that predicts failures and dynamically adjusts operating conditions such as temperature for optimal performance.",

    details: [
      {
        content: "The AI-Based Fault Detection and Intelligent Control system is designed to ensure optimal operation of critical infrastructure such as servers, industrial equipment, and energy systems. In many environments, devices must operate within specific temperature and performance thresholds to maintain efficiency and prevent damage. This platform leverages artificial intelligence to continuously monitor these parameters and automatically maintain optimal conditions."
      },
      {
        content: "The system collects real-time data from sensors, including temperature, load, and environmental conditions, and applies machine learning models to identify patterns and predict potential failures. Unlike traditional monitoring systems, it does not simply detect issues—it anticipates them before they occur."
      },
      {
        content: "One of the most powerful capabilities is automated control. When the system detects a deviation from optimal conditions, such as rising temperature in a server environment, it can automatically trigger corrective actions. This may include adjusting cooling systems, redistributing workloads, or optimizing environmental controls to restore balance without human intervention."
      },
      {
        content: "This proactive and autonomous approach significantly reduces downtime, prevents hardware damage, and ensures consistent performance. It transforms traditional reactive maintenance into a fully intelligent, self-optimizing system."
      }
    ],

    metrics: [
      { value: "70%+", label: "Failure Prevention Rate" },
      { value: "55%+", label: "Reduction in Overheating Issues" },
      { value: "45%+", label: "Increase in System Stability" },
      { value: "2.5X", label: "Faster Automated Response" }
    ],

    highlights: [
      { title: "Predictive Intelligence", desc: "Anticipates failures before they occur." },
      { title: "Automated Control", desc: "Adjusts temperature and system conditions automatically." },
      { title: "Self-Optimizing Systems", desc: "Continuously maintains optimal performance." }
    ],

    steps: [
      { title: "Monitor", desc: "Collect real-time sensor data (temperature, load)." },
      { title: "Predict", desc: "AI models analyze patterns and detect risks." },
      { title: "Decide", desc: "System determines optimal corrective action." },
      { title: "Act", desc: "Automatically adjusts environment and operations." }
    ],

    features: [
      { name: "AI Prediction Engine", icon: "🧠" },
      { name: "Automated Temperature Control", icon: "🌡️" },
      { name: "Real-Time Monitoring", icon: "📡" },
      { name: "Self-Healing Systems", icon: "♻️" }
    ],

    useCases: ["Data Centers", "Industrial Equipment", "Energy Systems"],
    tech: ["Machine Learning", "IoT Sensors", "Python", "Cloud AI"]
  },

  /* ───────────────────────────── */
  /* 7. GOOGLE ANALYTICS */
  /* ───────────────────────────── */
 {
  slug: "google-analytics",
  icon: BarChart3,
  title: "Google Analytics & Digital Intelligence ",
  category: "Business Intelligence",
  short: "Centralized energy monitoring and reporting platform powered by Google Looker Studio.",
  desc: "A data-driven energy management solution that collects energy consumption data, processes key metrics, and visualizes performance through interactive Google Looker Studio dashboards.",

  details: [
    {
      content: "The Google Analytics Application was developed to provide organizations with clear visibility into their energy consumption patterns through centralized monitoring and reporting. By integrating operational energy data into Google Looker Studio, the platform transforms raw records into meaningful dashboards that support informed decision-making and sustainability initiatives."
    },
    {
      content: "The solution collects energy-related data from multiple sources and processes it into structured datasets. These datasets are then pushed to Google Looker Studio, where interactive dashboards provide real-time and historical insights into energy usage, consumption trends, efficiency metrics, and operational performance."
    },
    {
      content: "With customizable visualizations and KPI tracking, stakeholders can easily monitor energy consumption across different facilities, departments, or equipment. The dashboards help identify usage patterns, detect inefficiencies, and support efforts to reduce energy waste and operational costs."
    },
    {
      content: "By leveraging Google Looker Studio's powerful reporting capabilities, the application enables automated reporting, executive-level summaries, and data-driven analysis. This allows organizations to improve energy efficiency, track sustainability goals, and make proactive operational decisions based on accurate and accessible data."
    }
  ],

  metrics: [
    { value: "100%", label: "Centralized Energy Data" },
    { value: "24/7", label: "Dashboard Availability" },
    { value: "Real-Time", label: "Performance Monitoring" },
    { value: "Interactive", label: "Reporting & Insights" }
  ],

  highlights: [
    {
      title: "Energy Consumption Monitoring",
      desc: "Track and analyze energy usage across multiple sources."
    },
    {
      title: "Google Looker Studio Integration",
      desc: "Visualize data through dynamic dashboards and reports."
    },
    {
      title: "KPI & Trend Analysis",
      desc: "Monitor key energy performance indicators and consumption trends."
    },
    {
      title: "Automated Reporting",
      desc: "Generate actionable insights through centralized reporting."
    }
  ],

  steps: [
    {
      title: "Collect Data",
      desc: "Gather energy consumption data from operational sources."
    },
    {
      title: "Process & Transform",
      desc: "Clean, structure, and prepare datasets for reporting."
    },
    {
      title: "Push to Looker Studio",
      desc: "Integrate processed data with Google Looker Studio."
    },
    {
      title: "Visualize & Analyze",
      desc: "Monitor KPIs, trends, and energy performance through dashboards."
    }
  ],

  features: [
    { name: "Interactive Dashboards", icon: "📊" },
    { name: "Energy KPI Tracking", icon: "⚡" },
    { name: "Trend Analysis", icon: "📈" },
    { name: "Custom Reports", icon: "📋" },
    { name: "Data Integration", icon: "🔗" },
    { name: "Executive Insights", icon: "📑" }
  ],

  useCases: [
    "Energy Consumption Monitoring",
    "Utility Usage Analysis",
    "Operational Performance Tracking",
    "Sustainability Reporting",
    "Management Dashboards"
  ],

  tech: [
    "Google Looker Studio",
    "Google Sheets / Data Connectors",
    "REST APIs",
    "Data Processing Pipelines",
    "Business Intelligence Reporting"
  ]
}
];

function ProductsPage() {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".product-card-premium");
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 100);
        }
      });
    }, { threshold: 0.2 });
    cards.forEach(card => observer.observe(card));
  }, []);

  return (
    <div className="fade-in">
      <div className="page-hero" style={{ paddingBottom: 100 }}>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", marginBottom: 20 }}>Our Products</h1>
        <p style={{ fontSize: 18, maxWidth: 700 }}>Innovative platforms designed to solve real-world business challenges through modern technology and advanced automation.</p>
      </div>

      <section style={{ padding: "80px 24px", maxWidth: 1220, margin: "0 auto" }}>
        <h2 className="section-title" style={{ marginBottom: 60 }}>Product Portfolio</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24 }}>
          {PRODUCTS.map((p, idx) => (
            <div
              key={p.title}
              className="product-card-premium"
              onClick={() => navigate(`/products/${p.slug}`)}
              onMouseEnter={() => setHoveredProduct(idx)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{
                cursor: "pointer",
                opacity: 0,
                transform: "translateY(40px)",
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              <div className="product-card-inner" style={{
                borderRadius: 20,
                background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
                border: "1px solid rgba(59, 63, 181, 0.1)",
                padding: "40px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.4s ease",
                boxShadow: "0 8px 28px rgba(59,63,181,0.08)",
                position: "relative",
                overflow: "hidden"
              }}
              >
                {/* Background Glow Effect */}
                <div style={{
                  position: "absolute",
                  top: -100,
                  right: -100,
                  width: 200,
                  height: 200,
                  background: "radial-gradient(circle, rgba(59,63,181,0.1) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  opacity: hoveredProduct === idx ? 1 : 0,
                  transition: "opacity 0.4s ease"
                }} />

                <div style={{
                  width: 68,
                  height: 68,
                  background: "linear-gradient(135deg, #3B3FB5 0%, #5f6fff 100%)",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 28,
                  boxShadow: "0 10px 28px rgba(59,63,181,0.25)",
                  transition: "all 0.3s ease",
                  transform: hoveredProduct === idx ? "scale(1.1) rotateY(-5deg)" : "scale(1)"
                }}>
                  <p.icon size={32} color="#fff" strokeWidth={1.5} />
                </div>

                <h3 style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 800,
                  fontSize: 24,
                  color: "#1a1a2e",
                  marginBottom: 12,
                  lineHeight: 1.3
                }}>
                  {p.title}
                </h3>

                <p style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#3B3FB5",
                  marginBottom: 12,
                  fontWeight: 600
                }}>
                  {p.short}
                </p>

                <p style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "#666",
                  marginBottom: 24,
                  flex: 1
                }}>
                  {p.desc}
                </p>

                {/* Tech Stack */}
                {/* <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                  {p.tech.slice(0, 3).map(t => (
                    <span key={t} style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "6px 14px",
                      background: "linear-gradient(135deg, #eef0fb 0%, #f1f3ff 100%)",
                      color: "#3B3FB5",
                      borderRadius: 20,
                      border: "1px solid rgba(59, 63, 181, 0.2)",
                      transition: "all 0.2s ease"
                    }}>
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "6px 14px",
                      color: "#3B3FB5",
                      opacity: 0.7
                    }}>+{p.tech.length - 3} more</span>
                  )}
                </div> */}

                {/* Metrics Preview */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(59, 63, 181, 0.1)"
                }}>
                  {p.metrics.slice(0, 2).map((m, i) => (
                    <div key={i}>
                      <div style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#3B3FB5",
                        marginBottom: 4
                      }}>
                        {m.value}
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: "#999",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5
                      }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 24,
                  padding: "16px 20px",
                  background: hoveredProduct === idx ? "linear-gradient(135deg, #3B3FB5 0%, #4e52c7 100%)" : "rgba(59,63,181,0.05)",
                  borderRadius: 12,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  fontWeight: 600,
                  color: hoveredProduct === idx ? "#fff" : "#3B3FB5"
                }}>
                  See More →
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 80 }}>
          <p style={{
            fontFamily: "'Lora',serif",
            fontSize: 19,
            color: "#555",
            marginBottom: 28,
            fontStyle: "italic"
          }}>
            Ready to transform your operations with cutting-edge solutions?
          </p>

          <button className="cta-btn" onClick={() => navigate("contact")} style={{
            padding: "16px 42px",
            fontSize: 16,
            fontWeight: 700,
            boxShadow: "0 12px 40px rgba(229, 57, 53, 0.4)",
            border: "none",
            borderRadius: 8,
            transition: "all 0.3s ease"
          }}>
            Request a Demo
          </button>
        </div>
      </section>
    </div>
  );
}


function ProductDetailsPage({ product }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!product) return <div>Product not found</div>;

  // 🔥 Animation (always works)
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-premium");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const CARD = {
    padding: 26,
    borderRadius: 16,
    background: "linear-gradient(145deg,#ffffff,#f6f7ff)",
    border: "1px solid #e6e9ff",
    boxShadow: "0 10px 30px rgba(59,63,181,0.12)",
    transition: "all 0.25s ease"
  };

  return (
    <div className="fade-in">

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg,#0e0e2c,#3B3FB5)",
        padding: "140px 24px 90px",
        color: "#fff",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "clamp(36px,6vw,56px)", fontWeight: 800 }}>
          {product.title}
        </h1>

        <p style={{
          maxWidth: 760,
          margin: "16px auto 0",
          opacity: 0.9,
          lineHeight: 1.8,
          fontSize: 16
        }}>
          {product.desc}
        </p>
      </section>

      {/* OVERVIEW (PARAGRAPH STYLE) */}
      <section className="reveal-premium" style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "50px 24px"
      }}>
        <h2 className="section-title left" style={{ marginBottom: 30 }}>
          Overview
        </h2>

        {product.details.map((d, i) => (
          <p key={i} style={{
            marginBottom: 20,
            lineHeight: 1.9,
            color: "#444",
            fontSize: 16
          }}>
            {d.content}
          </p>
        ))}
      </section>

      {/* METRICS */}
      {product.metrics && (
        <section className="reveal-premium" style={{
          padding: "70px 24px",
          background: "linear-gradient(135deg,#1e1f6b,#3B3FB5)",
          color: "#fff"
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ marginBottom: 40 }}>Business Impact</h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20
            }}>
              {product.metrics.map((m, i) => (
                <div key={i} style={{
                  padding: 24,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.08)"
                }}>
                  <h2 style={{ fontSize: 32, fontWeight: 800 }}>{m.value}</h2>
                  <p>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS (TIMELINE FLOW) */}
      <section className="reveal-premium" style={{ padding: "50px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            How It Works
          </h2>

          <div style={{ position: "relative", paddingLeft: 30 }}>

            {/* vertical line */}
            <div style={{
              position: "absolute",
              left: "49px",
              top: 0,
              bottom: 0,
              width: 2,
              background: "#e0e4ff"
            }} />

            {product.steps.map((step, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 30
              }}>
                {/* step circle */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#3B3FB5",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  marginRight: 20,
                  zIndex: 2
                }}>
                  {i + 1}
                </div>

                {/* content */}
                <div
                  style={{ ...CARD, flex: 1 }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 18px 40px rgba(59,63,181,0.25)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(59,63,181,0.12)";
                  }}
                >
                  <h4>{step.title}</h4>
                  <p style={{ color: "#666", fontSize: 14 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      {product.highlights && (
        <section className="reveal-premium" style={{
          padding: "50px 24px",
          background: "#f7f8fc"
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 className="section-title" style={{ marginBottom: 40 }}>
              Why This Solution Stands Out
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 20
            }}>
              {product.highlights.map((item, i) => (
                <div
                  key={i}
                  style={CARD}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 18px 40px rgba(59,63,181,0.25)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(59,63,181,0.12)";
                  }}
                >
                  <h4>{item.title}</h4>
                  <p style={{ color: "#666" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      <section className="reveal-premium" style={{
        padding: "50px 24px",
        background: "#f3f4f8"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            Key Features
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20
          }}>
            {product.features.map((f, i) => (
              <div
                key={i}
                style={{ ...CARD, textAlign: "center" }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{f.icon}</div>
                <h4>{f.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      {/* <section className="reveal-premium" style={{ padding: "50px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            Use Cases
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20
          }}>
            {product.useCases.map((u, i) => (
              <div key={i} style={CARD}>
                {u}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* TECH STACK */}
      <section className="reveal-premium" style={{ padding: "50px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            Technology Stack
          </h2>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center"
          }}>
            {product.tech.map((t, i) => (
              <div key={i} style={{
                padding: "10px 18px",
                borderRadius: 30,
                background: "#eef0fb",
                color: "#3B3FB5",
                fontWeight: 600,
                fontSize: 13
              }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function ProductRoute() {
  const { slug } = useParams();

  const product = PRODUCTS.find(p => p.slug === slug);

  return <ProductDetailsPage product={product} />;
}
function Navbar({ currentPage }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);
  const [lastScroll, setLastScroll] = useState(0);

  // 🔥 HIDE NAV ON SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: showNav
          ? "translate(-50%, 0)"
          : "translate(-50%, -120%)",
        transition: "transform 0.3s ease",
        width: "96%",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.75), rgba(255,255,255,0.4))",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        borderRadius: 16,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000
      }}
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
      >
        <ArcheryLogo size={50} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Archery</div>
          <div style={{ fontSize: 10, color: "#3B3FB5" }}>Technologies</div>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="nav-desktop" style={{ display: "flex", gap: 20 }}>
        {NAV_LINKS.map((item, index) => (
          <div
            key={index}
            style={{ position: "relative" }}
            onMouseEnter={() => setActiveMenu(index)}
            onMouseLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setActiveMenu(null);
              }
            }}
          >
            {/* LABEL */}
            <div
              onClick={() => {
                if (item.page) navigate(item.page);
              }}
              style={{
                fontWeight: 500,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                padding: "10px 8px"
              }}
            >
              {item.label}

              {/* ▼ DOWN ARROW */}
              {item.dropdown && (
                <span
                  style={{
                    fontSize: 10,
                    transition: "transform 0.2s",
                    transform:
                      activeMenu === index
                        ? "rotate(180deg)"
                        : "rotate(0deg)"
                  }}
                >
                  ▼
                </span>
              )}
            </div>

            {/* ✅ SINGLE DROPDOWN */}
            {item.dropdown && (
              <>
                {/* 🔥 HOVER BRIDGE (MUST BE OUTSIDE) */}
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    height: 12,
                  }}
                />

                {/* 🔥 DROPDOWN */}
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    marginTop: 12,

                    left: index === NAV_LINKS.length - 1 ? "auto" : "50%",
                    right: index === NAV_LINKS.length - 1 ? 0 : "auto",

                    transform:
                      activeMenu === index
                        ? (index === NAV_LINKS.length - 1
                          ? "translateY(0) scale(1)"
                          : "translateX(-50%) translateY(0) scale(1)")
                        : (index === NAV_LINKS.length - 1
                          ? "translateY(10px) scale(0.96)"
                          : "translateX(-50%) translateY(10px) scale(0.96)"),

                    opacity: activeMenu === index ? 1 : 0,
                    pointerEvents: activeMenu === index ? "auto" : "none",

                    width: 290,

                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.75), rgba(255,255,255,0.4))",
                    backdropFilter: "blur(22px)",

                    borderRadius: 18,
                    padding: "12px 0",

                    border: "1px solid rgba(255,255,255,0.5)",

                    boxShadow: `
    0 25px 70px rgba(0,0,0,0.15),
    0 10px 30px rgba(59,63,181,0.2),
    inset 0 1px 0 rgba(255,255,255,0.7)
  `,

                    transition: "all 0.25s ease"
                  }}
                >
                  {item.dropdown.map((sub, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        navigate(sub.page);
                        setActiveMenu(null);
                      }}
                      style={{
                        padding: "13px 22px",
                        margin: "4px 0px",
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "all 0.25s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(90deg, rgba(59,63,181,0.12), rgba(229,57,53,0.12))";
                        e.currentTarget.style.transform = "translateX(6px)";
                        e.currentTarget.style.color = "#3B3FB5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.color = "#1a1a2e";
                      }}
                    >
                      {sub.label}

                      <span
                        className="arrow"
                        style={{
                          opacity: 0,
                          transition: "all 0.2s ease"
                        }}
                      >
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* MOBILE HAMBURGER */}
      <div
        className="hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ display: "none", cursor: "pointer" }}
      >
        ☰
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,40,0.5)",
            backdropFilter: "blur(8px)",
            zIndex: 1500
          }}
        />
      )}

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 80,
            left: 0,
            right: 0,
            bottom: 0,
height:"250px",
overflowY:"auto",
            /* 🔥 TRUE GLASS */
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.75), rgba(255,255,255,0.45))",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",

            /* 🔥 DEPTH + GLOW */
            boxShadow: `
        0 20px 80px rgba(0,0,0,0.25),
        inset 0 1px 0 rgba(255,255,255,0.7)
      `,

            borderTop: "1px solid rgba(255,255,255,0.6)",

            // padding: "110px 24px 24px", /* below navbar */

            zIndex: 2000,

            overflowY: "auto",

            animation: "fadeIn 0.3s ease"
          }}
        >
          {NAV_LINKS.map((item, i) => (
            <div key={i} style={{ marginBottom: 20 }}>

              {/* MAIN */}
              <div
                onClick={() => {
                  if (item.dropdown) {
                    setOpenMobileMenu(openMobileMenu === i ? null : i);
                  } else {
                    navigate(item.page);
                    setMobileOpen(false);
                  }
                }}
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  padding: "12px 14px",
                  borderRadius: 12,

                  transition: "all 0.25s ease",
                  cursor: "pointer"
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(90deg, rgba(59,63,181,0.12), rgba(229,57,53,0.12))";
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}

                {item.dropdown && (
                  <span
                    style={{
                      transform:
                        openMobileMenu === i
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "0.3s"
                    }}
                  >
                    ▼
                  </span>
                )}
              </div>

              {/* DROPDOWN */}
              {item.dropdown && (
                <div
                  style={{
                    maxHeight: openMobileMenu === i ? 400 : 0,
                    overflow: "hidden",
                    transition: "all 0.35s ease",
                    marginTop: 8,
                    paddingLeft: 10
                  }}
                >
                  {item.dropdown.map((sub, j) => (
                    <div
                      key={j}
                      onClick={() => {
                        navigate(sub.page);
                        setMobileOpen(false);
                      }}
                      style={{
                        padding: "10px 12px",
                        fontSize: 14,
                        borderRadius: 10,
                        marginBottom: 6,

                        background: "rgba(255,255,255,0.5)",
                        backdropFilter: "blur(10px)",

                        transition: "all 0.25s ease",
                        cursor: "pointer"
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "translateX(6px)";
                        e.currentTarget.style.background =
                          "linear-gradient(90deg, rgba(59,63,181,0.12), rgba(229,57,53,0.12))";
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                      }}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0e0e2c", color: "rgba(255,255,255,0.8)", padding: "48px 24px 32px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 4 }}>
        <ArcheryLogo size={46} />
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 15, color: "#fff", lineHeight: 1.1 }}>Archery</div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: "0.22em", color: "#818cf8", textTransform: "uppercase" }}>Technologies</div>
        </div>
      </div>
      <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#3B3FB5,#E53935)", margin: "20px auto", borderRadius: 2 }} />
      <div style={{ fontSize: 13, marginBottom: 8, color: "rgba(255,255,255,0.5)" }}>66 Jai Nagar extn,
        2nd Main Street
        Karumandapam,
        Trichy</div>
      <div style={{ fontSize: 13, marginBottom: 28 }}>
        <a href="mailto:contact@archerytechnologies.com" style={{ color: "#818cf8", textDecoration: "none" }}>contact@archerytechnologies.com</a>
      </div>
      {/* <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
        {NAV_LINKS.map((l, i) => (
          <span
            key={i}
            onClick={() => l.page && navigate(l.page)}
          >
            {l.label}
          </span>
        ))}
      </div> */}
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Copyright © 2024 Archery Technologies · All Rights Reserved</div>
    </footer>
  );
}

// ─── CHAT WIDGET ──────────────────────────────────────────────────────────
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => { setSent(false); setOpen(false); setForm({ name: "", email: "", message: "" }); }, 3000);
    }
  };
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      {open && (
        <div style={{ width: 320, background: "#fff", borderRadius: 12, boxShadow: "0 12px 48px rgba(0,0,0,0.22)", overflow: "hidden", animation: "slideUp 0.25s ease" }}>
          <div style={{ background: "#3B3FB5", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>Archery Technologies</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>We typically reply shortly</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
          <div style={{ padding: "16px 16px 8px" }}>
            <div style={{ background: "#eef0fb", borderRadius: "0 12px 12px 12px", padding: "12px 16px", fontSize: 14, color: "#333", lineHeight: 1.6, marginBottom: 8 }}>
              Hi! Let us know how we can help and we'll respond shortly.
            </div>
          </div>
          {sent ? (
            <div style={{ padding: "28px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "#3B3FB5", fontSize: 15 }}>Message sent!</div>
              <div style={{ fontSize: 13, color: "#777", marginTop: 6 }}>We'll be in touch soon.</div>
            </div>
          ) : (
            <div style={{ paddingBottom: 16 }}>
              <input className="chat-input" placeholder="Name*" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input className="chat-input" placeholder="Email*" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ marginTop: 1 }} />
              <textarea className="chat-input" placeholder="How can we help?*" rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ marginTop: 1, resize: "vertical", borderBottom: "none" }} />
              <div style={{ padding: "12px 16px 4px" }}>
                <button onClick={submit} className="cta-btn" style={{ width: "100%", padding: 13, borderRadius: 4 }}>Send</button>
              </div>
              {/* <div style={{ fontSize: 11, color: "#aaa", textAlign: "center", padding: "6px 16px 0", fontFamily: "'Montserrat',sans-serif" }}>
                Protected by reCAPTCHA &middot; <a href="https://policies.google.com/privacy" style={{ color: "#aaa" }}>Privacy</a> &amp; <a href="https://policies.google.com/terms" style={{ color: "#aaa" }}>Terms</a>
              </div> */}
            </div>
          )}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        width: 56, height: 56, borderRadius: "50%",
        background: open ? "#1a1a2e" : "#3B3FB5",
        border: "none", cursor: "pointer",
        boxShadow: "0 4px 20px rgba(59,63,181,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s, transform 0.2s",
      }}
        onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {open
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></svg>
          : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        }
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════════════════
function HomePage() {
  const CLIENTS = [
  {
    name: "Four Corners Technologies",
    project: "AI-Based Fault Detection System",
    logo: "https://www.fourcorners.asia/assets/logo-44Hu2BF3.png"
  },
  {
    name: "Arrow Access ",
    project: "Arrow Access Portfolio",
    logo: "https://www.fourcorners/assets/logo-44Hu2BF3.png"
  },
  {
    name: "Kairavi Montessori ",
    project: "Montessori Application",
    logo: "https://static.wixstatic.com/media/9981f8_6b4eda152c3c46849c03a456834418c9~mv2.png/v1/fill/w_342,h_186,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9981f8_6b4eda152c3c46849c03a456834418c9~mv2.png"
  },
  {
    name: "Four Corners Technologies",
    project: "Asset Management Platform",
    logo: "https://www.fourcorners.asia/assets/logo-44Hu2BF3.png"
  },
  {
    name: "Four Corners Technologies",
    project: "People Counting Analytics",
    logo: "https://www.fourcorners.asia/assets/logo-44Hu2BF3.png"
  },
  {
    name: "Four Corners Technologies",
    project: "Energy Monitoring System",
    logo: "https://www.fourcorners.asia/assets/logo-44Hu2BF3.png"
  },
  {
    name: "Four Corners Technologies",
    project: "Analytics Dashboard Integration",
    logo: "https://www.fourcorners.asia/assets/logo-44Hu2BF3.png"
  }
];
  const navigate = useNavigate();
useEffect(() => {
  const track = document.querySelector(".clients-track-ultra");

  let isDown = false;
  let startX;
  let scrollLeft;

  if (!track) return;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = "grabbing";
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
    track.style.cursor = "grab";
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
    track.style.cursor = "grab";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
}, []);
  return (
    <div className="fade-in">

      {/* HERO */}
      <section className="hero-premium">

        <div className="hero-container single">

          <div className="hero-left center">

            <div className="hero-tag">
              BUILD • SCALE • DEPLOY
            </div>

            <h1 className="hero-title">
              Transforming Ideas Into <br />
              <span>Scalable Digital Solutions</span>
            </h1>

            <p className="hero-desc">
              We design and engineer high-performance digital platforms, intelligent systems,
              and scalable cloud solutions that enable businesses to innovate faster,
              operate efficiently, and deliver exceptional user experiences at scale.
            </p>

            <div className="hero-buttons center">
              <button onClick={() => navigate("/services")} className="btn-primary">
                Explore Services
              </button>

              <button onClick={() => navigate("/contact")} className="btn-secondary">
                Contact Us
              </button>
            </div>

          </div>

        </div>

      </section>

      <section className="home-section">

  <h2 className="section-title">Our Impact</h2>

  <div className="impact-grid">

    {[
  {
    title: "Understand Before We Build",
    desc: "We take time to understand your operations, challenges, and goals before recommending solutions."
  },
  {
    title: "Solutions Tailored To Your Needs",
    desc: "Every business is different. We design systems around your processes rather than forcing you to adapt to generic software."
  },
  {
    title: "Technology That Delivers Results",
    desc: "Our focus is on creating systems that improve productivity, visibility, automation, and decision-making."
  },
  {
    title: "Support Beyond Launch",
    desc: "We remain involved after deployment, ensuring your solution continues to perform and evolve with your business."
  }
].map((item, i) => (
      <div key={i} className="impact-card">
        <h2>{item.value}</h2>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    ))}

  </div>

</section>
      {/* WHY */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>

          <div className="why-grid">
            {[
              {
                title: "Scalable Architecture",
                desc: "Systems designed to grow with your business without performance bottlenecks."
              },
              {
                title: "Modern Technologies",
                desc: "We use cutting-edge tools to ensure speed, reliability, and maintainability."
              },
              {
                title: "Business Impact",
                desc: "Every solution is built with measurable outcomes and ROI in mind."
              }
            ].map((item, i) => (
              <div key={i} className="why-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  {/* PROCESS */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title mt-5">How We Work</h2>

          <div className="process-grid">
            {[
              { step: "01", title: "Understand", desc: "Analyze business needs deeply." },
              { step: "02", title: "Design", desc: "Architect scalable systems." },
              { step: "03", title: "Develop", desc: "Build robust solutions." },
              { step: "04", title: "Deploy", desc: "Launch and optimize." }
            ].map((p, i) => (
              <div key={i} className="process-card">
                <div className="step">{p.step}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className="home-section">

  <h2 className="section-title">Trusted By Leading Teams</h2>

  <div className="clients-outer">

    <div className="clients-fade left" />
    <div className="clients-fade right" />

    <div
      className="clients-track-ultra"
      onMouseEnter={(e) => {
        e.currentTarget.style.animationDuration = "60s"; // slow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.animationDuration = "30s";
      }}
    >
      {[...CLIENTS, ...CLIENTS].map((c, i) => (
        <div key={i} className="client-card-ultra">

          <img src={c.logo} alt={c.name} />

          <div className="client-info">
            <h4>{c.name}</h4>
            <p>{c.project}</p>
          </div>

        </div>
      ))}
    </div>

  </div>

</section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ══════════════════════════════════════════════════════════════════════════
const ABOUT_SECTIONS = [
  {
    title: "Who We Are",
    items: [
      "Established 3 years ago, we are a focused technology team delivering reliable and scalable digital solutions.",
      "Our team consists of 5 dedicated professionals committed to performance, quality, and measurable business impact.",
      "Led by industry experts with 15+ years of experience, we bring strong technical knowledge and strategic insight to every project."
    ]
  },
  {
    title: "How We Operate",
    items: [
      "We believe in transparent communication at every stage of the project lifecycle.",
      "Strong project planning and structured execution form the foundation of our work.",
      "We work closely with our clients to deeply understand their real business challenges.",
      "Attention to detail and consistent delivery ensure long-term value and sustainable growth."
    ]
  },
  {
    title: "How We Can Help",
    items: [
      "We provide end-to-end technology solutions tailored to your business needs.",
      "From planning and design to implementation and support, we manage the complete solution lifecycle.",
      "Our focus is on building high-performance systems that improve efficiency and drive results.",
      "We deliver solutions that create lasting impact, not just short-term fixes."
    ]
  },
];

function AboutPage() {
  return (
    <div className="fade-in">
      <div className="page-hero">
        <h1>About Us</h1>
        <p>
          Delivering end-to-end technology solutions with a strong focus on performance, quality, and long-term value.
        </p>
      </div>

      {/*<section style={{ padding: "80px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <h2 className="section-title">Our Story</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          {["Established 3 Years Ago", "5 Dedicated Professionals", "15+ Years Leadership Experience", "End-to-End Technology Solutions"].map(b => (<span key={b} className="badge">{b}</span>
          ))}
        </div>
        <div className="grid-3" style={{ alignItems: "start", }}>
          {ABOUT_SECTIONS.map(s => (
            <div key={s.title} className="card-blue" style={{ height: "400px" }}>
              <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#3B3FB5", marginBottom: 16, textTransform: "uppercase" }}>{s.title}</h4>
              <ul>
                {s.items.map((item, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: "#444", marginBottom: 10, listStyle: "none", paddingLeft: 20, position: "relative" }}>
                    <span style={{ color: "#E53935", position: "absolute", left: 0, fontSize: 11, top: 4 }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>*/}


      {/* Leadership */}
      {/* <section style={{ background: "linear-gradient(180deg,#f7f7fd,#eef0fb)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 className="section-title">Leadership Team</h2>
          <div className="card" style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", padding: "40px 36px" }}>
            <div style={{ width: 84, height: 84, background: "linear-gradient(135deg,#3B3FB5,#6366f1)", borderRadius: "50%", margin: "0 auto 22px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", boxShadow: "0 4px 20px rgba(59,63,181,0.3)" }}>DB</div>
            <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 20, color: "#1a1a2e", marginBottom: 6 }}>Dean Babcock</h3>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E53935", fontWeight: 700, background: "#fff3f3", padding: "4px 12px", borderRadius: 20, display: "inline-block", marginBottom: 18 }}>Data &amp; Analytics Architect</span>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", fontStyle: "italic" }}>
              Dean is a trusted Data and Analytics Solution Architect working with business, technology, and operations teams to deliver high impact analytics, data warehouses, and business intelligence on premise and in the cloud.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SERVICES PAGE
// ══════════════════════════════════════════════════════════════════════════
// const SERVICES = [
//   { icon: "🏗️", title: "SAP Data Structures", desc: "Expertise in Finance, Supply Chain Management, Materials Management, Transportation, RLM, Sales & Distribution, Human Resources, and Plant Maintenance.", tags: ["Finance", "Supply Chain", "HR", "Plant Maintenance"] },
//   { icon: "🗄️", title: "Database & Data Warehouse Technologies", desc: "Including Teradata, SQL Server, Oracle, Snowflake, SAP BI, and Hadoop — covering design, implementation, and optimization.", tags: ["Teradata", "Snowflake", "Oracle", "SQL Server"] },
//   { icon: "⚙️", title: "Data Engineering", desc: "SAP Data Services, HVR, Databricks, Python, CosmosDB and OData — building robust data pipelines and integration frameworks.", tags: ["Databricks", "Python", "CosmosDB", "OData"] },
//   { icon: "🤖", title: "Data Science & Analytics", desc: "Supervised Learning, Unsupervised Learning, Machine Learning, Statistics, Python, SQL, and Data Mining to surface actionable insights.", tags: ["Machine Learning", "Python", "Statistics", "SQL"] },
//   { icon: "📊", title: "Data Visualization", desc: "PowerBI, Tableau, SAP Business Objects — current and evolving technologies, including training your team for self-service analytics.", tags: ["PowerBI", "Tableau", "SAP BO", "Training"] },
//   { icon: "📋", title: "Project Management", desc: "Agile practices and enhanced Waterfall, iterative delivery and a business-driven approach ensuring on-time, on-budget delivery.", tags: ["Agile", "Waterfall", "Iterative", "Business-Driven"] },
// ];
const SERVICES = [
  {
    icon: Code,
    title: "Application Development",
    desc: "We design and engineer high-performance, scalable web applications tailored to modern business needs. Leveraging technologies like React, Node.js, and Python, we build responsive and secure platforms that deliver seamless user experiences. From internal enterprise tools to customer-facing applications, our solutions are optimized for performance, reliability, and long-term scalability.",
    tags: ["React", "Node.js", "Python", "Full-Stack"]
  },

  {
    icon: Database,
    title: "Data Engineering",
    desc: "We build robust data infrastructures that enable organizations to collect, process, and manage large volumes of data efficiently. Our solutions include scalable data pipelines, ETL processes, API integrations, and optimized database architectures. We ensure data flows seamlessly across systems, enabling faster decision-making and reliable business operations.",
    tags: ["Data Pipelines", "ETL", "APIs", "Database Design"]
  },

  {
    icon: Cloud,
    title: "Cloud Deployment & DevOps",
    desc: "We enable businesses to deploy, scale, and manage applications in the cloud with confidence. Our cloud solutions include infrastructure setup, CI/CD pipelines, performance monitoring, and cost optimization. We ensure your applications remain highly available, secure, and scalable under increasing workloads.",
    tags: ["Cloud Hosting", "CI/CD", "Scalability", "Monitoring"]
  },

  {
    icon: Brain, // 🔥 ADD THIS IMPORT FROM LUCIDE
    title: "AI & Intelligent Solutions",
    desc: "We build AI-powered systems that transform raw data into actionable intelligence. From predictive analytics to intelligent automation, our solutions help businesses detect patterns, optimize operations, and make data-driven decisions. We integrate AI seamlessly into your applications to enhance efficiency, accuracy, and innovation.",
    tags: ["AI", "Machine Learning", "Automation", "Predictive Analytics"]
  },

  {
    icon: BarChart3, // 🔥 ADD THIS IMPORT FROM LUCIDE
    title: "Data Analytics & Visualization",
    desc: "We transform complex data into meaningful insights through interactive dashboards and advanced analytics. Our solutions enable organizations to track performance, identify trends, and make strategic decisions with clarity. By combining analytics with intuitive visualizations, we empower teams to understand and act on their data effectively.",
    tags: ["Dashboards", "Analytics", "Visualization", "Insights"]
  },

  {
    icon: Repeat,
    title: "Application Maintenance & Support",
    desc: "We provide continuous support and maintenance to ensure your applications remain secure, optimized, and up-to-date. From performance tuning and bug fixes to feature enhancements, we help your systems evolve alongside your business requirements without disruption.",
    tags: ["Upgrades", "Bug Fixes", "Optimization", "Support"]
  }
];
function ServicesPage() {
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card-ultra");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fade-in">

      {/* HERO */}
      <section className="services-hero">
        <div className="container">
          <h1>
            Delivering <span>Scalable Digital Solutions</span>
          </h1>
          <p>
            We combine modern technologies, AI-driven intelligence, and cloud infrastructure
            to build high-performance systems that drive real business outcomes.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card-ultra">

                <div className="card-content">

                  <div className="icon-wrap">
                    <s.icon size={26} />
                  </div>

                  <h3>{s.title}</h3>

                  <p className="desc">{s.desc}</p>

                  {/* <div className="tags">
                    {s.tags.map(t => <span key={t}>{t}</span>)}
                  </div> */}

                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ══════════════════════════════════════════════════════════════════════════
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (form.name && form.email) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="fade-in">
      <div className="page-hero">
        <h1>Contact Us</h1>
        <p>Let us tailor a service package that meets your needs.</p>
      </div>

      <section style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <div className="grid-2" style={{ alignItems: "start" }}>

          {/* Form */}
          <div>
            <h2 className="section-title left">Get in Touch</h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", fontFamily: "'Lora',serif", fontStyle: "italic", marginBottom: 32 }}>
              Tell us a little about your business, and we will get back to you with some ideas as soon as possible.
            </p>
            {sent ? (
              <div style={{ background: "#eef0fb", border: "1px solid #d0d4f5", borderRadius: 10, padding: "40px 32px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "#3B3FB5", fontSize: 18, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "#555", fontSize: 14 }}>We'll get back to you shortly.</p>
              </div>
            ) : (
              <div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3B3FB5", marginBottom: 20 }}>For Questions or Quotes</div>
                <input className="form-input" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <input className="form-input" placeholder="Email*" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                <textarea className="form-input" placeholder="How can we help?" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ resize: "vertical" }} />
                <button className="cta-btn" onClick={submit} style={{ width: "100%", padding: 15 }}>Send</button>
                {/* <p style={{ fontSize: 11, color: "#aaa", marginTop: 12, fontFamily: "'Montserrat',sans-serif" }}>
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a href="https://policies.google.com/privacy" style={{ color: "#aaa" }}>Privacy Policy</a> and{" "}
                  <a href="https://policies.google.com/terms" style={{ color: "#aaa" }}>Terms of Service</a> apply.
                </p> */}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h2 className="section-title left">Our Details</h2>
            {[
              {
                icon: "📍", label: "Address", content: <div style={{ fontSize: 15, lineHeight: 2.1, color: "#444" }}>Archery Technologies<br />66 , Jai Nagar extn
                  <br />2nd Main Street,                  Karumandapam
                  <br />Trichy</div>
              },
              { icon: "✉️", label: "Email", content: <a href="mailto:contact@archerytechnologies.com" style={{ fontSize: 15, color: "#3B3FB5", fontWeight: 600, fontFamily: "'Montserrat',sans-serif", textDecoration: "none" }}>contact@archerytechnologies.com</a> },
              {
                icon: "🕘", label: "Hours", content: (
                  <div>
                    {[["Monday – Friday", "9:00 am – 5:00 pm"], ["Saturday – Sunday", "Closed"]].map(([d, h]) => (
                      <div key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#444", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #e8eaf6" }}>
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>{d}</span>
                        <span style={{ color: h === "Closed" ? "#E53935" : "#3B3FB5", fontWeight: 700, fontFamily: "'Montserrat',sans-serif" }}>{h}</span>
                      </div>
                    ))}
                  </div>
                )
              },
            ].map(({ icon, label, content }) => (
              <div key={label} style={{ background: "#f7f7fd", borderRadius: 10, padding: "24px 28px", marginBottom: 18, border: "1px solid #e8eaf6" }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3B3FB5", marginBottom: 12 }}>{icon} {label}</div>
                {content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LeadershipPage() {
  return (
    <div className="fade-in">
      <div className="page-hero">
        <h1>Leadership Team</h1>
        <p>Meet the people driving our vision forward.</p>
      </div>
    </div>
  );
}



function BlogPage() {
  return (
    <div className="fade-in">
      <div className="page-hero">
        <h1>Blog</h1>
        <p>Latest insights and updates from our team.</p>
      </div>
    </div>
  );
}

function WebinarPage() {
  return (
    <div className="fade-in">
      <div className="page-hero">
        <h1>Webinars</h1>
        <p>Join our expert sessions and learn.</p>
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div className="fade-in">
      <div className="page-hero">
        <h1>Events</h1>
        <p>Explore our upcoming and past events.</p>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <style>{GLOBAL_CSS}</style>

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductRoute />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/webinar" element={<WebinarPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
        </Routes>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
