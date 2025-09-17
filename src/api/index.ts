import supabase from "../utils/superbaseClient";
import { secureLog, validateOrigin, API_CONFIG } from "../utils/securityConfig";
import { validateUgandaPhoneNumber } from "../utils/phoneValidation";
import type {
  CreateMemberData,
  IdpDocument,
  PendingIdpData,
  IdpVerificationResponse,
  verifyIdpResultProp,
  AauMember,
} from "../types/member";

/**
 * Response interface for AAU member queries
 */
export interface AAUMemberResponse {
  data: AauMember | null;
  error: string | null;
}

/**
 * Enhanced fetch wrapper for Supabase Edge Functions that handles CORS properly
 * @param functionName - Name of the edge function
 * @param requestBody - Request body to send
 * @param accessToken - Optional access token for authentication
 * @returns Promise with response data
 */
export const callSupabaseEdgeFunction = async (
  functionName: string,
  requestBody: any,
  accessToken?: string | null
) => {
  // Validate origin before making requests
  if (!validateOrigin()) {
    const error = `Invalid origin: ${window.location.origin}. This request is not allowed from the current domain.`;
    secureLog.error(error);
    throw new Error(error);
  }

  const supabaseUrl = API_CONFIG.supabaseUrl;
  const edgeFunctionUrl = `${supabaseUrl}/functions/v1/${functionName}`;

  secureLog.info(`Making request to ${functionName}:`, edgeFunctionUrl);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "apikey": API_CONFIG.supabaseKey,
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      // Use 'same-origin' to ensure proper CORS headers are sent
      // This will make the browser include the Origin header automatically
      credentials: 'same-origin',
      // Explicitly set mode to 'cors' to trigger CORS preflight when needed
      mode: 'cors',
    });

    secureLog.info(`${functionName} response status:`, response.status);

    if (!response.ok) {
      const errorText = await response.text();
      secureLog.error(`${functionName} HTTP Error Response:`, errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    secureLog.debug(`Response from ${functionName}:`, data);

    // Check if the edge function returned an error in the response body
    if (data && data.error) {
      secureLog.error(`${functionName} returned error:`, data.error);
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    secureLog.error(`${functionName} error:`, error);
    throw error;
  }
};

/**
 * Validates member data before creation
 * @param memberData - The member data to validate
 * @returns Object containing validation result and errors if any
 */
export const validateMemberData = (
  memberData: CreateMemberData
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validations
  if (!memberData.surname) errors.push("Surname is required");
  if (!memberData.onames) errors.push("Other names are required");
  if (!memberData.email) errors.push("Email is required");
  if (!memberData.mobile) errors.push("Mobile number is required");
  if (!memberData.dob) errors.push("Date of birth is required");

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (memberData.email && !emailRegex.test(memberData.email)) {
    errors.push("Invalid email format");
  }

  // Date validation
  if (memberData.dob && isNaN(Date.parse(memberData.dob))) {
    errors.push("Invalid date of birth format");
  }

  if (memberData.e_date && isNaN(Date.parse(memberData.e_date))) {
    errors.push("Invalid expiry date format");
  }

  if (memberData.p_date && isNaN(Date.parse(memberData.p_date))) {
    errors.push("Invalid photo date format");
  }

  // Phone number validation (Uganda format)
  if (memberData.mobile) {
    const mobileValidation = validateUgandaPhoneNumber(memberData.mobile);
    if (!mobileValidation.isValid) {
      errors.push(`Invalid mobile number: ${mobileValidation.error}`);
    }
  }

  if (memberData.tel) {
    const telValidation = validateUgandaPhoneNumber(memberData.tel);
    if (!telValidation.isValid) {
      errors.push(`Invalid telephone number: ${telValidation.error}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// ===== AAU MEMBER MANAGEMENT FUNCTIONS =====

/**
 * Retrieves an AAU member by their membership number
 * @param memberNumber - The AA membership number to search for
 * @returns Promise containing member data or error
 */
export const getAAUMemberByNumber = async (memberNumber: number): Promise<AAUMemberResponse> => {
  try {
    // Validate input parameter with robust number validation
    if (!Number.isFinite(memberNumber) || !Number.isInteger(memberNumber) || memberNumber <= 0) {
      return {
        data: null,
        error: "Member number must be a valid positive integer",
      };
    }

    // Log the member lookup attempt for security auditing
    secureLog.info(`AAU member lookup request for number: ${memberNumber}`);

    // Query the aau_member table
    const { data, error } = await supabase
      .from("aau_member")
      .select("*")
      .eq("aa_member_no", memberNumber)
      .maybeSingle(); // Use maybeSingle() to handle not found case gracefully

    if (error) {
      secureLog.error(`Database error fetching member ${memberNumber}:`, error);
      return {
        data: null,
        error: `Database error: ${error.message}`,
      };
    }

    if (!data) {
      secureLog.info(`No member found with number: ${memberNumber}`);
      return {
        data: null,
        error: `No member found with AA membership number: ${memberNumber}`,
      };
    }

    secureLog.info(`Successfully retrieved member: ${memberNumber}`);
    return {
      data: data as AauMember,
      error: null,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    secureLog.error(`Unexpected error fetching member ${memberNumber}:`, error);
    
    return {
      data: null,
      error: `Error retrieving member: ${errorMessage}`,
    };
  }
};

/**
 * Checks if a member exists by their membership number
 * @param memberNumber - The AA membership number to check
 * @returns Promise containing boolean result or error
 */
export const checkAAUMemberExists = async (memberNumber: number): Promise<{ exists: boolean; error: string | null }> => {
  try {
    const result = await getAAUMemberByNumber(memberNumber);
    
    if (result.error && !result.error.includes("No member found")) {
      // If there's a database error, return the error
      return {
        exists: false,
        error: result.error,
      };
    }
    
    return {
      exists: result.data !== null,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    secureLog.error(`Error checking member existence for ${memberNumber}:`, error);
    
    return {
      exists: false,
      error: `Error checking member existence: ${errorMessage}`,
    };
  }
};

/**
 * Verifies an International Driving Permit (IDP) by its number
 * @param idpNumber - The IDP number to verify (must be a number)
 * @returns Promise containing IDP verification data or error
 */
export const verifyIdp = async (idpNumber: number): Promise<IdpVerificationResponse> => {
  try {
    // Validate input parameter
    if (!idpNumber || typeof idpNumber !== 'number') {
      return {
        data: null,
        error: "IDP number must be a valid number",
      };
    }

    // Log the verification attempt for security auditing
    secureLog.info(`IDP verification request for number: ${idpNumber}`);

    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token ?? null;

    // Prepare the request body to match the edge function's expected structure
    const requestBody = {
      idpNumber,
    };

    const response: verifyIdpResultProp = await callSupabaseEdgeFunction(
      "verify-idp",
      requestBody,
      accessToken
    );

    return {
      data: response,
      error: null
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    secureLog.error(`IDP verification failed for number ${idpNumber}:`, error);
    
    return {
      data: null,
      error: `Error verifying IDP: ${errorMessage}`,
    };
  }
};

/**
 * Creates a new member in the member table
 * @param memberData - The member data to be inserted
 * @param pendingIdpData - Optional pending IDP data to be inserted
 * @param idpDocuments - IDP documents containing base64 encoded files
 * @returns Promise containing the created member data or error
 */
export const applyForIdp = async (
  memberData: CreateMemberData,
  pendingIdpData: PendingIdpData,
  idpDocuments: IdpDocument
) => {
  try {
    // Validate data before insertion
    const validation = validateMemberData(memberData);
    if (!validation.isValid) {
      return {
        data: null,
        error: `Validation failed: ${validation.errors.join(", ")}`,
      };
    }

    // Get local session to extract access token
    const { data: sessionData, error: sessionErr } =
      await supabase.auth.getSession();
    if (sessionErr) {
      console.warn("Session error:", sessionErr);
    }

    const accessToken = sessionData?.session?.access_token ?? null;

    // Prepare the request body to match the edge function's expected structure
    const requestBody = {
      member_data: memberData,
      pending_idp_data: pendingIdpData,
      visa_pdf_base64: idpDocuments.visa_pdf_base64,
      passport_pdf_base64: idpDocuments.passport_pdf_base64,
      passport_photo_base64: idpDocuments.passport_photo_base64,
    };

    // Use enhanced fetch wrapper for CORS-compatible edge function calls
    try {
      const response = await callSupabaseEdgeFunction(
        "upload-idp-docs",
        requestBody,
        accessToken
      );

      const { rpc } = response;
      if (rpc[0].error_message) {
        console.error("Edge function call failed:", rpc[0].error_message);
        return {
          data: null,
          error: `Failed to process IDP application: ${rpc[0].error_message}`,
        };
      }

      return {
        data: response,
        error: null,
      };
    } catch (fetchError) {
      console.error("Edge function call failed:", fetchError);
      return {
        data: null,
        error: `Failed to process IDP application: ${
          fetchError instanceof Error ? fetchError.message : "Unknown error"
        }`,
      };
    }
  } catch (error) {
    console.error("Unexpected error in applyForIdp:", error);
    return {
      data: null,
      error: `Error creating member: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};
