# EcoReport Mobile App

The EcoReport Mobile App is a React Native application built with Expo, designed to empower users to report and monitor environmental issues. It features interactive maps, real-time reporting, and an eco-friendly user interface.

## 🚀 Features

-   **Interactive Map**: Visualize environmental reports on a map using `react-native-maps`.
-   **Reporting System**: Submit reports with details and photos (integrated with `expo-camera`).
-   **User Location**: Automatic location detection for reports (`expo-location`).
-   **Modern UI**: Built with Tailwind CSS (via `nativewind`) for a sleek, responsive design.
-   **Navigation**: efficient file-based routing using `expo-router`.
-   **Mock Mode**: Currently operates with mock data for testing and development.

## 🎨 Design System & Legend

This section documents the core colors, statuses, and UI elements used across the application to ensure consistency for future design and development work.

### Color Palette

| Name | Hex/Class | Usage |
| :--- | :--- | :--- |
| **Primary Green** | `#37a16a` | Main brand color, active buttons, primary icons, "Safe" status. |
| **Secondary Blue** | `blue-500` / `#3b82f6` | Information, Weather widgets, actionable links, user location. |
| **Warning Orange** | `orange-500` / `#f97316` | "Pending" status, "Unhealthy" AQI, alerts. |
| **Danger Red** | `red-500` / `#ef4444` | "New" report status, "Hazardous" AQI, delete actions, errors. |
| **Yellow** | `yellow-500` / `#eab308` | "Moderate" status, stars/ratings. |
| **Gray** | `gray-500` / `#6b7280` | Secondary text, inactive icons, borders. |

### Status Indicators

The app uses a consistent color-coding system for report statuses and environmental metrics:

-   **New / Danger**: Red (e.g., New Report, Bad Air Quality)
-   **Pending / Warning**: Orange (e.g., Report In Progress, Moderate Air Quality)
-   **Resolved / Good**: Green (e.g., Report Solved, Good Air Quality)

### Typography

-   **Headings**: Bold, primarily Gray-900.
-   **Body**: Regular, Gray-700 or Gray-500 for secondary text.
-   **System Font**: Uses the default system sans-serif font (San Francisco on iOS, Roboto on Android).

### Icons

-   **Library**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
-   **Styling**: Icons typically match the text color or background theme of their container.

## 🛠 Tech Stack

-   **Framework**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 54)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
-   **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
-   **Icons**: Lucide React Native & Expo Vector Icons

## 📂 Project Structure

-   `app/`: Expo Router pages and navigation layout.
-   `src/components/`: Reusable UI components.
-   `src/hooks/`: Custom React hooks.
-   `src/services/`: API and backend service integrations (currently using mock data).
-   `src/data/`: Mock data files for development.
-   `assets/`: Images, fonts, and other static assets.

## 🏁 Getting Started

### Prerequisites

-   Node.js (LTS recommended)
-   npm or yarn
-   Expo Go app on your mobile device (or Android Studio/Xcode for simulators)

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npx expo start
    ```

4.  **Run on device**:
    -   Scan the QR code with the **Expo Go** app (Android) or **Camera** app (iOS).
    -   Or press `a` for Android Emulator, `i` for iOS Simulator.

## 📝 Scripts

-   `npm start`: specific alias for `expo start`.
-   `npm run android`: Run on Android device/emulator.
-   `npm run ios`: Run on iOS simulator.
-   `npm run web`: Run web version.
-   `npm run lint`: Run ESLint.