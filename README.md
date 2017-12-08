# short-git
NPM module that provides git command via short codes and formatted output

`
npm install short-git -g
`

### Commands
| Commands | Work                                                                                | Info                                                         |
|----------|-------------------------------------------------------------------------------------|--------------------------------------------------------------|
| gacp YOUR_MESSAGE | git add -A . && git commit -m "YOUR_MESSAGE" && git push origin YOUR_CURRENT_BRANCH | If no commit message provided then it will use 'Auto Commit'. You can type your message in quote or without the quotes too |


### Usage Example
`gacp` - will add, commit and push your code with message "Auto Commit"\
`gacp 'ch: moved push function to lib folder'` - will add, commit and push your code with message "ch: moved push function to lib folder"\
`gacp ch: moved push function to lib folder` - will add, commit and push your code with message "ch: moved push function to lib folder"
