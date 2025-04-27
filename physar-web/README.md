# PhysAR: A Física em Suas Mãos - Web Version

## Project Overview
PhysAR is a web-based interactive physics simulator that leverages augmented reality (AR) and machine learning (ML) to allow users to visualize and interact with physics experiments in 3D. The app will run in modern web browsers with AR capabilities and use the device camera for object recognition and physics simulation.

## Features
- Visualization of physics experiments:
  - Newton's Laws (force vectors, pushing blocks)
  - Projectile motion with trajectory visualization
  - Electric and magnetic fields visualization
  - Simple and compound pendulums
- Machine learning for real-time object recognition via camera
- Interactive quiz mode with physics challenges
- Real-time statistics panel (velocity, acceleration, energy)
- Creator mode for custom experiment setup
- Online leaderboard with visitor scores

## Technology Stack
- Frontend:
  - Three.js for 3D rendering and physics visualization
  - Cannon.js or Ammo.js for physics simulation
  - TensorFlow.js for machine learning object recognition
  - WebXR / WebAR frameworks for augmented reality support
  - Tailwind CSS for styling
  - Google Fonts and Font Awesome for typography and icons
- Backend:
  - Node.js + Express (optional) for leaderboard API
  - MongoDB or similar for storing scores (optional)

## Project Structure
```
physar-web/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── assets/
├── src/
│   ├── app.js           # Main app logic
│   ├── physics.js       # Physics simulation logic
│   ├── ar.js            # AR integration and camera handling
│   ├── ml.js            # Machine learning object recognition
│   ├── quiz.js          # Quiz mode logic
│   ├── creator.js       # Creator mode logic
│   └── leaderboard.js   # Leaderboard API client
├── server/
│   ├── server.js        # Backend server for leaderboard
│   └── models/
│       └── score.js     # Score model
├── package.json
└── README.md
```

## Next Steps
- Setup project scaffolding with basic HTML, CSS, and JS files
- Implement 3D scene with Three.js and basic physics simulation
- Integrate TensorFlow.js for object recognition
- Add AR camera support with WebXR
- Develop UI components with Tailwind CSS
- Implement quiz, creator, and leaderboard features incrementally

## Running the Project

### Backend Server (Leaderboard API)
1. Navigate to the `physar-web` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. The server will run on `http://localhost:3000`.

### Frontend (Web App)
- Open `physar-web/public/index.html` in a WebXR-compatible browser (e.g., Chrome with WebXR enabled).
- The app will access your camera for AR and object recognition.
- Use the quiz, creator, stats, and leaderboard features from the UI.

## Notes
- Ensure your browser supports WebXR and camera access.
- MongoDB must be running locally for the leaderboard backend.
- This project is a prototype and can be extended with more physics experiments and AR interactions.

Thank you for exploring PhysAR!
