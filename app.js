new Vue({
    el: "#app",
    data: {
        player_health: 100,
        monster_health: 100,
        game_is_on: false,
        attack_multiple: 10,
        health_up_multiple: 20,
        special_attack_multiple: 25,
        monster_attack_multiple: 15,
        logs: [],
        log_text: {
            attack: "OYUNCU ATAĞI:",
            special_attack: "OYUNCU ÖZEL ATAĞI:",
            health_up: "İLK YARDIM:",
            monster_attack: "CANAVAR ATAĞI:",
            give_up: "OYUNCU PES ETTİ."
        },
    },
    methods: {
        start_game: function () {
            this.game_is_on = true;
        },
        attack: function () {
            var point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_health -= point;
            this.add_to_log({turn: 'p', text: this.log_text.attack + point})
            this.monster_attack();
        },
        special_attack: function () {
            var point = Math.ceil(Math.random() * this.special_attack_multiple);
            this.monster_health -= point;
            this.add_to_log({turn: 'p', text: this.log_text.special_attack + point})
            this.monster_attack();
        },
        health_up: function () {
            var point = Math.ceil(Math.random() * this.health_up_multiple);
            this.player_health += point;
            this.add_to_log({turn: 'p', text: this.log_text.health_up + point})
            this.monster_attack();
        },
        give_up: function () {
            this.add_to_log({turn: 'p', text: this.log_text.give_up + this.player_health})
            this.player_health = 0;
        },
        monster_attack: function () {
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);
            this.add_to_log({turn: 'm', text: this.log_text.monster_attack + point})
            this.player_health -= point;
        },
        add_to_log: function (log) {
            this.logs.push(log);
        }
    },
    watch: {
        player_health: function (value) {
            if (value <= 0) {
                this.player_health = 0;
                if (confirm("Oyunu kaybettin. Tekrar denemek ister misin?")) {
                    this.player_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.player_health = 100;
            }
        },
        monster_health: function (value) {
            if (value <= 0) {
                this.player_health = 0;
                if (confirm("Oyunu kazandın. Tekrar kazanmak ister misin?")) {
                    this.player_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            }
        }
    },
    computed: {
        user_progress: function () {
            return {
                width: this.player_health + '%'
            };
        },
        monster_progress: function () {
            return {
                width: this.monster_health + '%'
            };
        }
    }
})