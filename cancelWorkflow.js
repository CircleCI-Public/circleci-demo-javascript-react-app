const request = require('request');

const buildArgs = process.argv.slice(2);
console.log(buildArgs)

const options = {
  method: 'POST',
  url: 'https://circleci.com/api/v2/project/gh/jkzilla/circleci-demo-javascript-react-app/' + buildArgs[0] + '/cancel',
  headers: {'Circle-Token': process.env.buildArgs[1]}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
