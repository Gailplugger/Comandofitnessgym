# COMMando Fitness Gym Rajgarh
# PRODUCTION-GRADE FRONTEND — PHASE 1
# BACKEND WILL BE ADDED LATER

We are starting a COMPLETELY NEW PROJECT from an EMPTY FOLDER.

Do NOT use or reference any previous GYM project.

The project must be a production-quality frontend for:

COMMando Fitness Gym Rajgarh

The backend will be integrated later.

==================================================
CRITICAL ARCHITECTURE REQUIREMENT
==================================================

Build ONLY the frontend in this phase.

DO NOT implement Firebase yet.

DO NOT implement a database yet.

DO NOT implement authentication yet.

DO NOT implement server-side functionality yet.

DO NOT implement online payments.

DO NOT implement member login.

DO NOT implement a backend.

The goal of this phase is to create an exceptionally polished, production-quality frontend that can later be connected to Firebase without redesigning the UI.

The frontend must be completely functional using local/static mock data.

When the backend is added later, the data layer should be replaceable without rewriting the UI.

==================================================
TECHNOLOGY
==================================================

This project MUST NOT require Node.js.

Do NOT use:

- Node.js
- npm
- npx
- React
- TypeScript
- TSX
- JSX
- Vite
- Webpack
- Parcel
- Rollup
- Any bundler
- Any package manager
- Any build step

Use only:

- HTML5
- CSS3
- Vanilla JavaScript
- ES Modules

The website must be directly deployable as static files.

Use normal HTML pages rather than a complex SPA router.

==================================================
PROJECT STRUCTURE
==================================================

Create a clean structure:

/
├── index.html
├── machines.html
├── machine.html
├── goals.html
├── fees.html
├── notifications.html
├── surveys.html
├── survey.html
├── contact.html
│
├── admin/
│   ├── login.html
│   ├── index.html
│   ├── machines.html
│   ├── fees.html
│   ├── notifications.html
│   ├── surveys.html
│   ├── responses.html
│   └── enquiries.html
│
├── css/
│   ├── global.css
│   ├── public.css
│   └── admin.css
│
├── js/
│   ├── app.js
│   ├── data.js
│   ├── components.js
│   ├── machines.js
│   ├── machine.js
│   ├── goals.js
│   ├── fees.js
│   ├── notifications.js
│   ├── surveys.js
│   ├── survey.js
│   ├── contact.js
│   │
│   └── admin/
│       ├── admin.js
│       ├── machines.js
│       ├── fees.js
│       ├── notifications.js
│       ├── surveys.js
│       ├── responses.js
│       └── enquiries.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
│
├── README.md
└── .gitignore

Keep the architecture clean and modular.

==================================================
DESIGN GOAL
==================================================

THIS IS THE MOST IMPORTANT PART.

Do NOT create a generic gym template.

Do NOT make it look like a beginner HTML project.

Do NOT use ugly default browser styling.

Create a premium, modern, high-end fitness brand website.

The visual experience should feel like:

Premium fitness app
+
Modern gym brand
+
Strong athletic identity

Design characteristics:

- Dark premium aesthetic
- Powerful typography
- High contrast
- Sophisticated spacing
- Large visual sections
- Premium cards
- Subtle gradients
- Subtle glass effects
- Smooth transitions
- Micro-interactions
- Strong CTA buttons
- Modern navigation
- Professional icons
- Elegant borders
- Excellent mobile UI

Avoid excessive neon effects.

Avoid excessive glassmorphism.

Avoid unnecessary animations.

The design must remain readable and professional.

==================================================
COLOR SYSTEM
==================================================

Create CSS variables so colors can easily be changed later.

Example architecture:

--color-bg
--color-surface
--color-surface-2
--color-text
--color-muted
--color-primary
--color-primary-hover
--color-border
--color-success
--color-warning
--color-danger

DO NOT scatter colors throughout the CSS.

The owner should be able to change the entire theme from a small set of variables.

==================================================
TYPOGRAPHY
==================================================

Use a professional modern font system.

If using an external font, use a reliable CDN.

Provide proper fallback fonts.

Typography hierarchy must be strong:

Display
H1
H2
H3
Body
Small
Caption

Headings should have strong visual impact without being ridiculous.

==================================================
GLOBAL NAVIGATION
==================================================

Desktop navigation:

