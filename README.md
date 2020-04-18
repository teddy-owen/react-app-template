# React App Template

## Init a new repo with this project
```
git clone --depth=1 --branch=master https://github.com/teddy-owen/react-app-template.git web-app
rm -rf ./web-app/.git
cd web-app
git init
git remote add origin [NEW REMOTE REPO]
git add .
git commit -m "Initial commit"
git push -u origin master
```
## Project Development Dependencies
- [Node >= 8.10](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- All other dependencies managed via Yarn

This project is made with React using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app). Dependencies are managed with [Yarn](https://classic.yarnpkg.com/en/). To do an intial install, do `yarn install` in the root directory. To add a package do `yarn add [PACKAGE_NAME]`.

## Starting the dev server
`./scripts/start_dev_server.sh`

## Create a production build 
`./scripts/create_production_build.sh`

## Updates to be made
- `/public/favicon.ico` should be updated to a 16x16 png with the same file name
- `/public/logo192.png` should be updated to a 192x192 png with the same file name
- `/public/logo512.png` should be updated to a 512x512 png with the same file name 
- The `<title></title>` in `/public/index.html` should be updated
