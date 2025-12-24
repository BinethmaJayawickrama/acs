# 🏡 Property Search Web Application

**Advanced Client-Side Web Development – Coursework**

## 📘 Module

**5COSC026W – Advanced Client-Side Web Development**

## 🎓 Coursework Overview

This project is a **React-based Single Page Application (SPA)** developed as part of the coursework for the *Advanced Client-Side Web Development* module.

The aim of the coursework is to demonstrate practical knowledge of **modern client-side web development techniques**, including React components, routing, state management, JSON data handling, user interaction, and responsive design — **without using a backend server**.

---

## 🎯 Project Background

The application simulates a **property search platform** similar to those used by estate agents.
Users can search through a predefined set of property listings using multiple criteria and interact with results dynamically.

All property data is stored locally in **JSON format**, reflecting the module requirement to build a **pure client-side solution**.

The project focuses on:

* User-friendly interaction
* Dynamic filtering
* State-driven UI updates
* Clean component architecture
* Modern React best practices

---

## 🛠️ Technologies Used

* **React (Create React App)**
* **React Router DOM**
* **JavaScript (ES6+)**
* **HTML5**
* **CSS3**
* **Local JSON data**
* **Browser Local Storage**

---

## ✨ Key Features

### 🔍 Property Search

Users can filter properties by:

* Property type
* Minimum and maximum price
* Minimum and maximum number of bedrooms
* Date added (from / to)
* Postcode area

Multiple criteria can be combined simultaneously.

### 🖼️ Property Listings

* Results are displayed dynamically as property cards
* Each card shows:

  * Main property image
  * Price
  * Short description
* Clicking a property navigates to a **dedicated property details page**

### 📄 Property Details Page

* Displays full property information
* Includes:

  * Image gallery with thumbnails
  * Detailed description
  * Navigation back to search results

### ❤️ Favourites Functionality

* Properties can be added to favourites
* Supports:

  * Button-based addition
  * **Drag-and-drop** interaction
* Favourites persist using **localStorage**
* Users can remove individual favourites or clear all

### 📱 Responsive Design

* Layout adapts to desktop and tablet screen sizes
* Uses CSS media queries and flexible layouts

---

## 🔐 Security Considerations

* No user-generated HTML is rendered directly
* React JSX automatically escapes content
* Content Security Policy (CSP) can be applied via `index.html`

---

## 🚀 How to Run the Project

1. Clone or download the repository
2. Open the project folder in VS Code
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the development server:

   ```bash
   npm start
   ```
5. Open in browser:

   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure (Simplified)

```
src/
├── components/
│   ├── SearchForm.jsx
│   ├── ResultsList.jsx
│   ├── PropertyCard.jsx
│   ├── FavouritesPanel.jsx
│   └── ...
├── pages/
│   ├── SearchPage.jsx
│   └── PropertyDetails.jsx
├── data/
│   └── properties.json
├── utils/
│   ├── filterProperties.js
│   └── favouritesStorage.js
├── App.js
└── index.js
```

---

## 🧪 Testing & Development Notes

* Application state is fully managed using React hooks
* Filtering logic is separated into utility functions
* Components are modular and reusable
* Version control is managed using GitHub with incremental commits

---

## 📌 Coursework Declaration

This project was developed **solely for academic purposes** as part of the *Advanced Client-Side Web Development* coursework submission.
No third-party backend services or APIs were used.

