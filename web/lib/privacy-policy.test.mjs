import { test } from "node:test";
import assert from "node:assert/strict";
import {
  KOREAN_PRIVACY_POLICY,
  ENGLISH_PRIVACY_POLICY,
} from "./privacy-policy-data.ts";

function sectionContainsText(section, text) {
  return section.paragraphs.some((p) => {
    if (typeof p === "string") return p.includes(text);
    if (p.body && p.body.includes(text)) return true;
    if (p.subtitle && p.subtitle.includes(text)) return true;
    if (p.items && p.items.some((i) => i.includes(text))) return true;
    return false;
  });
}

test("KBGP-WEB-PRIVACY-001: Privacy Policy Content & Integrity Verification", async (t) => {
  await t.test("1. Basic Metadata & Effective Date Verification", () => {
    // Korean
    assert.equal(KOREAN_PRIVACY_POLICY.lang, "ko");
    assert.equal(KOREAN_PRIVACY_POLICY.title, "개인정보처리방침");
    assert.equal(KOREAN_PRIVACY_POLICY.subtitle, "K SELECT NETWORK | Privacy Policy");
    assert.equal(KOREAN_PRIVACY_POLICY.operator, "Letusto Inc. (미국 법인)");
    assert.equal(KOREAN_PRIVACY_POLICY.effectiveDate, "2026-08-01");
    assert.equal(KOREAN_PRIVACY_POLICY.effectiveDateDisplay, "시행일: 2026년 8월 1일");

    // English
    assert.equal(ENGLISH_PRIVACY_POLICY.lang, "en");
    assert.equal(ENGLISH_PRIVACY_POLICY.title, "Privacy Policy");
    assert.equal(ENGLISH_PRIVACY_POLICY.subtitle, "K SELECT NETWORK | Operated by Letusto Inc.");
    assert.equal(ENGLISH_PRIVACY_POLICY.operator, "Letusto Inc., a U.S. company");
    assert.equal(ENGLISH_PRIVACY_POLICY.effectiveDate, "2026-08-01");
    assert.equal(ENGLISH_PRIVACY_POLICY.effectiveDateDisplay, "Effective Date: August 1, 2026");
  });

  await t.test("2. Exact 13 Sections Structure Verification in both languages", () => {
    assert.equal(KOREAN_PRIVACY_POLICY.sections.length, 13);
    assert.equal(ENGLISH_PRIVACY_POLICY.sections.length, 13);

    // Verify each section number matches
    for (let i = 1; i <= 13; i++) {
      assert.equal(KOREAN_PRIVACY_POLICY.sections[i - 1].number, i);
      assert.equal(ENGLISH_PRIVACY_POLICY.sections[i - 1].number, i);
    }

    // Verify section titles
    assert.match(KOREAN_PRIVACY_POLICY.sections[0].title, /제1조\. 총칙/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[1].title, /제2조\. 수집하는 정보/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[2].title, /제3조\. 개인정보 이용 목적/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[3].title, /제4조\. 개인정보 보유 및 삭제/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[4].title, /제5조\. 개인정보 공유 및 외부 서비스 이용/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[5].title, /제6조\. 국제적 개인정보 처리/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[6].title, /제7조\. 이메일 마케팅 및 수신거부/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[7].title, /제8조\. 쿠키 및 분석 기술/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[8].title, /제9조\. 개인정보 보호/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[9].title, /제10조\. 이용자의 권리/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[10].title, /제11조\. 아동의 개인정보/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[11].title, /제12조\. 방침 변경/);
    assert.match(KOREAN_PRIVACY_POLICY.sections[12].title, /제13조\. 문의처/);

    assert.match(ENGLISH_PRIVACY_POLICY.sections[0].title, /1\. Introduction/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[1].title, /2\. Information We Collect/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[2].title, /3\. How We Use Information/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[3].title, /4\. Information Retention and Deletion/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[4].title, /5\. Disclosure and Service Providers/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[5].title, /6\. International Data Processing/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[6].title, /7\. Email Marketing and Opt-Out/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[7].title, /8\. Cookies and Analytics/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[8].title, /9\. Data Security/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[9].title, /10\. Your Privacy Rights/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[10].title, /11\. Children's Privacy/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[11].title, /12\. Changes to This Policy/);
    assert.match(ENGLISH_PRIVACY_POLICY.sections[12].title, /13\. Contact Information/);
  });

  await t.test("3. Contact Information & Prohibited Address Check", () => {
    // Both must use support@kselectnetwork.com
    assert.equal(KOREAN_PRIVACY_POLICY.contact.email, "support@kselectnetwork.com");
    assert.equal(ENGLISH_PRIVACY_POLICY.contact.email, "support@kselectnetwork.com");

    assert.equal(KOREAN_PRIVACY_POLICY.contact.operator, "Letusto Inc.");
    assert.equal(ENGLISH_PRIVACY_POLICY.contact.operator, "Letusto Inc.");

    assert.equal(KOREAN_PRIVACY_POLICY.contact.service, "K SELECT NETWORK");
    assert.equal(ENGLISH_PRIVACY_POLICY.contact.service, "K SELECT NETWORK");

    assert.equal(KOREAN_PRIVACY_POLICY.contact.website, "https://www.kselectnetwork.com");
    assert.equal(ENGLISH_PRIVACY_POLICY.contact.website, "https://www.kselectnetwork.com");

    assert.equal(KOREAN_PRIVACY_POLICY.contact.copyright, "© 2026 Letusto Inc. All rights reserved.");
    assert.equal(ENGLISH_PRIVACY_POLICY.contact.copyright, "© 2026 Letusto Inc. All rights reserved.");

    // Critical Requirement: Do NOT display a business street address on this Privacy Policy page
    const koFullJson = JSON.stringify(KOREAN_PRIVACY_POLICY);
    const enFullJson = JSON.stringify(ENGLISH_PRIVACY_POLICY);

    // Ensure no specific street address patterns appear
    assert.equal(koFullJson.includes("123 Main"), false);
    assert.equal(koFullJson.includes("Fort Lee"), false);
    assert.equal(koFullJson.includes("Ridgefield"), false);
    assert.equal(koFullJson.includes("New Jersey 07"), false);

    assert.equal(enFullJson.includes("123 Main"), false);
    assert.equal(enFullJson.includes("Fort Lee"), false);
    assert.equal(enFullJson.includes("Ridgefield"), false);
    assert.equal(enFullJson.includes("New Jersey 07"), false);
  });

  await t.test("4. Approved Key Clauses & Verbatim Phrases", () => {
    // Korean Article 1
    assert.ok(
      sectionContainsText(
        KOREAN_PRIVACY_POLICY.sections[0],
        "K SELECT NETWORK(이하 “당사”)는 미국 법인 Letusto Inc.가 운영하는 한국 브랜드의 미국 시장 진출"
      )
    );

    // Korean Article 3 clause
    assert.ok(
      sectionContainsText(
        KOREAN_PRIVACY_POLICY.sections[2],
        "프로그램 신청이나 문의 자체가 모든 마케팅 이메일에 대한 포괄적인 수신 동의를 의미하지는 않습니다."
      )
    );

    // Korean Article 5 sale clause
    assert.ok(
      sectionContainsText(
        KOREAN_PRIVACY_POLICY.sections[4],
        "당사는 개인정보를 독립적인 제3자의 광고 목적을 위해 임의로 판매하지 않습니다."
      )
    );

    // English Section 1
    assert.ok(
      sectionContainsText(
        ENGLISH_PRIVACY_POLICY.sections[0],
        'K SELECT NETWORK (“we,” “us,” or “our”) is operated by Letusto Inc., a United States company'
      )
    );

    // English Section 3 clause
    assert.ok(
      sectionContainsText(
        ENGLISH_PRIVACY_POLICY.sections[2],
        "Submitting an application or inquiry does not automatically constitute blanket consent to receive all marketing communications."
      )
    );

    // English Section 5 sale clause
    assert.ok(
      sectionContainsText(
        ENGLISH_PRIVACY_POLICY.sections[4],
        "We do not intentionally sell personal information to independent third parties for their own advertising purposes."
      )
    );
  });
});
