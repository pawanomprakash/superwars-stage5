const PLAYERS = [
  'Spiderman',
  'Captain America',
  'Wonderwoman',
  'Popcorn',
  'Gemwoman',
  'Bolt',
  'Antwoman',
  'Mask',
  'Tiger',
  'Captain',
  'Catwoman',
  'Fish',
  'Hulk',
  'Ninja',
  'Black Cat',
  'Volverine',
  'Thor',
  'Slayer',
  'Vader',
  'Slingo',
];

// Player Class
class Player {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.image = 'images/super-' + (id + 1) + '.png';
    this.strength = this.getRandomStrength();
    this.type = type;
    this.selected = false;
    this.wins = 0;
  }

  // Get random strength
  getRandomStrength = () => {
    return Math.ceil(Math.random() * 100);
  };

  // Create a player for displaying
  view = () => {
    let player = document.createElement('div');
    player.classList.add('player');
    player.setAttribute('data-id', this.id);
    if (this.selected == true) player.classList.add('selected');
    let image = document.createElement('img');
    image.setAttribute('src', this.image);
    let name = document.createElement('div');
    name.textContent = this.name;
    let strength = document.createElement('div');
    strength.textContent = this.strength;
    strength.className = 'strength';
    player.append(image, name, strength);
    return player;
  };
}

// Superwar Class
class Superwar {
  constructor(players) {
    this.players = players.map((player, i) => {
      let type = i % 2 == 0 ? 'hero' : 'villain';
      return new Player(i, player, type);
    });
    this.score=[0,0];
    // this.strength=[0,0];
    this.strength={hero:0,villain:0}
    Array.from(document.getElementsByClassName('team')).forEach((elem) =>
      elem.addEventListener('click', (e) => {
        this.handleSelection(e.target);
      })
    );
  }

  // Display players in HTML
  viewPlayers = () => {
    let team = document.getElementById('heroes');
    team.innerHTML = '';
    let fragment = this.buildPlayers('hero');
    team.append(fragment);

    team = document.getElementById('villains');
    team.innerHTML = '';
    fragment = this.buildPlayers('villain');
    team.append(fragment);
  };

  // Build players fragment
  buildPlayers = (type) => {
    let fragment = document.createDocumentFragment();
    this.filterPlayers(type).forEach((player) =>
      fragment.append(player.view())
    );
    return fragment;
  };

  // Filter Players based on type
  filterPlayers = (type) => {
    return this.players.filter((player) => player.type == type);
  };

  // Handle player clicks
  handleSelection = (target) => {
    if (!target.classList.contains('player')) target = target.parentNode;
    if (!target.hasAttribute('data-id')) return;

    let selectedId = target.getAttribute('data-id');
    let selectedPlayer = this.players[selectedId];
    this.players
      .filter((player) => player.type == selectedPlayer.type)
      .forEach((player) => (player.selected = false));
    selectedPlayer.selected = true;

    if (this.isFight(selectedPlayer.strength) === 'clash') this.fight();
    else this.viewPlayers();
  };

  // Progression 1: Check for fight
  isFight = (strength) => {
    // Type your code here
    // return  'clash' or 'peace';
    if(strength>0)
    return "clash"
    else
    return "peace"
  };

  // Fight
  fight = () => {
    // Filtered the selectedx players and calculate score
    // Should return HTML element with score
    // Type your code here
    if (this.checkWin() !== 'endure')
      setTimeout(() => this.announceWinner(score), 100);
    document.getElementById('score').innerHTML = '1 - 0';

  };

  // Progression 2: Calculate score
  calculateScore = () => {
    // Calculate and return the total score of teams
    // Type your code here
    let changeWinner=this.updateWin();
    let score=this.score;
    this.players.reduce((acc,player)=>{
      if(player.type=='hero') {
        player.win=changeWinner[0];
        score[0] += player.wins;
      }else{
        player.win=changeWinner[1];
        score[1] += player.wins;
      }
      return acc;
    },0);

    return score;
  };

  // Progression 3: Check whether there is a win
  checkWin = () => {
    // Find the winner if exists return type hero or villain
    // If winner dosen't exists then return endure
    // Type your code here
    let winner = "endure";
    let health = {
      hero: this.totalStrength("hero"),
      villain: this.totalStrength("villain"),
    };

    winner = health.hero>health.villain? "hero":
        health.hero == health.villain? "endure":"villain";

    return winner;
  };
  updateWin = () => {
    let winpoints = {hero:0, 
               villain:0, 
               draw: 0};
    let winner = this.checkWin();
    if(winner=="hero"){
      winpoints.hero+=1;
    }else if(winner=="villain"){
      winpoints.villain+=1;
    }else{
      winpoints.draw+=1;
    }
    return winpoints;
  };

  // Progression 4: Find total strength of a team
  totalStrength = (type) => {
    // Calculate and return the total strength of the team
    // Type your code here
    let strength = this.strength;
    this.players.map((player) =>{
      if(player.type==="hero") {
        strength.hero+=player.strength;
      } else{
        strength.villain+=player.strength;
      }
    });

    return strength[type];

    // return strength;
  };



  // Announce the winner
  announceWinner = (score) => {
    if (score['hero'] == score['villain']) alert('Its a draw!');
    else if (score['hero'] > score['villain']) alert('Heroes Win!');
    else alert('Villains Win!');
    location.reload();
  };
}

window.onload = () => {
  const superwar = new Superwar(PLAYERS);
  superwar.viewPlayers();
};
