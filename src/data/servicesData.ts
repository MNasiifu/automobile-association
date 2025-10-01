// Services data for AA Uganda
// Each service now includes a route property for navigation

/**
 * Route Mappings:
 * - fleet-management -> /services/fleet-management
 * - vehicle-valuation -> /services/vehicle-valuation  
 * - rescue-services -> /services/rescue-services
 * - driving-school -> /driving-school/about
 * - automotive-advisory -> /services/automotive-advisory
 * - membership-benefits -> /membership
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: "rescue" | "driving" | "insurance" | "advisory";
  image?: string;
  route: string;
}

export const services: Service[] = [
  {
    id: "fleet-management",
    title: "Fleet Management Solutions",
    description:
      "Comprehensive fleet management and vehicle tracking solutions for businesses across Uganda. Monitor, protect, and optimize your fleet operations with advanced GPS tracking and analytics.",
    icon: "DirectionsCar",
    category: "advisory",
    features: [
      "Real-time GPS Vehicle Tracking",
      "24/7 Theft Recovery Services",
      "Driver Behavior Monitoring",
      "Route Optimization & Planning",
      "Maintenance Scheduling",
      "Fuel Management & Analytics",
      "Comprehensive Fleet Reporting",
      "Mobile App Access",
    ],
    image: "/images/fleet-management.jpg",
    route: "/services/fleet-management",
  },
  {
    id: "vehicle-valuation",
    title: "Vehicle Valuation & Inspection Services",
    description:
      "Comprehensive vehicle valuation and inspection services combining independent market assessments with thorough safety inspections. Expert evaluations for insurance, sales, finance, fleet management, legal purposes, and regulatory compliance.",
    icon: "Assessment",
    category: "advisory",
    features: [
      "Pre-Insurance Valuations",
      "Market Value Assessments",
      "Technical Brief Valuations",
      "Accident Damage Assessment",
      "Fleet Valuation Solutions",
      "Pre-purchase Inspections",
      "Annual Safety Inspections",
      "Insurance Claim Inspections",
      "Comprehensive Inspection Reports",
      "VIN Verification & Documentation",
      "Expert Recommendations",
      "Compliance Certification",
      "Expert Follow-up Support",
    ],
    image: "/images/vehicle-valuation.jpg",
    route: "/services/vehicle-valuation",
  },
  {
    id: "rescue-services",
    title: "Rescue Services",
    description:
      "Our comprehensive rescue services provide rapid response across Uganda with 30+ rescue vehicles strategically positioned nationwide.",
    icon: "BuildCircle",
    category: "rescue",
    features: [
      "24/7 Emergency Response",
      "30+ Rescue Vehicles Nationwide",
      "Professional Trained Staff",
      "GPS Tracking for Quick Location",
      "Towing and Recovery Services",
      "On-site Mechanical Assistance",
      "Battery Jump Start",
      "Fuel Delivery Service",
    ],
    image: "/images/rescue-service.jpg",
    route: "/services/rescue-services",
  },
  {
    id: "driving-school",
    title: "Professional Driving School",
    description:
      "Get comprehensive Class B driver training with both practical and theory lessons. Our full package includes 4 weeks of practical training and a 3-year driver's license. Contact Ms. Robina at +256 782 756287 for inquiries.",
    icon: "School",
    category: "driving",
    features: [
      "Class B License Training",
      "Both Automatic & Manual Cars",
      "4 Weeks Practical Training",
      "3-Year Driver's License Included",
      "Theory and Practical Classes",
      "Professional Instructors",
      "Modern Training Vehicles",
      "Courses Coming Soon...",
    ],
    image: "/images/driving-school.jpg",
    route: "/driving-school/about",
  },
  {
    id: "automotive-advisory",
    title: "Automotive Advisory",
    description:
      "Expert automotive advice and consultation services to help you make informed decisions about your vehicle.",
    icon: "SupportAgent",
    category: "advisory",
    features: [
      "Vehicle Purchase Advice",
      "Maintenance Recommendations",
      "Technical Consultations",
      "Road Safety Guidelines",
      "Fuel Efficiency Tips",
      "Vehicle Valuation Services",
    ],
    image: "/images/advisory.jpg",
    route: "/services/automotive-advisory",
  },
  {
    id: "membership-benefits",
    title: "Membership Benefits",
    description:
      "Exclusive benefits and services available to AA Uganda members, providing value and peace of mind.",
    icon: "CardMembership",
    category: "advisory",
    features: [
      "Priority Rescue Response",
      "Discounted Services",
      "Free Vehicle Inspections",
      "Member-only Events",
      "Technical Helpline",
      "Travel Assistance",
      "Partner Discounts",
    ],
    image: "/images/membership.jpg",
    route: "/membership",
  },
];

export const serviceCategories = [
  {
    id: "rescue",
    name: "Rescue Services",
    description: "Emergency roadside assistance and recovery",
    icon: "BuildCircle",
  },
  {
    id: "driving",
    name: "Driving Education",
    description: "Professional driving instruction and training",
    icon: "School",
  },
  {
    id: "insurance",
    name: "Insurance Solutions",
    description: "Comprehensive motor insurance coverage",
    icon: "Security",
  },
  {
    id: "advisory",
    name: "Advisory Services",
    description: "Expert automotive consultation and advice",
    icon: "SupportAgent",
  },
];

export default {
  services,
  serviceCategories,
};
