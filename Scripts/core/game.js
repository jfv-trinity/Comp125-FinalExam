"use strict";

let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let leftdie;
    let rightdie;
    let totalLabel;
    let exampleButton;
    let die_value = 0;
    let die_sum = "";

    let assetManifest = [
        { id: "1", src: "./Assets/images/1_die.png" },
        { id: "2", src: "./Assets/images/2_die.png" },
        { id: "3", src: "./Assets/images/3_die.png" },
        { id: "4", src: "./Assets/images/4_die.png" },
        { id: "5", src: "./Assets/images/5_die.png" },
        { id: "6", src: "./Assets/images/6_die.png" },
        { id: "backButton", src: "./Assets/images/startButton.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "button", src: "./Assets/images/button.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "rollButton", src: "./Assets/images/rollButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "startOverButton", src: "./Assets/images/startOverButton.png" }
    ];
    function Preload() {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config
        Main();
    }

    function Update() {
        totalLabel.setText(die_value);
        stage.update();
    }
    
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }

    function Dice() {
        var die = [" ", " "];
        var die_result = [0, 0];
        die_value = 0;
        for (var roll = 0; roll < 2; roll++) {
            die_result[roll] = Math.floor(Math.random() * 7);  
            switch (die_result[roll]) {
                case checkRange(die_result[roll], 0, 1): 
                    die[roll] = "1";
                    die_value+= 1;
                    break;

                case checkRange(die_result[roll], 1, 2): 
                    die[roll] = "2";
                    die_value+= 2;
                    break;

                case checkRange(die_result[roll], 2, 3): 
                    die[roll] = "3";
                    die_value+= 3;
                    break;

                case checkRange(die_result[roll], 3, 4):
                    die[roll] = "4";
                    die_value+= 4;
                    break;

                case checkRange(die_result[roll], 4, 5):
                    die[roll] = "5";
                    die_value+= 5;
                    break;

                case checkRange(die_result[roll], 5, 6):
                    die[roll] = "6";
                    die_value+= 6;
                    break;
            }
        }
       
        return die;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
   
    function buildInterface() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        totalLabel = new UIObjects.Label("Roll!", "40px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y + 120, true);
        stage.addChild(totalLabel);
        exampleButton = new UIObjects.Button("button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 180, true);
        stage.addChild(exampleButton);
        leftdie = new Core.GameObject("1", Config.Game.CENTER_X - 130, Config.Game.CENTER_Y - 12, true);
        stage.addChild(leftdie);
        rightdie = new Core.GameObject("1", Config.Game.CENTER_X + 130, Config.Game.CENTER_Y - 12, true);
        stage.addChild(rightdie);


       
    }

    function interfaceLogic() {
        
        exampleButton.on("click", () => {
           
            let dice = Dice();

            leftdie.image = assets.getResult(dice[0])
            rightdie.image = assets.getResult(dice[1])
            // die_sum = die_value.toString();
           
        });
    }

    
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    
function Main(){
    buildInterface();
    interfaceLogic();
}

    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map