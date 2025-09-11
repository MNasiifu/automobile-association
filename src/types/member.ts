export interface Member {
  id: number;
  member_id: number;
  aa_member_no: number;
  surname: string;
  onames: string;
  paddress: string;
  email: string;
  tel: string;
  mobile: string;
  passport: string;
  raddress: string;
  street: string;
  pob: string;
  dob: string;
  licence: string;
  classes: string;
  e_date: string;
  pp_photo: string;
  p_date: string;
}

export interface CreateMemberData extends Omit<Member, 'id'> {
  id?: number; // Optional for creation as it might be auto-generated
}

export interface PendingIdpData {
  member_id: number;
  status: string;
  application_date: string;
  application_date_tz: string;
}

export interface CreateMemberResponse {
  data: Member | null;
  error: string | null;
}
