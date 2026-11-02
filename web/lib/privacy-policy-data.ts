export type PrivacyLanguage = "ko" | "en";

export interface PolicySectionItem {
  type: "paragraph" | "numbered-item" | "bullet-item";
  title?: string;
  text: string;
}

export interface PolicySection {
  number: number;
  title: string;
  paragraphs: (string | { subtitle?: string; body: string; items?: string[] })[];
  bullets?: string[];
}

export interface PolicyContactInfo {
  operator: string;
  service: string;
  country: string;
  email: string;
  website: string;
  copyright: string;
}

export interface PrivacyPolicyData {
  lang: PrivacyLanguage;
  title: string;
  subtitle: string;
  operator: string;
  effectiveDate: string;
  effectiveDateDisplay: string;
  sections: PolicySection[];
  contact: PolicyContactInfo;
}

export const KOREAN_PRIVACY_POLICY: PrivacyPolicyData = {
  lang: "ko",
  title: "개인정보처리방침",
  subtitle: "K SELECT NETWORK | Privacy Policy",
  operator: "Letusto Inc. (미국 법인)",
  effectiveDate: "2026-08-01",
  effectiveDateDisplay: "시행일: 2026년 8월 1일",
  sections: [
    {
      number: 1,
      title: "제1조. 총칙",
      paragraphs: [
        "K SELECT NETWORK(이하 “당사”)는 미국 법인 Letusto Inc.가 운영하는 한국 브랜드의 미국 시장 진출, 유통 네트워크 구축 및 비즈니스 파트너십 플랫폼입니다.",
        "당사는 개인정보의 보호를 중요하게 생각하며, 본 개인정보처리방침을 통해 개인정보의 수집, 이용, 보관, 제공 및 보호에 관한 기본 원칙을 안내합니다.",
        "본 방침은 K SELECT NETWORK 웹사이트와 관련 프로그램, 신청서 및 비즈니스 커뮤니케이션에 적용됩니다.",
      ],
    },
    {
      number: 2,
      title: "제2조. 수집하는 정보",
      paragraphs: [
        "당사는 서비스 운영에 필요한 범위에서 다음 정보를 수집하거나 처리할 수 있습니다.",
        {
          subtitle: "1. 기업 및 브랜드 정보:",
          body: "회사명, 브랜드명, 사업자등록 정보, 사업장 주소, 웹사이트, 판매채널 및 제품 관련 자료",
        },
        {
          subtitle: "2. 담당자 정보:",
          body: "성명, 직함, 이메일 주소, 전화번호 및 소속",
        },
        {
          subtitle: "3. 신청 및 거래 정보:",
          body: "프로그램 신청서, 상담 기록, 제출 자료, 계약 및 거래 관련 정보",
        },
        {
          subtitle: "4. 웹사이트 이용 정보:",
          body: "IP 주소, 접속 기록, 브라우저 정보, 쿠키 및 서비스 이용 기록",
        },
        {
          subtitle: "5. 공개 비즈니스 정보:",
          body: "공개적으로 제공되는 기업 및 담당자 관련 정보 중 법률과 정보 출처의 이용 조건에 따라 수집·이용이 허용되는 정보",
        },
        "당사는 업무상 필요한 범위를 넘어서는 개인정보의 제공을 요구하지 않습니다.",
      ],
    },
    {
      number: 3,
      title: "제3조. 개인정보 이용 목적",
      paragraphs: [
        "당사는 수집한 정보를 다음 목적에 사용할 수 있습니다.",
        {
          body: "1. 프로그램 신청 접수, 평가 및 파트너 선정\n2. 미국 시장 진출, 브랜드 마케팅 및 유통 협력 검토\n3. 제품 평가, 거래 상담, 계약 및 파트너 관리\n4. 서비스 안내, 문의 응대 및 비즈니스 커뮤니케이션\n5. 웹사이트 운영, 보안 관리 및 서비스 개선\n6. 법적 의무 준수, 권리 보호 및 분쟁 대응\n7. 적용 법률과 관련 수신거부 정책이 허용하는 범위의 비즈니스 및 마케팅 정보 제공",
          items: [
            "1. 프로그램 신청 접수, 평가 및 파트너 선정",
            "2. 미국 시장 진출, 브랜드 마케팅 및 유통 협력 검토",
            "3. 제품 평가, 거래 상담, 계약 및 파트너 관리",
            "4. 서비스 안내, 문의 응대 및 비즈니스 커뮤니케이션",
            "5. 웹사이트 운영, 보안 관리 및 서비스 개선",
            "6. 법적 의무 준수, 권리 보호 및 분쟁 대응",
            "7. 적용 법률과 관련 수신거부 정책이 허용하는 범위의 비즈니스 및 마케팅 정보 제공",
          ],
        },
        "프로그램 신청이나 문의 자체가 모든 마케팅 이메일에 대한 포괄적인 수신 동의를 의미하지는 않습니다.",
      ],
    },
    {
      number: 4,
      title: "제4조. 개인정보 보유 및 삭제",
      paragraphs: [
        "당사는 개인정보를 수집·이용 목적 달성에 필요한 기간 동안 보유합니다.",
        "보유 기간은 정보의 성격, 비즈니스 관계, 계약상 필요성, 법적 의무, 분쟁 가능성 및 합리적인 운영상 필요성을 고려하여 결정합니다.",
        "보유 필요성이 종료된 개인정보는 관련 법률 및 내부 관리 기준에 따라 삭제하거나 식별이 어려운 형태로 처리합니다.",
        "다만 법적 의무 이행, 분쟁 대응, 거래 기록 관리 및 수신거부 요청의 지속적인 반영 등에 필요한 정보는 적절한 범위에서 보유할 수 있습니다.",
      ],
    },
    {
      number: 5,
      title: "제5조. 개인정보 공유 및 외부 서비스 이용",
      paragraphs: [
        "당사는 개인정보를 사업 운영과 관련된 정당하고 필요한 목적 범위에서 처리합니다.",
        "다음과 같은 경우 관련 정보를 제공하거나 공유할 수 있습니다.",
        {
          body: "1. 프로그램 심사, 제품 검토, 유통 협력 또는 계약 이행을 위해 필요한 비즈니스 파트너와의 정보 공유\n2. 웹사이트 호스팅, 클라우드 저장, 이메일 발송, 고객지원, 보안 및 시스템 운영에 필요한 서비스 제공업체의 이용\n3. 법률상 요구, 적법한 정부기관의 요청 또는 당사의 권리와 안전을 보호하기 위한 정보 제공\n4. 합병, 사업 양도, 조직 개편 등 합법적인 기업 거래 과정에서 필요한 정보 처리",
          items: [
            "1. 프로그램 심사, 제품 검토, 유통 협력 또는 계약 이행을 위해 필요한 비즈니스 파트너와의 정보 공유",
            "2. 웹사이트 호스팅, 클라우드 저장, 이메일 발송, 고객지원, 보안 및 시스템 운영에 필요한 서비스 제공업체의 이용",
            "3. 법률상 요구, 적법한 정부기관의 요청 또는 당사의 권리와 안전을 보호하기 위한 정보 제공",
            "4. 합병, 사업 양도, 조직 개편 등 합법적인 기업 거래 과정에서 필요한 정보 처리",
          ],
        },
        "이러한 정보 공유는 적용 법률과 계약상 요구사항에 따라 이루어집니다.",
        "당사는 개인정보를 독립적인 제3자의 광고 목적을 위해 임의로 판매하지 않습니다.",
        "다만 특정 데이터 이용 또는 공유가 적용 법률상 “판매” 또는 “공유”에 해당하는 경우 관련 권리와 선택권을 제공합니다.",
      ],
    },
    {
      number: 6,
      title: "제6조. 국제적 개인정보 처리",
      paragraphs: [
        "Letusto Inc.는 미국에서 설립·운영되는 기업이며, K SELECT NETWORK의 주요 서버 및 데이터 처리 환경은 미국에 위치합니다.",
        "대한민국 등 미국 이외 지역의 이용자가 제공하는 정보는 미국으로 전송되어 처리·보관될 수 있습니다.",
        "당사는 적용되는 국가 및 지역의 개인정보 보호법과 국경 간 개인정보 처리 요건을 고려하여 관련 정보를 관리합니다.",
        "필요한 경우 별도의 고지, 동의 또는 보호조치를 시행합니다.",
      ],
    },
    {
      number: 7,
      title: "제7조. 이메일 마케팅 및 수신거부",
      paragraphs: [
        "당사는 프로그램 안내, 파트너십 제안 및 관련 비즈니스 정보를 이메일로 제공할 수 있습니다.",
        "상업적 이메일은 적용 법률에 따라 발송하며, 필요한 경우 수신거부 방법을 제공합니다.",
        "수신자는 이메일에 포함된 수신거부 링크 또는 support@kselectnetwork.com을 통해 마케팅 이메일 수신 중단을 요청할 수 있습니다.",
        "당사는 수신거부 요청을 관련 법률에 따라 처리합니다.",
        "수신거부의 재발 방지를 위해 필요한 최소한의 식별정보는 별도로 보관할 수 있습니다.",
        "서비스 운영, 계약 이행 또는 보안과 관련된 필수 안내는 마케팅 이메일과 구분하여 처리할 수 있습니다.",
      ],
    },
    {
      number: 8,
      title: "제8조. 쿠키 및 분석 기술",
      paragraphs: [
        "당사는 웹사이트의 정상적인 운영, 보안, 이용 환경 개선 및 서비스 분석을 위해 쿠키와 유사한 기술을 사용할 수 있습니다.",
        "이용자는 브라우저 설정을 통해 쿠키 사용을 제한할 수 있습니다.",
        "일부 기능은 쿠키 제한에 따라 영향을 받을 수 있습니다.",
        "분석 또는 광고 관련 기술의 사용에 추가적인 고지나 선택권이 필요한 경우 적용 법률에 따라 제공합니다.",
      ],
    },
    {
      number: 9,
      title: "제9조. 개인정보 보호",
      paragraphs: [
        "당사는 개인정보의 무단 접근, 유출, 변경 또는 오용을 방지하기 위해 합리적인 기술적·관리적 보호조치를 적용합니다.",
        "개인정보 접근은 업무상 필요한 범위로 제한하고, 외부 서비스 제공업체와의 정보 처리에서도 적절한 보호 수준을 고려합니다.",
        "다만 어떠한 인터넷 기반 시스템도 절대적인 보안을 보장할 수 없으며, 당사는 적용 법률상 의무를 전제로 합리적인 보호조치를 지속적으로 검토합니다.",
      ],
    },
    {
      number: 10,
      title: "제10조. 이용자의 권리",
      paragraphs: [
        "이용자는 적용 법률에서 정하는 범위 내에서 다음 사항을 요청할 수 있습니다.",
      ],
      bullets: [
        "개인정보 열람 및 정정",
        "개인정보 삭제",
        "관련 처리에 대한 이의 제기 또는 제한",
        "마케팅 이메일 수신거부",
        "기타 적용 법률에서 인정하는 개인정보 관련 권리",
      ],
    },
    {
      number: 11,
      title: "제11조. 아동의 개인정보",
      paragraphs: [
        "당사 서비스는 기업 및 비즈니스 담당자를 대상으로 하며, 13세 미만 아동을 대상으로 하지 않습니다.",
        "당사는 13세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.",
        "해당 정보가 수집된 사실을 확인하면 관련 법률에 따라 조치합니다.",
      ],
    },
    {
      number: 12,
      title: "제12조. 방침 변경",
      paragraphs: [
        "당사는 법률, 서비스 또는 운영 방식의 변경에 따라 본 개인정보처리방침을 개정할 수 있습니다.",
        "변경된 방침은 웹사이트에 게시하며, 중요한 변경사항에 대해서는 적용 법률에 따라 필요한 안내 또는 조치를 제공합니다.",
      ],
    },
    {
      number: 13,
      title: "제13조. 문의처",
      paragraphs: [
        "본 개인정보처리방침 또는 개인정보 보호와 관련된 문의는 아래 연락처로 접수해 주시기 바랍니다.",
      ],
    },
  ],
  contact: {
    operator: "Letusto Inc.",
    service: "K SELECT NETWORK",
    country: "United States of America",
    email: "support@kselectnetwork.com",
    website: "https://www.kselectnetwork.com",
    copyright: "© 2026 Letusto Inc. All rights reserved.",
  },
};

