# Bug Documentation

This document catalogs all bugs and issues found in the Solace candidate assignment codebase.

## Critical Bugs

### 1. HTML Structure Error - Hydration Mismatch
**Location:** `src/app/page.tsx` (lines 60-68)

**Issue:**
```tsx
<thead>
  <th>First Name</th>
  <th>Last Name</th>
  <th>City</th>
  ...
</thead>
```

**Problem:** `<th>` elements are direct children of `<thead>`, but according to HTML spec, `<th>` must be wrapped in a `<tr>` element.

**Impact:** 
- Causes React hydration errors
- Invalid HTML structure
- Console warnings in browser

**Fix:** Wrap `<th>` elements in a `<tr>`:
```tsx
<thead>
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    ...
  </tr>
</thead>
```

---

### 2. Missing React Keys
**Location:** `src/app/page.tsx` (line 70)

**Issue:**
```tsx
{filteredAdvocates.map((advocate) => {
  return (
    <tr>
      <td>{advocate.firstName}</td>
      ...
    </tr>
  );
})}
```

**Problem:** `<tr>` elements in a `.map()` need a unique `key` prop.

**Impact:**
- Console warnings
- React may not update lists correctly during re-renders
- Potential performance issues

**Fix:** Add `key` prop:
```tsx
{filteredAdvocates.map((advocate) => {
  return (
    <tr key={advocate.id}>
      <td>{advocate.firstName}</td>
      ...
    </tr>
  );
})}
```

**Additional Note:** The advocate data may not have an `id` field. Need to verify the data structure.

---

### 3. Missing React Keys (Nested)
**Location:** `src/app/page.tsx` (line 78)

**Issue:**
```tsx
<td>
  {advocate.specialties.map((s) => (
    <div>{s}</div>
  ))}
</td>
```

**Problem:** Nested `.map()` also missing `key` prop on `<div>` elements.

**Impact:** Same as bug #2

**Fix:** Add `key` prop using index or specialty name:
```tsx
{advocate.specialties.map((s, index) => (
  <div key={index}>{s}</div>
))}
```

---

## Logic Bugs

### 4. Incorrect Search Logic
**Location:** `src/app/page.tsx` (lines 25-34)

**Issue:**
```tsx
const filteredAdvocates = advocates.filter((advocate) => {
  return (
    advocate.firstName.includes(searchTerm) ||
    advocate.lastName.includes(searchTerm) ||
    advocate.city.includes(searchTerm) ||
    advocate.degree.includes(searchTerm) ||
    advocate.specialties.includes(searchTerm) ||
    advocate.yearsOfExperience.includes(searchTerm)
  );
});
```

**Problems:**
- `advocate.specialties` is an array, but `.includes(searchTerm)` treats it as a string
- `advocate.yearsOfExperience` is a number, but `.includes()` is a string method

**Impact:**
- Search functionality broken for specialties and years of experience
- Runtime type errors

**Fix:**
```tsx
const filteredAdvocates = advocates.filter((advocate) => {
  const searchLower = searchTerm.toLowerCase();
  return (
    advocate.firstName.toLowerCase().includes(searchLower) ||
    advocate.lastName.toLowerCase().includes(searchLower) ||
    advocate.city.toLowerCase().includes(searchLower) ||
    advocate.degree.toLowerCase().includes(searchLower) ||
    advocate.specialties.some(s => s.toLowerCase().includes(searchLower)) ||
    advocate.yearsOfExperience.toString().includes(searchTerm)
  );
});
```

---

### 5. Case-Sensitive Search
**Location:** `src/app/page.tsx` (lines 27-32)

**Issue:** All `.includes()` calls are case-sensitive.

**Impact:** Poor user experience - users must match exact case

**Fix:** See bug #4 above for case-insensitive solution

---

## Anti-Patterns

### 6. Direct DOM Manipulation
**Location:** `src/app/page.tsx` (line 22)

**Issue:**
```tsx
document.getElementById("search-term").innerHTML = searchTerm;
```

**Problem:** Direct DOM manipulation in React breaks the declarative paradigm.

**Impact:**
- Breaks React's virtual DOM
- Makes code harder to reason about
- Can cause state synchronization issues

**Fix:** Use React state:
```tsx
const [searchTerm, setSearchTerm] = useState('');

const onChange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  // ... rest of search logic
};

// In render:
<span>{searchTerm}</span>
```

---

## TypeScript Issues

### 7. Missing Type Definitions
**Location:** `src/app/page.tsx` (line 6-7)

**Issue:**
```tsx
const [advocates, setAdvocates] = useState([]);
const [filteredAdvocates, setFilteredAdvocates] = useState([]);
```

**Problem:** Empty arrays with no type information - `any` type inferred

**Impact:**
- No type safety
- No autocomplete/IntelliSense
- Potential runtime errors

**Fix:** Define proper types:
```tsx
interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

const [advocates, setAdvocates] = useState<Advocate[]>([]);
const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
```

---

### 8. Untyped Event Handler
**Location:** `src/app/page.tsx` (line 19)

**Issue:**
```tsx
const onChange = (e) => {
```

**Problem:** Event parameter `e` has no type

**Impact:** No type safety on event object

