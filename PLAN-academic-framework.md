# PLAN: v0.0.4 Academic Framework

## Overview
v0.0.4 transforms the site into a "Proof of Authority" asset. We will implement high-fidelity interactive visualizations of Caden's tutoring and leadership methodology ("The Success Framework").

## Project Type: WEB
**Stack:** React, Tailwind, Framer Motion

## Success Criteria
- [ ] New `SuccessFramework.jsx` component implemented and interactive.
- [ ] Typography evolved to include **Crimson Pro** (Scholarly Serif).
- [ ] Branding utilizes **Gold (#F59E0B)** as a functional accent.
- [ ] All feedback from Manus (humanization + clarity) preserved/enhanced.

## File Structure Changes
- `src/components/SuccessFramework.jsx` [NEW]
- `src/data.js` [MODIFY] (Update schema)
- `src/index.css` [MODIFY] (Add Font/Gold utilities)
- `src/components/Sections.jsx` [MODIFY] (Integrate Framework)

## Task Breakdown

### Phase 1: Foundation & Data
| ID | Name | Agent | Skills | Priority |
|----|------|-------|--------|----------|
| 1.1 | Update `data.js` Schema | `backend-specialist` | clean-code | P0 |
| 1.2 | Setup Framework Assets | `frontend-specialist` | frontend-design | P1 |

### Phase 2: Success Framework Component
| ID | Name | Agent | Skills | Priority |
|----|------|-------|--------|----------|
| 2.1 | Build Core Framework Logic | `frontend-specialist` | react-best-practices | P0 |
| 2.2 | Implement "Pillar" Animations | `frontend-specialist` | frontend-design | P1 |

### Phase 3: Integration & Global Polish
| ID | Name | Agent | Skills | Priority |
|----|------|-------|--------|----------|
| 3.1 | Integrate Framework into Home | `frontend-specialist` | frontend-design | P0 |
| 3.2 | Typography Scholarly Swap | `frontend-specialist` | frontend-design | P1 |
| 3.3 | Final Design Audit (Manus-Compliant) | `performance-optimizer` | web-design-guidelines | P2 |

## Phase X: Verification
- [ ] `npm run build` succeeds
- [ ] `ux_audit.py` passes 85%+ score
- [ ] All links/CTAs lead to `BOOKING_URL` or correct internal anchors
- [ ] Custom cursor reflects new "Gold" hover states
