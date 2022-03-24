interface ContactInfoRow {
  contactType: string; // 'waitlist' or 'posdev'
  contactTs: number; // Submission timestamp
  contactData: ContactInfoDataPosDev | ContactInfoDataWaitlist;
}
