// Export number generator
const randomNumGen = (min, max) => {
  return (monsterAttackValue = Math.floor(Math.random() * (max - min)) + min);
};

// The Vue app
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      battleLogMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }

      return { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }

      return { width: this.playerHealth + "%" };
    },

    specialAttackActive() {
      return this.currentRound % 3 !== 0;
    },

    fullHealth() {
      return this.playerHealth === 100;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost
        this.winner = "monster";
      }
    },

    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;

      const playerAttackValue = randomNumGen(5, 12);
      this.monsterHealth -= playerAttackValue;
      this.addLogMessage("player", "attack", playerAttackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      const monsterAttackValue = randomNumGen(8, 15);
      this.playerHealth -= monsterAttackValue;
      this.addLogMessage("monster", "attack", monsterAttackValue);
    },

    specialAttackMonster() {
      this.currentRound++;

      const playerAttackValue = randomNumGen(10, 25);
      this.monsterHealth -= playerAttackValue;
      this.addLogMessage("player", "attack", playerAttackValue);
      this.attackPlayer();
    },

    healPLayer() {
      if (this.playerHealth === 100) {
        return;
      }
      this.currentRound++;

      const playerHealValue = randomNumGen(8, 20);

      if (this.playerHealth + playerHealValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += playerHealValue;
      }
      this.addLogMessage("player", "heal", playerHealValue);
      this.attackPlayer();
    },

    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.battleLogMessages = [];
    },

    surrenderGame() {
      this.playerHealth = 0;
      this.winner = "monster";
      this.battleLogMessages = [];
    },

    addLogMessage(who, what, value) {
      this.battleLogMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
