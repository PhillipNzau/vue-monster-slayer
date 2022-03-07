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
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },

    specialAttackActive() {
      console.log(this.currentRound);
      return this.currentRound % 3 !== 0;
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
  },
});

app.mount("#game");
