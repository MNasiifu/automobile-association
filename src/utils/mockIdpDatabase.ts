// Mock IDP Database for demonstration purposes
// This simulates a real database lookup with predefined test cases

export interface MockIdpRecord {
  idpNumber: string;
  status: "valid" | "invalid" | "expired" | "suspended";
  holderName?: string;
  issueDate?: string;
  expiryDate?: string;
  licenseNumber?: string;
  membershipType: "AA Member" | "Non-Member";
  validityStatus?: string;
  countries?: string[];
  type?: string;
  issuingAuthority?: string;
}

// Predefined test cases for demonstration
const mockDatabase: Record<string, MockIdpRecord> = {
  // Valid IDPs
  "UG2024001234": {
    idpNumber: "UG2024001234",
    status: "valid",
    holderName: "John Doe Mukasa",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-14",
    licenseNumber: "UG/DL/123456/2023",
    membershipType: "AA Member",
    validityStatus: "Active and Valid",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
    countries: [
      "Kenya", "Tanzania", "Rwanda", "South Sudan", "Congo DR", "Burundi",
      "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "Tunisia",
      "Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"
    ]
  },
  "UG2024005678": {
    idpNumber: "UG2024005678",
    status: "valid",
    holderName: "Sarah Nakato Aisha",
    issueDate: "2024-03-10",
    expiryDate: "2025-03-09",
    licenseNumber: "UG/DL/789012/2023",
    membershipType: "Non-Member",
    validityStatus: "Active and Valid",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
    countries: [
      "Kenya", "Tanzania", "Rwanda", "South Sudan", "Congo DR", "Burundi",
      "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "Tunisia",
      "Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"
    ]
  },
  "UG2023009876": {
    idpNumber: "UG2023009876",
    status: "valid",
    holderName: "Robert Ssemujju",
    issueDate: "2023-06-20",
    expiryDate: "2024-06-19",
    licenseNumber: "UG/DL/345678/2022",
    membershipType: "AA Member",
    validityStatus: "Active and Valid",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
    countries: [
      "Kenya", "Tanzania", "Rwanda", "South Sudan", "Congo DR", "Burundi",
      "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "Tunisia",
      "Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"
    ]
  },

  // Expired IDPs
  "UG2022001111": {
    idpNumber: "UG2022001111",
    status: "expired",
    holderName: "Grace Namuwonge",
    issueDate: "2022-12-01",
    expiryDate: "2023-11-30",
    licenseNumber: "UG/DL/111111/2021",
    membershipType: "AA Member",
    validityStatus: "Expired",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
  },
  "UG2021005555": {
    idpNumber: "UG2021005555",
    status: "expired",
    holderName: "Moses Kiggundu",
    issueDate: "2021-08-15",
    expiryDate: "2022-08-14",
    licenseNumber: "UG/DL/555555/2020",
    membershipType: "Non-Member",
    validityStatus: "Expired",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
  },

  // Suspended IDPs
  "UG2024002222": {
    idpNumber: "UG2024002222",
    status: "suspended",
    holderName: "David Okello",
    issueDate: "2024-02-01",
    expiryDate: "2025-01-31",
    licenseNumber: "UG/DL/222222/2023",
    membershipType: "Non-Member",
    validityStatus: "Suspended - Contact AA Uganda",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
  },
  "UG2023007777": {
    idpNumber: "UG2023007777",
    status: "suspended",
    holderName: "Patricia Atim",
    issueDate: "2023-11-10",
    expiryDate: "2024-11-09",
    licenseNumber: "UG/DL/777777/2022",
    membershipType: "AA Member",
    validityStatus: "Suspended - License Issues",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
  },

  // Test cases for common demo purposes
  "MEMBER123": {
    idpNumber: "MEMBER123",
    status: "valid",
    holderName: "AA Member Demo",
    issueDate: "2024-01-01",
    expiryDate: "2025-12-31",
    licenseNumber: "UG/DL/MEMBER/2023",
    membershipType: "AA Member",
    validityStatus: "Active and Valid",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
    countries: [
      "Kenya", "Tanzania", "Rwanda", "South Sudan", "Congo DR", "Burundi",
      "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "Tunisia",
      "Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"
    ]
  },
  "EXPIRING123": {
    idpNumber: "EXPIRING123",
    status: "valid",
    holderName: "Expires Soon Demo",
    issueDate: "2024-10-01",
    expiryDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 15); // Expires in 15 days
      return date.toISOString().split('T')[0];
    })(),
    licenseNumber: "UG/DL/EXPIRING/2023",
    membershipType: "AA Member",
    validityStatus: "Active and Valid",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
    countries: [
      "Kenya", "Tanzania", "Rwanda", "South Sudan", "Congo DR", "Burundi",
      "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "Tunisia",
      "Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"
    ]
  },
  "TODAYEXP123": {
    idpNumber: "TODAYEXP123",
    status: "valid",
    holderName: "Expires Today Demo",
    issueDate: "2024-09-15",
    expiryDate: new Date().toISOString().split('T')[0], // Expires today
    licenseNumber: "UG/DL/TODAYEXP/2023",
    membershipType: "Non-Member",
    validityStatus: "Active and Valid",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
    countries: [
      "Kenya", "Tanzania", "Rwanda", "South Sudan", "Congo DR", "Burundi",
      "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "Tunisia",
      "Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"
    ]
  },
  "NONMEMBER123": {
    idpNumber: "NONMEMBER123",
    status: "valid",
    holderName: "Non-Member Demo",
    issueDate: "2024-01-01",
    expiryDate: "2024-12-31",
    licenseNumber: "UG/DL/NONMEMBER/2023",
    membershipType: "Non-Member",
    validityStatus: "Active and Valid",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
    countries: [
      "Kenya", "Tanzania", "Rwanda", "South Sudan", "Congo DR", "Burundi",
      "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "Tunisia",
      "Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"
    ]
  },
  "EXPIRED123": {
    idpNumber: "EXPIRED123",
    status: "expired",
    holderName: "Expired Demo",
    issueDate: "2022-01-01",
    expiryDate: "2022-12-31",
    licenseNumber: "UG/DL/EXPIRED/2021",
    membershipType: "AA Member",
    validityStatus: "Expired",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
  },
  "SUSPENDED123": {
    idpNumber: "SUSPENDED123",
    status: "suspended",
    holderName: "Suspended Demo",
    issueDate: "2024-01-01",
    expiryDate: "2024-12-31",
    licenseNumber: "UG/DL/SUSPENDED/2023",
    membershipType: "Non-Member",
    validityStatus: "Suspended",
    type: "1968 Vienna Convention IDP",
    issuingAuthority: "Automobile Association of Uganda",
  }
};

