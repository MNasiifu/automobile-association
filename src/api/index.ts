import supabase from "../utils/superbaseClient";
import type { CreateMemberData, CreateMemberResponse, PendingIdpData } from "../types/member";


/**
 * Validates member data before creation
 * @param memberData - The member data to validate
 * @returns Object containing validation result and errors if any
 */
export const validateMemberData = (memberData: CreateMemberData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Required field validations
    if (!memberData.surname) errors.push('Surname is required');
    if (!memberData.onames) errors.push('Other names are required');
    if (!memberData.email) errors.push('Email is required');
    if (!memberData.mobile) errors.push('Mobile number is required');
    if (!memberData.dob) errors.push('Date of birth is required');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (memberData.email && !emailRegex.test(memberData.email)) {
        errors.push('Invalid email format');
    }

    // Date validation
    if (memberData.dob && isNaN(Date.parse(memberData.dob))) {
        errors.push('Invalid date of birth format');
    }

    if (memberData.e_date && isNaN(Date.parse(memberData.e_date))) {
        errors.push('Invalid expiry date format');
    }

    if (memberData.p_date && isNaN(Date.parse(memberData.p_date))) {
        errors.push('Invalid photo date format');
    }

    // Phone number validation (basic)
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (memberData.mobile && !phoneRegex.test(memberData.mobile)) {
        errors.push('Invalid mobile number format');
    }

    if (memberData.tel && !phoneRegex.test(memberData.tel)) {
        errors.push('Invalid telephone number format');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const getAAUMemberByNumber = async (memberNumber: number) => {
    try {
        const response = await supabase
        .from('aau_member')
        .select('*')
        .eq('aa_member_no', memberNumber)
        .limit(1)
        .single(); // Use single() since we expect only one result

        return response;
    } catch (error) {
        throw new Error(`Error fetching member by number: ${error}`);
    }
};

/**
 * Creates a new member in the member table
 * @param memberData - The member data to be inserted
 * @param pendingIdpData - Optional pending IDP data to be inserted
 * @returns Promise containing the created member data or error
 */
export const applyForIdp = async (
    memberData: CreateMemberData, 
    pendingIdpData: PendingIdpData
) => {
    try {
        // Validate data before insertion
        const validation = validateMemberData(memberData);
        if (!validation.isValid) {
            return {
                data: null,
                error: `Validation failed: ${validation.errors.join(', ')}`
            };
        }

        const { data, error } = await supabase.rpc('create_member_with_pending_idp', {
            member_data: memberData,
            pending_idp_data: pendingIdpData
        });

        if (error || (data && data[0]?.error_message)) {
            return {
                data: null,
                error: error?.message || data[0]?.error_message || 'Idp application failed'
            };
        }
    } catch (error) {
        return {
            data: null,
            error: `Error creating member: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
};