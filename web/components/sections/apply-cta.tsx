import Link from "next/link";
import { contact, meetingHref } from "@/lib/content";
import { pillAccent, pillOutlineDark } from "../ui";

export function ApplyCta() {
  return (
    <section id="apply" className="mt-36 bg-ink text-ivory">
      <div className="shell pt-[clamp(72px,9vw,128px)] pb-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-1 items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          <div>
            <p className="micro-label mb-8 text-dark-label">
              Apply — K-Beauty Growth Program
            </p>
            <h2 className="display-kr m-0 text-[clamp(34px,3.9vw,56px)] tracking-[-0.045em]">
              역할을 나누면
              <br />
              진출은 운영이 됩니다.
            </h2>
          </div>
          <div>
            <p className="body-kr mt-0 mb-8 text-[17px] text-dark-body">
              자가진단 6문항은 3분이면 끝납니다. 조건을 충족하면 바로 신청서로
              연결됩니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/apply/check" className={pillAccent}>
                자가진단 시작
              </Link>
              <a href={meetingHref} className={pillOutlineDark}>
                미팅 예약
              </a>
            </div>
            <p className="body-kr mt-7 text-sm text-dark-body">
              {contact.name} ·{" "}
              <a
                href={`mailto:${contact.email}`}
                className="underline decoration-hairline-dark decoration-2 underline-offset-4 hover:text-ivory"
              >
                {contact.email}
              </a>{" "}
              · {contact.phone}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