export const ENGLISH_PRIVACY_POLICY: PrivacyPolicyData = {
  lang: "en",
  title: "Privacy Policy",
  subtitle: "K SELECT NETWORK | Operated by Letusto Inc.",
  operator: "Letusto Inc., a U.S. company",
  effectiveDate: "2026-08-01",
  effectiveDateDisplay: "Effective Date: August 1, 2026",
  sections: [
    {
      number: 1,
      title: "1. Introduction",
      paragraphs: [
        "K SELECT NETWORK (“we,” “us,” or “our”) is operated by Letusto Inc., a United States company providing business development, U.S. market entry, distribution network development, and partnership services for Korean brands and other business partners.",
        "We value the privacy of individuals who interact with our services.",
        "This Privacy Policy describes how we collect, use, retain, disclose, and protect personal information.",
        "This Policy applies to the K SELECT NETWORK website, related programs, applications, and business communications.",
      ],
    },
    {
      number: 2,
      title: "2. Information We Collect",
      paragraphs: [
        "We may collect and process information reasonably necessary for our business operations, including:",
        {
          subtitle: "1. Company and Brand Information:",
          body: "Company name, brand name, business registration details, business address, website, sales channels, and product-related materials.",
        },
        {
          subtitle: "2. Business Contact Information:",
          body: "Name, job title, email address, telephone number, and company affiliation.",
        },
        {
          subtitle: "3. Application and Transaction Information:",
          body: "Program applications, inquiries, consultation records, submitted documents, contracts, and business transaction information.",
        },
        {
          subtitle: "4. Website and Technical Information:",
          body: "IP address, access logs, browser information, cookies, and website usage data.",
        },
        {
          subtitle: "5. Publicly Available Business Information:",
          body: "Information about companies and business contacts, to the extent its collection and use are permitted by applicable law and source restrictions.",
        },
        "We seek to limit the collection of personal information to what is reasonably relevant to our business purposes.",
      ],
    },
    {
      number: 3,
      title: "3. How We Use Information",
      paragraphs: [
        "We may use information for the following purposes:",
        {
          body: "1. Reviewing program applications and evaluating prospective partners.\n2. Assessing U.S. market entry, brand marketing, and distribution opportunities.\n3. Conducting product evaluations, business consultations, contract administration, and partner management.\n4. Responding to inquiries and providing business communications and service updates.\n5. Operating, securing, analyzing, and improving our website and services.\n6. Complying with legal obligations, protecting our rights, and resolving disputes.\n7. Providing relevant business and marketing communications where permitted by applicable law and subject to applicable opt-out requirements.",
          items: [
            "1. Reviewing program applications and evaluating prospective partners.",
            "2. Assessing U.S. market entry, brand marketing, and distribution opportunities.",
            "3. Conducting product evaluations, business consultations, contract administration, and partner management.",
            "4. Responding to inquiries and providing business communications and service updates.",
            "5. Operating, securing, analyzing, and improving our website and services.",
            "6. Complying with legal obligations, protecting our rights, and resolving disputes.",
            "7. Providing relevant business and marketing communications where permitted by applicable law and subject to applicable opt-out requirements.",
          ],
        },
        "Submitting an application or inquiry does not automatically constitute blanket consent to receive all marketing communications.",
      ],
    },
    {
      number: 4,
      title: "4. Information Retention and Deletion",
      paragraphs: [
        "We retain personal information for as long as reasonably necessary to fulfill the purposes for which it was collected.",
        "Retention periods depend on the nature of the information, our business relationships, contractual requirements, legal obligations, potential disputes, and legitimate operational needs.",
        "When information is no longer required, we delete or de-identify it in accordance with applicable law and our internal retention practices.",
        "We may retain information where reasonably necessary for legal compliance, dispute resolution, transaction records, and maintaining suppression records to honor marketing opt-out requests.",
      ],
    },
    {
      number: 5,
      title: "5. Disclosure and Service Providers",
      paragraphs: [
        "We may disclose information when reasonably necessary for legitimate business operations, including:",
        {
          body: "1. Sharing relevant information with business partners for program evaluation, product assessment, distribution partnerships, or contractual performance.\n2. Engaging service providers for website hosting, cloud storage, email delivery, customer support, security, and technology operations.\n3. Responding to applicable legal obligations, lawful governmental requests, or protecting our rights and safety.\n4. Supporting lawful corporate transactions, including mergers, acquisitions, reorganizations, or business transfers.",
          items: [
            "1. Sharing relevant information with business partners for program evaluation, product assessment, distribution partnerships, or contractual performance.",
            "2. Engaging service providers for website hosting, cloud storage, email delivery, customer support, security, and technology operations.",
            "3. Responding to applicable legal obligations, lawful governmental requests, or protecting our rights and safety.",
            "4. Supporting lawful corporate transactions, including mergers, acquisitions, reorganizations, or business transfers.",
          ],
        },
        "Such disclosures are subject to applicable legal and contractual requirements.",
        "We do not intentionally sell personal information to independent third parties for their own advertising purposes.",
        "Where a particular use or disclosure constitutes a “sale” or “sharing” under applicable privacy laws, we will provide any required notices and rights.",
      ],
    },
    {
      number: 6,
      title: "6. International Data Processing",
      paragraphs: [
        "Letusto Inc. is established and operated in the United States.",
        "The primary servers and data processing infrastructure supporting K SELECT NETWORK are located in the United States.",
        "Information submitted by individuals in South Korea or other jurisdictions may be transferred to, processed in, and stored in the United States.",
        "We consider applicable privacy laws and cross-border data transfer requirements and implement additional notices, consents, or safeguards where legally required.",
      ],
    },
    {
      number: 7,
      title: "7. Email Marketing and Opt-Out",
      paragraphs: [
        "We may send program information, partnership proposals, and relevant business communications by email.",
        "Commercial email communications are sent subject to applicable laws and include an opt-out mechanism where required.",
        "Recipients may opt out of marketing emails through the unsubscribe link in applicable messages or by contacting support@kselectnetwork.com.",
        "We process opt-out requests in accordance with applicable law.",
        "We may retain limited identifying information necessary to prevent further unwanted marketing messages.",
        "Essential service, contractual, or security-related communications may be handled separately from marketing communications.",
      ],
    },
    {
      number: 8,
      title: "8. Cookies and Analytics",
      paragraphs: [
        "We may use cookies and similar technologies to support website functionality, security, user experience, and service analytics.",
        "Users may manage or restrict cookies through their browser settings.",
        "Certain website features may be affected by these settings.",
        "Where additional notices or choices are required for analytics or advertising technologies, we provide them in accordance with applicable law.",
      ],
    },
    {
      number: 9,
      title: "9. Data Security",
      paragraphs: [
        "We implement reasonable technical and organizational measures designed to protect personal information against unauthorized access, disclosure, alteration, or misuse.",
        "We seek to restrict access to individuals and systems with a legitimate business need and consider appropriate safeguards when using external service providers.",
        "However, no internet-based system can guarantee absolute security.",
        "Our security practices are maintained and evaluated in light of applicable legal obligations and reasonable business requirements.",
      ],
    },
    {
      number: 10,
      title: "10. Your Privacy Rights",
      paragraphs: [
        "Depending on applicable law, individuals may have rights to:",
      ],
      bullets: [
        "Access and correct their personal information.",
        "Request deletion of personal information.",
        "Object to or restrict certain processing activities.",
        "Opt out of marketing communications.",
        "Exercise other privacy rights recognized by applicable law.",
      ],
    },
    {
      number: 11,
      title: "11. Children's Privacy",
      paragraphs: [
        "Our services are intended for businesses and professional contacts and are not directed to children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13.",
        "If we become aware of such collection, we will take appropriate steps in accordance with applicable law.",
      ],
    },
    {
      number: 12,
      title: "12. Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy to reflect changes in applicable laws, our services, or our business practices.",
        "Updates will be posted on our website.",
        "Where required by applicable law, we will provide additional notice or take other appropriate measures regarding material changes.",
      ],
    },
    {
      number: 13,
      title: "13. Contact Information",
      paragraphs: [
        "For questions or requests concerning this Privacy Policy or personal information handling, please contact us at:",
      ],
    },
  ],
  contact: {
    operator: "Letusto Inc.",
    service: "K SELECT NETWORK",
    country: "United States of America",
    email: "support@kselectnetwork.com",
    website: "https://www.kselectnetwork.com",
    copyright: "© 2026 Letusto Inc. All rights reserved.",
  },
};