HOME
MACHINES
GOALS
FEES
NOTIFICATIONS
SURVEYS
CONTACT

Include:

JOIN NOW

Include notification bell:

🔔

The notification UI should be visually polished.

Mobile:

Use a proper mobile menu.

The mobile navbar must feel intentional, not like a desktop menu squeezed into a phone.

==================================================
HOME PAGE
==================================================

Create an extremely polished homepage.

Hero:

COMMando Fitness Gym

Rajgarh

Headline example:

"TRAIN HARD.
BUILD STRONG."

Supporting text:

"Your local destination for strength, fitness and consistency."

Buttons:

JOIN NOW
EXPLORE MACHINES

Use a premium hero layout.

Possible visual direction:

Large gym imagery / background image area with controlled overlay.

Do NOT invent a real gym photograph.

Use an obvious placeholder asset or neutral visual until real gym images are provided.

==================================================
HOME SECTIONS
==================================================

Create:

1. Hero

2. Why Commando Fitness

3. Featured Machines

4. Fitness Goals

5. Latest Notifications

6. Gym Highlights

7. Membership CTA

8. Contact / Location CTA

9. Footer

==================================================
WHY COMMANDO FITNESS
==================================================

Create 3–4 premium cards.

Examples:

DISCIPLINE
CONSISTENCY
STRENGTH
PROGRESS

Do not make unsupported claims such as:

"Best gym in Rajgarh"

unless explicitly provided by the owner.

==================================================
FEATURED MACHINES
==================================================

Display a curated selection from local mock data.

Each card:

- Image
- Machine name
- Muscle group
- Short description
- View machine button

CTA:

VIEW ALL MACHINES

==================================================
FITNESS GOALS
==================================================

Create three visually strong cards:

🔥 FAT LOSS

💪 MUSCLE GAIN

❤️ BE HEALTHY

Each should link to the appropriate section/page.

==================================================
LATEST NOTIFICATIONS
==================================================

Create a polished notification section.

Show 3 latest mock notifications.

Examples:

Gym timing update
New training announcement
New survey

Do not pretend these are real announcements.

Clearly structure mock data so it can later be replaced by Firebase.

==================================================
MACHINES PAGE
==================================================

Create a professional equipment library.

Categories:

- Chest
- Back
- Shoulders
- Legs
- Arms
- Cardio
- Other

Features:

- Search
- Category filters
- Responsive grid
- Empty state
- Machine detail navigation

Machine cards should feel premium.

Use realistic mock machine data.

Do NOT invent that the gym owns specific equipment as a factual claim.

Clearly mark the mock inventory in the data architecture so it can later be replaced by actual gym inventory.

==================================================
MACHINE DETAIL PAGE
==================================================

machine.html?id=...

Display:

Machine image
Machine name
Category
Target muscles
Description

HOW TO USE

Step 1
Step 2
Step 3
Step 4

BEGINNER GUIDANCE

Sets
Reps

COMMON MISTAKES

SAFETY TIPS

COACH TIP

TUTORIAL VIDEO

If no video exists, show a polished empty state instead of a fake video.

==================================================
GOALS PAGE
==================================================

Create a premium fitness education hub.

Sections:

FAT LOSS

Explain general concepts:

- Energy balance
- Strength training
- Cardio
- Protein
- Sleep
- Hydration
- Consistency

MUSCLE GAIN

Explain:

- Progressive overload
- Resistance training
- Protein
- Energy intake
- Recovery
- Sleep

BE HEALTHY

Explain:

- Exercise
- Balanced nutrition
- Hydration
- Sleep
- Mobility
- Recovery
- Daily activity

Keep the information educational.

Do not present medical diagnosis or treatment.

==================================================
FEES PAGE
==================================================

This page is INFORMATIONAL ONLY.

There is NO payment system.

There is NO checkout.

There is NO online membership purchase.

Create beautiful pricing cards.

Example mock plans:

MONTHLY
QUARTERLY
HALF-YEARLY
YEARLY

BUT:

Clearly mark all prices as placeholder/mock data until the gym owner provides the real prices.

Each card:

Plan
Duration
Price
Features
Contact button

CTA:

CONTACT GYM

==================================================
NOTIFICATIONS PAGE
==================================================

Create a dedicated notification center.

Display:

Notification title
Type
Priority
Date
Preview

Types:

Announcement
Gym Update
Event
Survey
Important
Emergency

Priorities:

Normal
Important
Urgent

