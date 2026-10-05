@echo off
cd /d "%~dp0"
if not exist node_modules\next\dist\bin\next (
  echo Please install dependencies first. See README.md.
  pause
  exit /b 1
)
echo Open http://localhost:3000 in your browser.
echo Keep this window open while previewing. Press Ctrl+C to stop.
node node_modules\next\dist\bin\next dev
pause
