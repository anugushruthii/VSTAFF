// ---- Edit site content here ------------------------------------------------

export const APK_URL = "/downloads/vstaff-1.0.0.apk";
export const APK_META = "Android · v1.0.0 · 72 MB";
export const LINKEDIN = "https://www.linkedin.com/company/vstaff-built-to-earn/";
export const INSTAGRAM="https://www.instagram.com/_vstaff_?stkn=MTNweHhmajc3YWZrdA%3D%3D&utm_source=qr"
export const EMAIL2="srp.vstaff@gmail.com"
export const EMAIL1="hr@vstaffcore.com"
export const CONTACT1="9652910585"
export const CONTACT2="7386181540"
export const CONTACT3="9866312341"




export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  // { label: "How It Works", href: "#how" },
  // { label: "Opportunities", href: "#deliver" },
  // { label: "VStaff App", href: "#app" },
  { label: "Partners", href: "#partners" },
  // { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const steps = [
  { key: "download", icon: "📲", title: "Download", text: "Download the VStaff app." },
  { key: "register", icon: "🪪", title: "Register", text: "Create your delivery partner profile and complete the required verification." },
  { key: "find", icon: "📡", title: "Find opportunities", text: "View available delivery opportunities through the app." },
  { key: "accept", icon: "✅", title: "Accept", text: "Choose an available delivery opportunity." },
  { key: "pickup", icon: "📦", title: "Pick up", text: "Go to the assigned store or pickup location and collect the order." },
  { key: "deliver", icon: "🛵", title: "Deliver", text: "Deliver the order safely to the customer's location." },
  { key: "earn", icon: "💰", title: "Earn", text: "Complete the delivery and receive your applicable earnings." },
];

export const deliverables = [
  { icon: "🥦", label: "Fruits & Vegetables" },
  { icon: "🛒", label: "Groceries" },
  { icon: "🏪", label: "Supermarket Orders" },
  { icon: "📦", label: "Retail Products" },
  { icon: "🏠", label: "Household Essentials" },
  { icon: "🛍️", label: "Everyday Products" },
];

export const whyItems = [
  { icon: "📱", title: "One Simple App", text: "Access and manage delivery opportunities through the VStaff app." },
  { icon: "🛵", title: "Delivery Opportunities", text: "Discover available delivery work through the platform." },
  { icon: "⏰", title: "Flexibility", text: "Work according to your availability and applicable platform requirements." },
  { icon: "📍", title: "Local Opportunities", text: "Access delivery opportunities available in your operating area." },
  { icon: "💰", title: "Earning Opportunities", text: "Turn completed deliveries into earning opportunities." },
  { icon: "🚀", title: "Grow With VStaff", text: "Become part of a growing delivery network." },
];

export const journey = ["Join", "Verify", "Start", "Find orders", "Pick up", "Deliver", "Earn"];

// Add the real logo file to /public/partners/ and set `logo` to use it,
// e.g. { name: "Zepto", logo: "/partners/zepto.svg" }.
// Only list platforms VStaff has confirmed to show publicly.
export const partners = [
  { name: "BigBasket", logo:"/bigbasket.png"},
  { name: "Rebel Foods",logo:"/rebelfoods.png" },
  { name: "Apollo",logo:"/apollo.jpeg" },
  { name: "Flipkart Minutes",logo:"/flipkartminutes.png"},
  { name: "Zepto",logo:"/zepto.jpeg" },
  { name: "Tata 1mg" ,logo:"/tata1mg.png"},
  { name: "Instamart",logo:"/instamart.jpeg" },
  { name: "uEngage" ,logo:"/uengage.png"},
];

// Add real rider stories here: { name, area, quote }
// While this list is empty, the section shows an invitation instead.
export const stories = [];

export const faqs = [
  { q: "How can I become a VStaff delivery partner?", a: "Download the VStaff app, create your delivery partner profile and complete the required verification. Once verified, you can start viewing delivery opportunities." },
  { q: "How do I download the VStaff app?", a: "Use the Download App button on this page to get the Android app (APK). Open the downloaded file on your phone and follow the install steps. You may need to allow installs from your browser or file manager." },
  { q: "What documents are required?", a: "The documents needed are listed inside the app during registration, so you can see exactly what to submit before you finish verifying." },
  { q: "How do I receive delivery opportunities?", a: "Once you are verified, available deliveries appear in the app. You choose the ones you want to accept." },
  { q: "Where can I make deliveries?", a: "Opportunities depend on your operating area and on which stores and platforms are active there. The app shows what is available near you." },
  { q: "What types of products can I deliver?", a: "Everyday essentials such as fruits and vegetables, groceries, supermarket orders, retail products and household items." },
  { q: "How are my earnings calculated?", a: "Earnings depend on the delivery opportunity and applicable platform terms. Details are shown in the app, and the Rider Terms explain the rules." },
  { q: "How do I contact VStaff support?", a: "Reach out through the Rider Support link in the footer or message us on LinkedIn." },
];

export const footerCols = [
  { title: "Quick links", links: [["Home", "#home"], ["About Us", "#about"],["VStaff App", "#app"]] },
  { title: "Delivery partners", links: [["Join VStaff", "#join"], ["Download App", APK_URL]] },
  { title: "Legal", links: [ ["Privacy Policy", "/privacy"],["Terms & Conditions", "/terms"]] },
  {
    title: "Contact Us",
    links: [
      ["9652910585", "tel:9652910585"],
      ["7386181540", "tel:7386181540"],
      ["9866312341", "tel:9866312341"],
    ],
  },
  {
    title: "Email",
    links: [
      ["hr@vstaffcore.com", "mailto:hr@vstaffcore.com"],
      ["srp.vstaff@gmail.com", "mailto:srp.vstaff@gmail.com"],
    ],
  },
  { title: "Follow us", links: [["LinkedIn", LINKEDIN],["Instagram", INSTAGRAM] ] }
];