export class MockIdpVerificationService {
  /**
   * Simulates IDP verification lookup in AA Uganda database
   * @param idpNumber The IDP number to verify
   * @returns Promise resolving to verification result or null if not found
   */
  static async verifyIdp(idpNumber: string): Promise<MockIdpRecord | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Normalize the input
    const normalizedIdpNumber = idpNumber.trim().toUpperCase();
    
    // Direct lookup in mock database
    const record = mockDatabase[normalizedIdpNumber];
    
    if (record) {
      return { ...record };
    }
    
    // Pattern-based fallback for demonstration (when exact match not found)
    // This provides a more realistic experience for arbitrary inputs
    return this.generateFallbackResult(normalizedIdpNumber);
  }

  /**
   * Generates a fallback result for IDP numbers not in the predefined database
   * This simulates real-world behavior where most queries would be valid but unknown
   */
  private static generateFallbackResult(idpNumber: string): MockIdpRecord | null {
    // Check if it follows basic Uganda IDP pattern (UG followed by year and numbers)
    const ugIdpPattern = /^UG\d{4}\d+$/;
    
    if (!ugIdpPattern.test(idpNumber)) {
      // Invalid format - return null (not found)
      return null;
    }

    // Extract year from pattern
    const yearMatch = idpNumber.match(/^UG(\d{4})/);
    const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    
    // Determine status based on year
    let status: "valid" | "expired" | "invalid" = "valid";
    let expiryDate = `${year + 1}-12-31`;
    
    if (year < currentYear - 1) {
      status = "expired";
    } else if (year > currentYear + 1) {
      status = "invalid";
      return null; // Future dates are invalid
    }

    // Generate realistic demo data
    const holderNames = [
      "James Mukasa", "Mary Nakato", "Peter Ssemujju", "Grace Namuwonge",
      "Robert Kiggundu", "Sarah Atim", "David Okello", "Patricia Nambi"
    ];
    
    const randomName = holderNames[Math.floor(Math.random() * holderNames.length)];
    const membershipType: "AA Member" | "Non-Member" = Math.random() > 0.6 ? "AA Member" : "Non-Member";
    
    return {
      idpNumber,
      status,
      holderName: randomName,
      issueDate: `${year}-01-15`,
      expiryDate,
      licenseNumber: `UG/DL/${Math.floor(Math.random() * 999999)}/${year - 1}`,
      membershipType,
      validityStatus: status === "valid" ? "Active and Valid" : "Expired",
      type: "1968 Vienna Convention IDP",
      issuingAuthority: "Automobile Association of Uganda",
      countries: status === "valid" ? [
        "Kenya", "Tanzania", "Rwanda", "South Sudan", "Congo DR", "Burundi",
        "South Africa", "Nigeria", "Ghana", "Egypt", "Morocco", "Tunisia",
        "Germany", "France", "United Kingdom", "Italy", "Spain", "Netherlands"
      ] : undefined
    };
  }

  /**
   * Gets all predefined test cases for demonstration purposes
   */
  static getTestCases(): { description: string; idpNumber: string; expectedStatus: string }[] {
    return [
      { description: "Valid AA Member IDP", idpNumber: "UG2024001234", expectedStatus: "valid" },
      { description: "Valid Non-Member IDP", idpNumber: "UG2024005678", expectedStatus: "valid" },
      { description: "Expires in 15 Days", idpNumber: "EXPIRING123", expectedStatus: "expires-soon" },
      { description: "Expires Today", idpNumber: "TODAYEXP123", expectedStatus: "expires-today" },
      { description: "Expired IDP", idpNumber: "UG2022001111", expectedStatus: "expired" },
      { description: "Suspended IDP", idpNumber: "UG2024002222", expectedStatus: "suspended" },
      { description: "Demo: AA Member", idpNumber: "MEMBER123", expectedStatus: "valid" },
      { description: "Demo: Non-Member", idpNumber: "NONMEMBER123", expectedStatus: "valid" },
      { description: "Demo: Expired", idpNumber: "EXPIRED123", expectedStatus: "expired" },
      { description: "Demo: Suspended", idpNumber: "SUSPENDED123", expectedStatus: "suspended" },
    ];
  }
}

export default MockIdpVerificationService;
