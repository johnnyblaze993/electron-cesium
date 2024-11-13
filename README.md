# Run app on electron
  ## Build Electron prod:
  - npm run build (creates dist and build)
  - npm run electron:build (packages the all using dist & build)
  ## Run Electron in Development: 
  - npm run build (creates dist)
  - npm run start (opens electron app and another version in the browser)

# Run app without electron
- npm run dev (electron API does not work in this environment)

# Port
- uses port 5555 because there were so many react apps I was working on