Create mock notifications locally.

==================================================
SMART NOTIFICATION UI
==================================================

Create the complete frontend UX now, even though the backend comes later.

Global bell:

🔔

Unread badge:

1
2
3

Notification dropdown/panel:

- Latest notifications
- Unread indicator
- Priority indicator
- Timestamp
- View button
- Mark as read
- Mark all as read

Use localStorage for mock read/unread state ONLY during this frontend phase.

Later this will be replaced by Firebase per-user notification state.

==================================================
NOTIFICATION BANNER
==================================================

Create a premium notification banner.

Example:

IMPORTANT

Gym timing update available.

VIEW NOTICE

The banner should be dismissible.

Use local mock data.

Structure the code so the banner can later be controlled by Firebase.

==================================================
SURVEYS PAGE
==================================================

Create a polished survey listing page.

Cards:

Survey title
Description
Status
Estimated completion time
Start button

Mock surveys:

Member Feedback
Fitness Goals Survey
Gym Experience Survey

Clearly structure mock data.

==================================================
SURVEY PAGE
==================================================

Create a fully functional frontend form renderer.

Supported question types:

- Short answer
- Long answer
- Multiple choice
- Checkbox
- Dropdown
- Yes/No
- Rating
- Number
- Date

Support:

- Required questions
- Validation
- Error messages
- Progress indicator
- Submit state
- Success screen

During frontend-only phase, submissions can be stored in localStorage.

DO NOT pretend they are stored on a server.

Later Firebase will replace the localStorage submission layer.

==================================================
CONTACT PAGE
==================================================

Create:

Gym information section
Contact details
Opening hours
Location
Map placeholder
Contact/enquiry form

Form:

Name
Phone
Email
Message

Use frontend validation.

During this phase, submissions should be handled locally only.

Do NOT claim an email was actually sent.

Show:

"Thanks! Your enquiry has been recorded locally for this demo."

Structure the code so Firebase/backend can later replace this.

Do NOT invent actual phone number, email, address or opening hours.

Use clearly marked placeholders.

==================================================
ADMIN FRONTEND
==================================================

Create the COMPLETE ADMIN UI visually.

IMPORTANT:

There is NO REAL AUTHENTICATION in this phase.

Do NOT implement fake security.

Do NOT create a fake password check and call it secure.

The admin UI is a frontend prototype only.

Clearly label the authentication layer as:

"Backend authentication will be connected in Phase 2."

Create:

/admin/login.html

/admin/index.html

/admin/machines.html

/admin/fees.html

/admin/notifications.html

/admin/surveys.html

/admin/responses.html

/admin/enquiries.html

==================================================
ADMIN LOGIN UI
==================================================

Create premium login screen:

COMMando Fitness Admin

Email
Password

LOGIN

But do NOT implement fake authentication.

The login button should show:

"Authentication will be connected when the backend is added."

Do not store passwords.

==================================================
ADMIN DASHBOARD
==================================================

Create a premium dashboard.

Stats:

Total Machines
Active Surveys
Responses
Notifications
Enquiries

Use mock data.

Charts should only be used where useful.

Do not make fake statistics look like real production data.

Label mock/demo data appropriately.

==================================================
ADMIN MACHINE MANAGEMENT
==================================================

Create a full CRUD-style interface visually.

Table/list:

Machine
Category
Status
Actions

Actions:

Edit
Delete
Publish
Unpublish

Create machine modal/form:

Name
Category
Target muscles
Description
Instructions
Sets
Reps
Common mistakes
Safety tips
Coach tip
Tutorial URL
Image

During this phase, changes can be stored in localStorage.

Structure the code around a data/service layer so Firebase can replace it later.

==================================================
ADMIN FEES
==================================================

Create:

Fee management dashboard.

Admin can visually:

Add plan
Edit plan
Delete plan
Publish/unpublish

Use localStorage in frontend-only phase.

==================================================
ADMIN NOTIFICATIONS
==================================================

Create:

Notification management interface.

Create notification:

Title
Message
Type
Priority
Publish time
Expiry time
Show banner

Actions:

Draft
Publish
Edit
Delete
Archive

Use localStorage for frontend-only phase.

==================================================
ADMIN SURVEY BUILDER
==================================================

Create a polished Google Forms-style builder.

Admin can:

Add question
Choose question type
Edit question
Delete question
Reorder questions
Mark required
Add options
Preview
Save draft
Publish

