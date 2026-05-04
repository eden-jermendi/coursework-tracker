# Coursework Tracker

## Preview

![App Screenshot](./images/coursework%20tracker%20screenshot.png)

---

## Purpose

A simple, intuitive tool to keep track of:

- Upcoming assignments
- Next steps in a course
- General coursework progress

The focus is on clarity and functionality over complexity, offering a streamlined experience for students and lifelong learners.

---

## Current Status — MVP B (Live & Authenticated)

The project has moved beyond the local MVP stage. It is now a fully deployed, production-ready web application featuring secure user authentication and persistent cloud storage.

### Core Features Completed:

- **Production Deployment:** Live and accessible on the web.
- **Cloud Infrastructure:** Migrated from local storage to a hosted cloud database.
- **Social Authentication:** Secure login via Google and GitHub OAuth.
- **Polished UI/UX:** High-contrast accessibility checks complete with a responsive interface.
- **Third-Party Integration:** Includes an external API integration (random joke feature) for added user delight.

---

## Tech Stack

- **Frontend:** React + TypeScript (Deployed via **Vercel**)
- **Backend:** Node.js + Express (Serverless/API handling)
- **Database:** PostgreSQL (Hosted via **Supabase**)
- **Authentication:** Supabase Auth (**Google & GitHub OAuth**)
- **Tools:** React Query, Knex, Postman, Git

---

## Future Scope / Next Steps

With the core infrastructure and authentication in place, the next phases of development will focus on user experience and data visualization:

- Add user-specific settings (e.g., dark mode preference, notification toggles)
- Build a dashboard showing coursework completion metrics and visual progress bars
- Enable batch editing and drag-and-drop task prioritization

---

## Notes

This project remains intentionally focused as a high-value MVP:

- Clean, single-responsibility data models
- Scalable cloud infrastructure that avoids early over-engineering
- Designed specifically to be easily extended with new features based on real usage
