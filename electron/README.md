# File Descriptions

## electron.ts
- Purpose: Acts as the main entry point for the Electron app.
- Responsibilities:
  - Creates the main Electron application window when the app starts.
  - Sets up handlers for managing application events like when all windows are closed or when the app is activated.
  - Uses IPC (Inter-Process Communication) handlers to manage communication between the frontend and Electron processes.
- Key Components:
  - Initializes the main window by calling createMainWindow.
  - Listens for app lifecycle events like whenReady, window-all-closed, and activate.
  - Imports IPC handlers from the ipc folder and registers them.

## preload.ts
- Purpose: Bridges the gap between the Electron main process and the frontend (React).
- Responsibilities:
    - Provides a safe environment for communication between the renderer process (React) and the main Electron process.
    - Exposes API functions to the frontend using contextBridge (e.g., sending coordinates, opening windows, etc.).
- Key Components:
    -Methods like openTestWindow or onCoordinatesUpdate exposed to the React app for interaction with Electron.

## pc/ Folder
- Purpose: Contains the logic for IPC communication.
- Files:
    - coordinateHandlers.ts:
        - Handles events related to sending and receiving coordinate updates.
        - Example: Sends coordinates from the Electron process to the React frontend.
    - languageHandlers.ts:
        - Handles events related to language changes.
        - Example: Updates the language setting in the React app and propagates changes to open test windows.
    - testWindowHandler.ts:
        - Manages IPC logic specific to test windows.
        - Example: Allows the main window to trigger the creation of test windows through IPC events.
        - Sends information, like the current language or settings, from the main window to the test windows.

## windows/ Folder
- Purpose: Contains logic for creating and managing application windows.
- Files:
     - mainWindow.ts:
        - Creates and manages the main application window.
        - Loads the appropriate content (development server or production files) and handles window-specific events like loading and closing.
        - Ensures all test windows are closed when the main window is closed.
    - testWindow.ts:
        - Creates and manages test windows.
        - Allows the main window to open multiple test windows for specific functionality.
        - Handles events like sending initial language settings to the test window and cleaning up when a test window is closed.

## How the Files Work Together
 - electron.ts initializes the app:
   - Calls createMainWindow from windows/mainWindow.ts to open the main app window.
   - Sets up IPC handlers using functions from the ipc/ folder to facilitate communication between the frontend and Electron.
   - preload.ts exposes the IPC methods to the React app:
   - Allows the React app to trigger actions like opening a test window or sending coordinates.

- windows/ Folder:
    - Manages the creation and lifecycle of the main and test windows.

- ipc/ Folder:
    - Manages backend logic for IPC communication, ensuring the React app can send and receive data securely and efficiently.

## How to Extend This Setup
- Add More Windows:
    - Create a new file in the windows/ folder (e.g., settingsWindow.ts).
    - Implement the logic for creating and managing the window.
    - Import and call the new window function from electron.ts.

- Add More IPC Handlers:
    - Create a new file in the ipc/ folder for the specific feature (e.g., settingsHandlers.ts).
    - Define the IPC logic and register the handler in electron.ts.