Question types:

Short answer
Long answer
Multiple choice
Checkbox
Dropdown
Yes/No
Rating
Number
Date

Use localStorage in this phase.

The data model must be designed so Firebase can replace the localStorage service later.

==================================================
ADMIN RESPONSES
==================================================

Create response dashboard.

Show:

Survey
Date
Response count
View responses

Create response detail view.

Use mock/localStorage data.

Clearly label demo/local data.

==================================================
ADMIN ENQUIRIES
==================================================

Create enquiry dashboard.

Columns:

Name
Phone
Email
Message
Date
Status

Statuses:

New
Read
Resolved

Use localStorage.

==================================================
DATA ARCHITECTURE
==================================================

THIS IS IMPORTANT.

Create a clean abstraction between UI and data.

For example:

js/data.js

Expose functions such as:

getMachines()
saveMachine()
deleteMachine()

getFees()
saveFee()

getNotifications()
saveNotification()

getSurveys()
saveSurvey()

getSurveyResponses()

getEnquiries()

saveEnquiry()

The UI must call these functions rather than directly manipulating localStorage everywhere.

The current implementation can use localStorage/mock data.

Later we will replace the implementation of these functions with Firebase.

DO NOT rewrite every page when Firebase is added.

==================================================
LOCAL STORAGE
==================================================

Use localStorage only for the frontend prototype.

Create clear storage keys.

Example:

commando_machines
commando_fees
commando_notifications
commando_surveys
commando_responses
commando_enquiries
commando_notification_reads

Handle malformed localStorage data safely.

Provide fallback data if localStorage is empty.

==================================================
NO FAKE BACKEND
==================================================

Do NOT make the frontend claim that data is securely stored remotely.

Do NOT say:

"Saved to database"

when it is only localStorage.

Do NOT say:

"Email sent"

when no email service exists.

Do NOT say:

"Admin authenticated"

when authentication does not exist.

The UI should accurately represent the current frontend-only state.

==================================================
RESPONSIVE DESIGN
==================================================

This is mandatory.

Test visually for:

360px
390px
430px
768px
1024px
1280px
1440px
1920px

No horizontal scrolling.

Touch targets should be comfortable.

Tables should transform appropriately on mobile.

Admin dashboard must remain usable on mobile.

==================================================
ACCESSIBILITY
==================================================

Implement:

- Semantic HTML
- Proper labels
- Keyboard navigation
- Visible focus states
- ARIA where necessary
- Alt text
- Accessible modals
- Accessible dropdowns
- Good contrast
- Reduced-motion support

==================================================
ANIMATIONS
==================================================

Use tasteful animations:

- Page entrance
- Card hover
- Button interaction
- Modal transitions
- Notification panel
- Mobile menu

Respect:

prefers-reduced-motion

Do not make the website slow.

==================================================
PERFORMANCE
==================================================

No huge frameworks.

No unnecessary dependencies.

Optimize images.

Use lazy loading where appropriate.

Avoid expensive JavaScript.

Avoid unnecessary DOM operations.

Use event delegation where appropriate.

Keep the website lightweight.

==================================================
SEO
==================================================

Every public page needs:

- Unique title
- Meta description
- H1
- Semantic headings
- Open Graph metadata
- Proper language declaration

Prepare for:

robots.txt
sitemap.xml
structured data

Do not invent business information.

==================================================
SECURITY
==================================================

Even though there is no backend yet:

- Never use eval()
- Avoid unsafe HTML injection
- Escape dynamic content
- Validate user input
- Avoid storing passwords
- Avoid storing sensitive information in localStorage
- Never include service account credentials
- Never include fake security mechanisms

==================================================
PLACEHOLDER CONTENT
==================================================

Create clearly marked placeholders for:

GYM NAME
ADDRESS
PHONE
EMAIL
OPENING HOURS
SOCIAL LINKS
REAL FEES
REAL MACHINES
REAL GYM IMAGES
REAL COACH INFORMATION

Do NOT invent these details.

Centralize editable business information in one place.

For example:

js/data.js

or:

js/config.js

Make it extremely easy for me to replace placeholders.

==================================================
IMAGE STRATEGY
==================================================

Do not invent real photos of Commando Fitness Gym.

Use:

- Neutral placeholder images
- Clearly marked placeholder assets
- CSS visual treatments

