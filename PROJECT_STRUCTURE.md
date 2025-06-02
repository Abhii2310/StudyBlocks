# StudyBlocks MERN Project Structure

This guide helps you (and anyone else) quickly showcase and explain the MERN stack implementation in the StudyBlocks project.

---

```
/StudyBlocks
│
├── server/                        # Node.js + Express + MongoDB (Backend)
│   ├── config/                    # Configuration files (DB, Razorpay, etc.)
│   │   └── database.js            # MongoDB connection via Mongoose
│   ├── controllers/               # Express route controllers (business logic)
│   ├── middlewares/               # Express middlewares (auth, error handling)
│   ├── models/                    # Mongoose schemas (MongoDB models)
│   ├── routes/                    # Express routers (API endpoints)
│   ├── utils/                     # Utility functions (mail, etc.)
│   ├── scripts/                   # Seed and utility scripts
│   ├── logs/                      # Application logs
│   ├── index.js                   # Entry point (Express app)
│   ├── logger.js                  # Winston logger setup
│   ├── package.json               # Node.js dependencies for backend
│   └── .env                       # Backend environment variables
│
├── src/                           # React (Frontend)
│   ├── components/                # React components (UI)
│   ├── pages/                     # React pages (routes/views)
│   ├── reducer/                   # Redux root reducer
│   ├── slices/                    # Redux slices (state logic)
│   ├── services/                  # API connectors (axios), endpoints
│   ├── App.js                     # Main React component
│   ├── index.js                   # Entry point (ReactDOM.render)
│   ├── index.css                  # Global styles
│   └── ...                        # Other frontend files/assets
│
├── docker-compose.elk.yml         # Docker Compose for ELK + backend
├── Dockerfile                     # Dockerfile for backend
├── README.md                      # Project documentation
├── package.json                   # Node.js dependencies for frontend (if separate)
└── ...                            # Other project files (Cypress, Ansible, etc.)
```

---

## How to Showcase MERN Stack

- **M** (MongoDB):  
  - Point to `server/models/` and `server/config/database.js`.
- **E** (Express):  
  - Point to `server/index.js`, `server/routes/`, `server/controllers/`.
- **R** (React):  
  - Point to `src/` (especially `components/`, `pages/`, `App.js`).
- **N** (Node.js):  
  - Point to `server/` as a whole, and `package.json` for dependencies.

---

> **Tip:**
> Keep this file handy for interviews, demos, or onboarding new team members.
