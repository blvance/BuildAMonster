class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = { sprite: {} };
        this.bodyX = 300;
        this.bodyY = 350;
        this.mouthType = 'smile';
        this.moveSpeed = 2;
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>';
    }

    create() {
        let my = this.my;

        // BODY
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_whiteF.png");

        // ARMS
        my.sprite.rightarm = this.add.sprite(this.bodyX + 100, this.bodyY + 25, "monsterParts", "arm_darkA.png");
        my.sprite.leftarm = this.add.sprite(this.bodyX - 100, this.bodyY + 25, "monsterParts", "arm_darkA.png").setFlipX(true);
        my.sprite.upperrightarm = this.add.sprite(this.bodyX + 100, this.bodyY + 75, "monsterParts", "arm_darkA.png");
        my.sprite.upperleftarm = this.add.sprite(this.bodyX - 100, this.bodyY + 75, "monsterParts", "arm_darkA.png").setFlipX(true);

        // LEGS
        my.sprite.rightleg = this.add.sprite(this.bodyX + 40, this.bodyY + 150, "monsterParts", "leg_whiteD.png");
        my.sprite.leftleg = this.add.sprite(this.bodyX - 40, this.bodyY + 150, "monsterParts", "leg_whiteD.png").setFlipX(true);

        // HEAD
        my.sprite.head = this.add.sprite(this.bodyX, this.bodyY - 150, "monsterParts", "body_darkC.png");

        // EYE
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 165, "monsterParts", "eye_psycho_dark.png");

        // MOUTHS
        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY - 105, "monsterParts", "mouthA.png");
        my.sprite.fangmouth = this.add.sprite(this.bodyX, this.bodyY - 105, "monsterParts", "mouth_closed_fangs.png");

        // Set initial mouth visibility
        my.sprite.smile.visible = true;
        my.sprite.fangmouth.visible = false;

        // HAIR
        my.sprite.dread = this.add.sprite(this.bodyX, this.bodyY - 290, "monsterParts", "leg_redB.png").setScale(0.7);
        my.sprite.rightdread = this.add.sprite(this.bodyX + 25, this.bodyY - 250, "monsterParts", "detail_red_antenna_small.png").setScale(0.8);
        my.sprite.leftdread = this.add.sprite(this.bodyX - 25, this.bodyY - 250, "monsterParts", "detail_red_antenna_small.png").setScale(0.8).setFlipX(true);

        // Input setup
        this.keys = this.input.keyboard.addKeys({
            S: Phaser.Input.Keyboard.KeyCodes.S,
            F: Phaser.Input.Keyboard.KeyCodes.F,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        let my = this.my;

        // Handle mouth change
        if (Phaser.Input.Keyboard.JustDown(this.keys.S)) {
            this.mouthType = "smile";
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.F)) {
            this.mouthType = "fangs";
        }

        // Toggle mouth visibility
        if (this.mouthType === "smile") {
            my.sprite.smile.visible = true;
            my.sprite.fangmouth.visible = false;
        } else if (this.mouthType === "fangs") {
            my.sprite.smile.visible = false;
            my.sprite.fangmouth.visible = true;
        }

        // Handle movement
        let dx = 0;
        if (this.keys.A.isDown) {
            dx = -this.moveSpeed;
        } else if (this.keys.D.isDown) {
            dx = this.moveSpeed;
        }

        // Move all body parts by dx
        for (let key in my.sprite) {
            my.sprite[key].x += dx;
        }
    }
}
