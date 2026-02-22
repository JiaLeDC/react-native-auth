# User Authentication App (React Native)

## Setup Instructions

1. **Clone the repository**:


2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on a device/emulator**:
   - Press `i` for iOS simulator.
   - Press `a` for Android emulator.
   - Press `w` for Web.

##  Project Structure

- `app/context/AuthContext.tsx`: The heart of the auth logic, handling persistence and state.
- `app/_layout.tsx`: Root configuration with protected route guards.
- `app/Login.tsx`: Login screen with validation and error feedback.
- `app/SignUp.tsx`: Registration screen with user creation logic.
- `app/Home.tsx`: Protected dashboard showing user profile.
- `styles/globalStyles.ts`: Centralized design tokens and component styles.

## Prettier and Lint Fix
   ```bash
   npx expo lint --fix
   ```