**Fix:** Type the event:
```tsx
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

---

## Missing Features / User Experience

### 9. No Loading State
**Location:** `src/app/page.tsx` (lines 9-17)

**Issue:** `useEffect` fetches data but there's no loading indicator

**Impact:** 
- User sees empty table while data loads
- Poor user experience
- User doesn't know if app is working

**Fix:** Add loading state:
```tsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetch("/api/advocates").then((response) => {
    response.json().then((jsonResponse) => {
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
      setLoading(false);
    });
  });
}, []);

// In render:
{loading ? <p>Loading...</p> : <table>...</table>}
```

---

### 10. No Error Handling
**Location:** `src/app/page.tsx` (lines 9-17, 54-55)

**Issue:** Fetch API call has no `.catch()` or error handling

**Impact:**
- If API fails, user sees nothing with no feedback
- No way to debug what went wrong
- Silent failures

**Fix:** Add error handling:
```tsx
useEffect(() => {
  fetch("/api/advocates")
    .then((response) => response.json())
    .then((jsonResponse) => {
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
    })
    .catch((error) => {
      console.error('Failed to fetch advocates:', error);
      // Show error message to user
    });
}, []);
```

---

### 11. No Empty State
**Location:** `src/app/page.tsx` (lines 70-86)

**Issue:** When no advocates match search, table is just empty

**Impact:** User doesn't know if search worked or if there are no results

**Fix:** Show "No advocates found" message when `filteredAdvocates.length === 0`

---

### 12. Search Not Debounced
**Location:** `src/app/page.tsx` (line 19)

**Issue:** Filter runs on every keystroke immediately

**Impact:** 
- Performance issues with large datasets
- Excessive re-renders
- Poor performance on slower devices

**Fix:** Implement debouncing with a timeout (or use a library like `lodash.debounce`)

---

## Styling Issues

### 13. Inline Styles
**Location:** `src/app/page.tsx` (line 45, 54)

**Issue:** Uses inline styles instead of Tailwind CSS classes

**Problem:** Project includes Tailwind but it's not being used

**Impact:** 
- Less maintainable
- Can't use Tailwind's responsive utilities
- Harder to implement consistent design system

**Fix:** Replace with Tailwind classes:
```tsx
<main className="p-6">
  <input className="border border-black" />
```

---

### 14. Using `<br />` for Spacing
**Location:** `src/app/page.tsx` (lines 47, 48, 57, 58)

**Issue:** Multiple `<br />` tags used for vertical spacing

**Problem:** HTML presentation elements, should use CSS margins/padding

**Impact:** Inconsistent spacing, harder to maintain

**Fix:** Use Tailwind spacing utilities like `mt-4`, `mb-8`, etc.

---

## Accessibility Issues

### 15. No Labels on Form Controls
**Location:** `src/app/page.tsx` (line 54)

**Issue:** Input field has no associated label

**Problem:** Screen readers can't identify what the input is for

**Impact:** Accessibility violation - WCAG failure

**Fix:** Add proper label:
```tsx
<label htmlFor="search-input">Search Advocates</label>
<input id="search-input" onChange={onChange} />
```

Or use aria-label:
```tsx
<input aria-label="Search advocates" onChange={onChange} />
```

---

### 16. No Table Caption or ARIA Labels
**Location:** `src/app/page.tsx` (line 59)

**Issue:** Table has no caption or accessible description

**Impact:** Screen readers struggle to understand table context

**Fix:** Add `<caption>` element or aria-label

---

## Performance Issues

### 17. No Backend Search/Filtering
**Location:** `src/app/api/advocates/route.ts`, `src/app/page.tsx`

**Issue:** All advocates fetched, filtering done client-side

**Problem:** As assignment notes, database could have "hundreds of thousands" of advocates

**Impact:**
- Downloads massive amounts of data unnecessarily
- Poor performance on slow connections
- Client-side filtering struggles with large datasets
- High memory usage

**Fix:** Implement server-side search with query parameters:
```tsx
// API route
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  // Perform database query with filters
  const data = await db.select().from(advocates)
    .where(ilike(advocates.firstName, `%${query}%`))
    .limit(50);
  
  return Response.json({ data });
}

// Client-side
fetch(`/api/advocates?q=${encodeURIComponent(searchTerm)}`)
```

---

### 18. No Pagination
**Location:** `src/app/api/advocates/route.ts`

**Issue:** Returns all data at once

**Problem:** With hundreds of thousands of advocates, this is unrealistic

**Impact:**
- Memory issues
- Slow load times
- Poor user experience

**Fix:** Implement pagination (limit/offset or cursor-based)

---

## Summary

**Total Issues Found:** 18

**Categories:**
- Critical Bugs (Hydration/React errors): 3
- Logic Bugs: 2
- Anti-patterns: 1
- TypeScript Issues: 2
- Missing Features: 4
- Styling Issues: 2
- Accessibility Issues: 2
- Performance Issues: 2

**Most Critical to Fix First:**
1. HTML structure error (#1) - breaks hydration
2. Missing React keys (#2, #3) - React warnings
3. Search logic bugs (#4, #5) - broken functionality
4. Direct DOM manipulation (#6) - anti-pattern
5. Backend search (#17) - performance requirement from assignment

