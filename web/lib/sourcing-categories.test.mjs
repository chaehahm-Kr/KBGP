import test from "node:test";
import assert from "node:assert/strict";
import { categories, categoryNote } from "./content.ts";

test("KBGP-WEB-PORTFOLIO-001: Category Allocation Verification", async (t) => {
  await t.test("1. Total categories count and exact 100% sum", () => {
    assert.equal(categories.length, 6, "Must have exactly 6 categories");
    const totalShare = categories.reduce((sum, c) => sum + c.share, 0);
    assert.equal(totalShare, 100, `Total share must equal 100% (got ${totalShare}%)`);
  });

  await t.test("2. Exact percentage allocations", () => {
    const expected = [
      { label: "K-스킨케어", share: 50 },
      { label: "K-헤어케어", share: 20 },
      { label: "K-메이크업", share: 10 },
      { label: "K-바디케어", share: 10 },
      { label: "K-퍼스널케어", share: 5 },
      { label: "K-뷰티툴", share: 5 },
    ];

    expected.forEach((exp, idx) => {
      assert.equal(categories[idx].label, exp.label, `Index ${idx} label must be ${exp.label}`);
      assert.equal(categories[idx].share, exp.share, `${exp.label} share must be ${exp.share}%`);
    });
  });

  await t.test("3. Donut chart segment math verification", () => {
    const R = 70;
    const CIRC = 2 * Math.PI * R;

    const segments = categories.map((cat, i) => ({
      len: (cat.share / 100) * CIRC,
      offset: categories
        .slice(0, i)
        .reduce((sum, prev) => sum + (prev.share / 100) * CIRC, 0),
    }));

    // Check Skincare (50%)
    assert.equal(segments[0].len, 0.5 * CIRC, "K-Skincare length must be exactly half the circle");
    assert.equal(segments[0].offset, 0, "K-Skincare offset must start at 0");

    // Check Haircare (20%)
    assert.equal(segments[1].len, 0.2 * CIRC, "K-Haircare length must be 20% of circle");
    assert.equal(segments[1].offset, 0.5 * CIRC, "K-Haircare offset must be 50% of circle");

    // Total length of all segments
    const totalLen = segments.reduce((sum, s) => sum + s.len, 0);
    assert.ok(Math.abs(totalLen - CIRC) < 0.0001, "Total segment length must equal circle circumference");
  });

  await t.test("4. Representative items and note preservation", () => {
    assert.ok(categories[0].items.includes("클렌징"), "Skincare items preserved");
    assert.ok(categories[1].items.includes("샴푸"), "Haircare items preserved");
    assert.ok(categoryNote.includes("위 비율은 초기 소싱 포트폴리오의 목표 구성"), "Category note preserved");
  });
});
