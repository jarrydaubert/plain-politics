---
name: accessibility
version: 1.1.0
description: When discussing accessibility, WCAG compliance, screen readers, keyboard navigation, a11y audits, or inclusive design. Politics Platform targets WCAG 2.2 AA compliance.
---

# Accessibility for Politics Platform

You are an accessibility expert. Your goal is to ensure Politics Platform is usable by everyone, regardless of ability, meeting WCAG 2.2 AA standards.

## Politics Platform Context

**Target Standard:** WCAG 2.2 AA
**Key Challenges:** Compare tables with multi-party data, live source status, evidence drawers, charts, maps, and interactive policy timelines
**Testing:** axe-core in E2E tests
## WCAG 2.2 AA Checklist

### 1. Perceivable

#### 1.1 Text Alternatives
- [ ] All images have meaningful `alt` text
- [ ] Decorative images use `alt=""` or `aria-hidden="true"`
- [ ] Icons have accessible labels
- [ ] Charts have text alternatives

#### 1.3 Adaptable
- [ ] Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Form inputs have associated labels
- [ ] Tables have headers and captions

#### 1.4 Distinguishable
- [ ] Color contrast ≥4.5:1 for normal text
- [ ] Color contrast ≥3:1 for large text (18pt+)
- [ ] Color contrast ≥3:1 for UI components
- [ ] Information not conveyed by color alone
- [ ] Text resizable to 200% without loss
- [ ] No horizontal scroll at 320px width

### 2. Operable

#### 2.1 Keyboard Accessible
- [ ] All functionality via keyboard
- [ ] No keyboard traps
- [ ] Logical tab order
- [ ] Skip link to main content
- [ ] Visible focus indicators
- [ ] Custom components keyboard operable

#### 2.4 Navigable
- [ ] Descriptive page `<title>`
- [ ] Descriptive link text (not "click here")
- [ ] Headings describe content
- [ ] Focus indicator visible (2px+ outline)

#### 2.5 Input Modalities
- [ ] Touch targets ≥44x44px
- [ ] Motion activation can be disabled

### 3. Understandable

#### 3.1 Readable
- [ ] Page language specified (`<html lang="en-GB">`)

#### 3.2 Predictable
- [ ] Consistent navigation
- [ ] No unexpected context changes

#### 3.3 Input Assistance
- [ ] Errors clearly identified
- [ ] Error messages descriptive
- [ ] Labels for all inputs
- [ ] Error prevention for important actions

### 4. Robust

#### 4.1 Compatible
- [ ] Valid HTML
- [ ] ARIA used correctly
- [ ] Custom components have proper roles
- [ ] Status messages use `aria-live`

## Compare View Accessibility

### Party Comparison Table
```html
<!-- Party comparison table -->
<table aria-label="Party positions on housing policy">
  <caption class="sr-only">
    Side-by-side comparison of party positions on housing
  </caption>
  <thead>
    <tr>
      <th scope="col">Policy Area</th>
      <th scope="col">Labour</th>
      <th scope="col">Conservative</th>
      <th scope="col">Liberal Democrat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Social Housing</th>
      <td>Build 1.5m homes</td>
      <td>Right to Buy expansion</td>
      <td>10 new garden cities</td>
    </tr>
  </tbody>
</table>
```

## Live Updates And Status Messages

### Dynamic Status Region
```html
<!-- Announce dynamic source, lookup, or progress updates -->
<div aria-live="polite" aria-atomic="false" role="status">
  <!-- Freshness, lookup, or starter-path updates appear here -->
</div>
<div aria-live="assertive" role="alert">
  <!-- Errors that block the current task appear here -->
</div>
```

## Source Citation Links

### Descriptive Citation Links
```html
<!-- Citations must be descriptive, not "click here" -->
<a href="https://legislation.gov.uk/..." aria-label="View Housing Act 2004 on legislation.gov.uk">
  Housing Act 2004, Section 3
</a>
```

## Policy Timeline

### Timeline Navigation
```html
<div role="group" aria-label="Policy version history">
  <button aria-pressed="true">Current (2025)</button>
  <button aria-pressed="false">Previous (2024)</button>
  <button aria-pressed="false">Original (2023)</button>
</div>
```
## ARIA Patterns

### Landmarks
```html
<header role="banner">
<nav role="navigation" aria-label="Main">
<main role="main">
<footer role="contentinfo">
```

### Expandable Sections
```html
<button
  aria-expanded="false"
  aria-controls="advanced-options"
>
  Advanced options
</button>
<div id="advanced-options" hidden>
  <!-- Options content -->
</div>
```

### Error States
```html
<input
  aria-invalid="true"
  aria-errormessage="error-msg"
/>
<span id="error-msg" role="alert">
  Please enter a valid search query
</span>
```

### Loading States
```html
<div aria-busy="true" aria-live="polite">
  Calculating your results...
</div>
```

## Testing Approaches

### Automated (axe-core)
```typescript
// e2e/accessibility-wcag22.spec.ts
import AxeBuilder from '@axe-core/playwright';

test('calculator is accessible', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

### Manual Testing Checklist
1. **Keyboard only:** Tab through entire page
2. **Screen reader:** Test with VoiceOver (Mac) or NVDA (Windows)
3. **Zoom:** Test at 200% and 400% zoom
4. **High contrast:** Windows high contrast mode
5. **Reduced motion:** `prefers-reduced-motion: reduce`
6. **Mobile:** Touch target sizes

### Screen Reader Testing Script
```
1. Navigate to homepage
2. Verify page title announced
3. Tab to search input
4. Enter query, verify hint read
5. Tab to results area
6. Verify results announced
7. Navigate results and citations
8. Verify all values accessible
```

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Missing form labels | Add `<label>` with `for` attribute |
| Low contrast | Use OKLCH with sufficient lightness difference |
| No focus indicator | Add `:focus-visible` outline style |
| Results not announced | Add `aria-live="polite"` region |
| Table not navigable | Add `scope` to header cells |
| Touch target too small | Minimum 44x44px clickable area |

## CSS Considerations

### Focus Styles
```css
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

### High Contrast Support
```css
@media (prefers-contrast: more) {
  :root {
    --border-color: CanvasText;
    --focus-ring: Highlight;
  }
}
```

## Key Files

- `src/app/layout.tsx` - Language (`en-GB`), skip link
- Components for My Area, Glossary, Parliament, Sources, Compare, and Policy views - landmarks and ARIA
- E2E accessibility tests

### Accessibility Guardrails
- Prioritize shipped flows first (home, my-area lookup, glossary, parliament, sources, and starter path)
- Keep decorative icons hidden from screen readers with `aria-hidden="true"`
- Any new interactive control must be keyboard operable and have visible focus styles
- Source links must have descriptive text (cite the law/document name, not "source" or "link")
- Dynamic source, lookup, or progress updates must use `aria-live` regions when screen readers need to hear them
