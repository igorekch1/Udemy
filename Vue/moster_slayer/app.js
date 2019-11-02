new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    myHealth: 100,
    monsterHealth: 100,
    logs: []
  },
  methods: {
    startGame: function () {
      this.myHealth = 100;
      this.monsterHealth = 100;
      this.gameStarted = true;

      this.logs.splice(0, this.logs.length);
      this.logs.push({
        type: "startGame",
        name: "Game started!!!"
      });
    },
    attack: function () {
      const damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.logs.unshift({
        type: "yourAttack",
        name: `You hit monster for ${damage}`
      });

      if (this.checkWin()) return;

      this.monsterAttacks();
    },
    specialAttack: function () {
      const damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.logs.unshift({
        type: "yourAttack",
        name: `You hit monster for ${damage}`
      });

      if (this.checkWin()) return;

      this.monsterAttacks();
    },
    monsterAttacks: function () {
      const damage = this.calculateDamage(5, 12);
      this.myHealth -= damage;
      this.logs.unshift({
        type: "monsterAttack",
        name: `Monster hits player for ${damage}`
      });
      this.checkWin();
    },
    heal: function () {
      if (this.myHealth >= 90) {
        this.myHealth += 10;
      } else {
        this.myHealth = 100;
      }
      this.monsterAttacks();
      this.logs.unshift({
        type: "heal",
        name: "Heal +10"
      });
    },
    giveUp: function () {
      this.gameStarted = false;
      this.logs.unshift({
        type: "gameOver",
        name: "You gave up! Looser..."
      });
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game ?")) {
          this.startGame();
        } else {
          this.gameStarted = false;
        }
        return true;
      } else if (this.myHealth <= 0) {
        if (confirm("You lost! New Game ?")) {
          this.startGame();
        } else {
          this.gameStarted = false;
        }
        return false;
      }
    }
  }
});