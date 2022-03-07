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
      console.log(this.currentRound);
      return this.currentRound % 3 !== 0;
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
      this.attackPlayer();
    },

    attackPlayer() {
      const monsterAttackValue = randomNumGen(8, 15);
      this.playerHealth -= monsterAttackValue;
    },

    specialAttackMonster() {
      this.currentRound++;

      const playerAttackValue = randomNumGen(10, 25);
      this.monsterHealth -= playerAttackValue;
      this.attackPlayer();
    },

    healPLayer() {
      this.currentRound++;

      const playerHealValue = randomNumGen(8, 20);
      if (this.playerHealth + playerHealValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += playerHealValue;
      }
      this.attackPlayer();
    },

    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },

    surrenderGame() {
      this.playerHealth = 0;
      this.winner = "monster";
    },
  },
});

app.mount("#game");
