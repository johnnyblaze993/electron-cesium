# Run app on electron
  ## Build Electron:
  - npm run build (creates dist)
  - npm run build-electron (creates dist-electron)
  - npm run electron:build (packages the all using dist & dist-electron)
  ## Run Electron in Development: 
  - npm run build (creates dist)
  - npm run build-electron (creates dist-electron)
  - npm run electron-dev (this is the demo environment)

# Run app without electron
- npm run dev (electron API does not work in this environment)

# Port
- uses port 5555 because there were so many react apps I was working on