import React from "react";
import "./terms.css";

const Terms = () => {
  return (
    <div className="footer_content">
      <h1>Canada Visa Terms of Services</h1>
      <h3 className="">Application Process</h3>
      <span className="">
        Applicants must provide accurate and complete information during the
        application process. This includes submitting required documents such as
        passports, photographs, and biometrics (fingerprints and photos).
        Misrepresentation or submission of false information can lead to
        application refusal, legal consequences, or a ban from future
        applications.
      </span>

      <h3 className="">Privacy and Data Protection</h3>
      <span>
        The Government of Canada is committed to protecting personal information
        under the Privacy Act. Applicants are informed about how their data will
        be used, including its transfer to relevant authorities for processing.
        Personal information collected is used solely for the purpose of
        processing the visa application and ensuring compliance with Canadian
        immigration laws.
      </span>

      <h3 className=""> Eligibility and Compliance</h3>
      <span>
        Applicants must ensure they meet the eligibility criteria for the visa
        type they are applying for, such as visitor, study, or work permits.
        They are also responsible for understanding the conditions of their stay
        in Canada, including the duration of their visit and any restrictions.
        Failure to comply with these conditions may result in penalties or
        removal from Canada.
      </span>
      <h3 className="">Role of Visa Application Centers (VACs)</h3>
      <span>
        Visa Application Centers (VACs), operated by third-party service
        providers like VFS Global, assist in the application process by
        collecting documents and biometrics. However, VACs are not agents of the
        Government of Canada and are not involved in the decision-making
        process. Applicants must consent to the collection and transfer of their
        personal information to VACs for processing.
      </span>
      <h3 className="">Entry Requirements</h3>
      <span>
        Upon arrival in Canada, border services officers verify the applicant's
        identity and documents. Applicants must meet all entry requirements,
        including demonstrating ties to their home country, such as a job,
        family, or financial assets, to ensure they will return after their
        authorized stay. Failure to meet these requirements may result in denial
        of entry.
      </span>
      <h3 className="">Legal and Administrative Notices</h3>
      <span>
        The terms of service also include legal disclaimers and administrative
        notices. For example, the Government of Canada is not responsible for
        delays caused by incomplete applications or external factors. Applicants
        are encouraged to review the terms and conditions provided by
        Immigration, Refugees and Citizenship Canada (IRCC) for detailed
        information.
      </span>
    </div>
  );
};

export default Terms;
