const Request = require('request');
const jxon = require('jxon');
const util = require('util');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 5000});

server.route({
  method: 'GET',
  path: '/players',
  handler: function (request, reply) {


    return Request.get('https://www.fantasybasketballnerd.com/service/players', (error, response, body) => {
      const players = jxon.stringToJs(body);
      return reply(players.FantasyBasketballNerd.Player);
      // console.log(util.inspect(players.FantasyBasketballNerd.Player, {depth: null}));
    });
  }
});

server.route({
  method: 'GET',
  path: '/teams',
  handler: function (request, reply) {
    return Request.get('https://www.fantasybasketballnerd.com/service/teams', (error, response, body) => {
      const teams = jxon.stringToJs(body);
      return reply(teams.FantasyBasketballNerd.Team);
    });
  }
});

server.route({
  method: 'GET',
  path: '/teams/{code}',
  handler: function (request, reply) {
    const {code} = request.params;

    return Request.get(`https://www.fantasybasketballnerd.com/service/teams/${code}`, (error, response, body) => {
      const teams = jxon.stringToJs(body);
      return reply(teams);
    });
  }
});
server.route({
  method: 'GET',
  path: '/rankings',
  handler: function (request, reply) {
    return Request.get(`https://www.fantasybasketballnerd.com/service/draft-rankings`, (error, response, body) => {
      const draftrankings = jxon.stringToJs(body);
      return reply(draftrankings.FantasyBasketballNerd.Player);
    });
  }
});

server.route({
  method: 'GET',
  path: '/depth/{code}',
  handler: function (request, reply) {
    const {code} = request.params;
    console.log(code);
    return Request.get(`https://www.fantasybasketballnerd.com/service/depth/${code}`, (error, response, body) => {
      const depth = jxon.stringToJs(body);
      return reply(depth.FantasyBasketballNerd.Team);
    });
  }
});
server.register([
  require('blipp')
], err => {


  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
});


// Rankings


// request.get('https://www.fantasybasketballnerd.com/service/draft-rankings', (error, response, body) => {
// console.log(body);

//const players = jxon.stringToJs(body);
//console.log(util.inspect(players.FantasyBasketballNerd.Player, {depth: null}));
//});

// /api/rankings =>

// request.get('https://www.fantasybasketballnerd.com/service/draft-projections', (error, response, body) => {
// console.log(body);

// const players = jxon.stringToJs(body);
// console.log(util.inspect(players.FantasyBasketballNerd.Player, {depth: null}));
// });

// /api/projections =>

// /api/depth charts =>
//  request.get('https://www.fantasybasketballnerd.com/service/depth/', (error, response, body) => {
//  console.log(body);

// const players = jxon.stringToJs(body);
//console.log(util.inspect(players.FantasyBasketballNerd.Team, {depth: null}));
//  });

// /api/teams =>
// request.get('https://www.fantasybasketballnerd.com/service/teams/', (error, response, body) => {
// console.log(body);

// const players = jxon.stringToJs(body);
// console.log(util.inspect(players.FantasyBasketballNerd.Team, {depth: null}));
// });
