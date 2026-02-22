# React Native Authentication Flow

This project handle user registration and login in React Native apps. It uses Expo and React Navigation library to manage authenticated and unauthenticated states.

## Key Features

- **Authentication Logic**: Uses React Context to manage user state globally.
- **Data Persistence**: Uses AsyncStorage to keep users logged in across app restarts.
- **Navigation**: Uses a Native Stack navigator with conditional routing. If a user is logged in, they see the Home screen; otherwise, they are prompted to Login or Sign Up.
- **Validation**: Basic form validation for emails and passwords, including matching password confirmation and length checks.
- **Styling**: All styles are centralized in a global theme file for easy modification.

## Tech Stack

- Expo
- React Navigation (Native Stack)
- TypeScript
- AsyncStorage for local storage
- Ionicons for icons

## Project Structure

- `app/context/AuthContext.tsx`: Manages the authentication state and storage operations.
- `app/_layout.tsx`: Configures the navigation stack and determines which screen to show.
- `app/Login.tsx`: User login form with error handling.
- `app/SignUp.tsx`: User registration form.
- `app/Home.tsx`: A protected profile dashboard visible only after login.
- `app/styles/globalStyles.ts`: Contains the color palette and reusable style definitions.

## Getting Started

### Prerequisites

You need Node.js and a package manager (npm or yarn) installed on your machine.

### Installation

1. Clone this repository to your local machine.
2. Install the project dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the Expo development server:
```bash
npm start
```

2. **Run on a device/emulator**:
   - Press `i` for iOS simulator.
   - Press `a` for Android emulator.
   - Press `w` for Web.

## Maintenance

To check for code style issues or potential errors:
```bash
npx expo lint
```

To automatically fix most linting issues:
```bash
npx expo lint --fix
```