import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { contact, meetingHref } from "@/lib/content";
import { pillAccent, pillOutlineDark } from "../ui";

export function ApplyCta() {
  const reduce = useReducedMotion();

  const englishTextParts = [
    { text: "LET US", highlight: true },
    { text: " BUILD THE MARKET ", highlight: false },
    { text: "TO", highlight: true },
    { text: "GETHER", highlight: false },
  ];

  const englishChars = englishTextParts.flatMap((part) =>
    part.text.split("").map((char) => ({
      char,
      highlight: part.highlight,
    }))
  );

  const koreanText = "제품은 브랜드가 만듭니다. 미국 시장은 함께 만듭니다.";
  const koreanChars = koreanText.split("");

  const sentenceVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.03,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.08, ease: "easeOut" },
    },
  };

  const koreanSentenceVariants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0 : 1.1,
        staggerChildren: reduce ? 0 : 0.04,
      },
    },
  };

  return (
    <section id="apply" className="mt-36 bg-ink text-ivory">
      <div className="shell pt-[clamp(72px,9vw,128px)] pb-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-1 items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          <div className="flex flex-col justify-end min-h-[140px] sm:min-h-[160px]">
            <p className="micro-label mb-6 text-dark-label">
              Apply — K-Beauty Growth Program
            </p>
            <motion.h2
              variants={sentenceVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="font-serif-latin m-0 text-[clamp(21px,2.2vw,32px)] font-bold tracking-tight leading-snug text-ivory/95"
            >
              {englishChars.map((item, idx) => (
                <motion.span
                  key={idx}
                  variants={charVariants}
                  className={item.highlight ? "text-accent" : ""}
                >
                  {item.char}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              variants={koreanSentenceVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="body-kr mt-4 mb-0 text-[clamp(15px,1.6vw,20px)] font-medium leading-relaxed text-dark-body"
            >
              {koreanChars.map((char, idx) => (
                <motion.span key={idx} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </div>
          <div>
            <p className="body-kr mt-0 mb-8 text-[17px] text-dark-body">
              자가진단 6문항은 3분이면 끝납니다. 조건을 충족하면 바로 신청서로
              연결됩니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#eligibility" className={pillAccent}>
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