Make it easy to replace each image later.

Every image must have useful alt text.

==================================================
FOOTER
==================================================

Premium footer containing:

Commando Fitness Gym
Rajgarh

Quick links
Contact
Opening hours
Social links

Use placeholders where actual information has not been supplied.

==================================================
ERROR / EMPTY STATES
==================================================

Every dynamic section must have polished:

Loading state
Empty state
Error state
Success state

Examples:

"No machines available yet."

"No notifications yet."

"No surveys available."

==================================================
404 PAGE
==================================================

Create a polished 404.html page.

Include:

404

"Looks like you took a wrong turn."

Back Home button.

==================================================
FAVICON / BRANDING
==================================================

Create a simple placeholder favicon structure.

Make it easy to replace later with the official Commando Fitness logo.

==================================================
CODE QUALITY
==================================================

Use:

- Clean HTML
- Modular JS
- CSS variables
- Reusable UI functions
- Clear naming
- Comments only where useful
- No giant JS files if separation makes sense
- No duplicated navigation code where a reusable component approach is practical

Because this is static HTML, use reusable JS rendering functions for shared:

- Header
- Footer
- Notification bell
- Notification banner
- Toasts
- Modals

==================================================
IMPORTANT: NO BACKEND YET
==================================================

DO NOT create:

firebase-config.js

firebase initialization

Firestore code

Firebase Authentication code

Firebase Storage code

Firebase Security Rules

Backend APIs

Cloud Functions

Server code

These will be Phase 2.

The architecture must simply be READY for backend integration.

==================================================
PRODUCTION FRONTEND STANDARD
==================================================

Treat this as a real production website frontend.

Do not create a quick demo.

The visual quality should be high.

The code should be maintainable.

The site should work without Node.

The site should work without npm.

The site should work without a backend.

The site should be deployable as static files.

==================================================
IMPORTANT DEVELOPMENT PROCESS
==================================================

Do NOT generate everything blindly in one huge operation.

Build systematically:

PHASE 1:
Global CSS + design system + layout

PHASE 2:
Header + footer + navigation

PHASE 3:
Homepage

PHASE 4:
Machines

PHASE 5:
Goals

PHASE 6:
Fees

PHASE 7:
Notifications

PHASE 8:
Surveys

PHASE 9:
Contact

PHASE 10:
Admin UI

PHASE 11:
Local data/service layer

PHASE 12:
Responsive/accessibility/performance audit

PHASE 13:
Final frontend audit

After each major phase, inspect the implementation for broken links, missing files and JavaScript errors.

==================================================
FINAL ACCEPTANCE CRITERIA
==================================================

Before claiming Phase 1 complete:

PUBLIC:

✓ Home is polished
✓ Navigation works
✓ Mobile navigation works
✓ Machines page works
✓ Machine detail works
✓ Search works
✓ Filtering works
✓ Goals works
✓ Fees works
✓ Notifications work
✓ Notification badge works
✓ Notification panel works
✓ Notification banner works
✓ Surveys work
✓ Survey renderer works
✓ Survey validation works
✓ Contact works
✓ 404 works
✓ Footer works

ADMIN:

✓ Admin login UI exists
✓ Authentication is explicitly marked as backend-pending
✓ Dashboard exists
✓ Machine management UI exists
✓ Fee management UI exists
✓ Notification management UI exists
✓ Survey builder exists
✓ Response dashboard exists
✓ Enquiries dashboard exists

QUALITY:

✓ No Node
✓ No npm
✓ No React
✓ No TypeScript
✓ No Vite
✓ No backend
✓ No fake authentication
✓ No fake server functionality
✓ No invented gym information
✓ Responsive
✓ Accessible
✓ SEO-ready
✓ Fast
✓ Clean code
✓ No broken navigation
✓ No console errors caused by the application

==================================================
FINAL INSTRUCTION
==================================================

START FROM THE EMPTY FOLDER.

Do not reuse the old GYM project.

Do not copy the old React architecture.

Build a completely fresh frontend.

Prioritize exceptional visual quality and clean architecture.

The owner will customize the content, colors, images, fees, machines and branding after the initial build.

After the frontend is finalized, we will perform a separate PHASE 2 where Firebase Authentication, Firestore, Storage, Security Rules, notifications, surveys and admin authorization are connected.

DO NOT START PHASE 2.

FIRST BUILD THE FRONTEND PROPERLY.