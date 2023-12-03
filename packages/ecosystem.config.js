module.exports = {
  apps : [{
    name: 'auth',
    script: 'npm',
    args: 'start',
    cwd: './auth'
  },{
    name: 'dashboard',
    script: 'npm',
    args: 'start',
    cwd: './dashboard'
  },{
    name: 'marketing',
    script: 'npm',
    args: 'start',
    cwd: './marketing'
  },{
    name: 'container',
    script: 'npm',
    args: 'start',
    cwd: './container'
  }]
};