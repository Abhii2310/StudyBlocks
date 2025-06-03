# API Testing with Postman 🚀

## Overview
This project uses **Postman** to document and test all backend API endpoints. This ensures the StudyBlocks backend is robust, reliable, and ready for production.

---

## 1. Postman Collection
- The file [`StudyBlocks-Postman-Collection.json`](./StudyBlocks-Postman-Collection.json) contains all API endpoints, grouped by feature (Auth, Profile, Course, Payments, Notes, Video Upload, Contact, etc).
- You can import this file into Postman to view and test all endpoints.

---

## 2. Example API Test (Screenshots)

### Login Request
![Postman Login Request Screenshot](screenshots/postman-login.png)

### Get User Details
![Postman Get User Screenshot](screenshots/postman-get-user.png)

### Upload Video
![Postman Upload Video Screenshot](screenshots/postman-upload-video.png)

*Replace the above with your actual screenshots!*

---

## 3. How to Run the Tests
1. Open Postman and click **Import**.
2. Select `StudyBlocks-Postman-Collection.json`.
3. Set the `base_url` variable to your backend (e.g. `http://localhost:4000`).
4. Log in to get a JWT token, then set the `jwt_token` variable for protected routes.
5. Run any request and check the response.

---

## 4. (Optional) Newman CLI Automation
- You can run all API tests automatically with:
  ```sh
  npx newman run StudyBlocks-Postman-Collection.json --env-var base_url=http://localhost:4000
  ```
- This will show a summary of all API tests (passed/failed) in your terminal.

---

## 5. Project Report Section (Sample)
> All backend endpoints are documented and tested using Postman. The collection file is included in the repository. Example requests and responses are provided. Postman was used to verify authentication, CRUD operations, file uploads, and more. This ensures the backend is robust and works as expected.

---

## 6. Demo Video Script (Sample)
1. Open Postman, import the collection.
2. Show the list of endpoints in the sidebar.
3. Run a login request, show the response.
4. Run a "Get User Details" request with the JWT token, show the response.
5. (Optional) Run a video upload request.
6. Summarize: “As you can see, all API endpoints are working and tested using Postman.”

---

## 7. Badge for README (Optional)
Add this to your main README to show API tests are automated:

```
![Postman API Tests](https://github.com/<your-username>/StudyBlocks/actions/workflows/postman-api-test.yml/badge.svg)
```

---

**You can now easily prove to anyone (including mam) that you have used Postman for thorough API testing in your project!**
