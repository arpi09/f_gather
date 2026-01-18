# How to Start the Application

## The Issue
PowerShell execution policy is blocking `npm` scripts. We have multiple solutions:

## Solution 1: VS Code Settings (Automatic)
I've created `.vscode/settings.json` that automatically sets up the npm alias when you open a terminal.

**Just restart VS Code** and open a new terminal - `npm` should work!

## Solution 2: VS Code Tasks (Easiest)
Press `Ctrl+Shift+P` and type "Tasks: Run Task", then select:
- **"Start Backend"** - Starts the backend server
- **"Start Frontend"** - Starts the frontend server

This uses `npm.cmd` directly, so it always works.

## Solution 3: Manual in Terminal
In any PowerShell terminal, run this once per session:
```powershell
Set-Alias npm npm.cmd -Force
```

Then use `npm` normally:
```powershell
cd backend
npm run dev
```

## Solution 4: Use npm.cmd Directly
Just replace `npm` with `npm.cmd`:
```powershell
cd backend
npm.cmd run dev
```

## Recommended: Restart VS Code
The `.vscode/settings.json` file should make `npm` work automatically in all new terminals after you restart VS Code.
