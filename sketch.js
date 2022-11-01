//PASSO 1 CRIAR AS VARIÁVEIS
var trex_correndo, trex;
var solo, soloImagem, soloInvisivel;
var nuvem, nuvemImagem;
var cacto, c1, c2, c3, c4, c5, c6;


var JOGAR = 1;
var FIM = 0;
var estadoJogo = JOGAR;

var grupoCacto;

var gameOver, gameOverImagem;
var restart, restartImagem;
var grupoNuvem;

var pontos = 0;
var trex_colidido;
//é aqui que cria a variável para os sons
var somPulo;

//CARREGAR ARQUIVOS DE MÍDIA
function preload() {
    soloImagem = loadImage("solo.png");
    nuvemImagem = loadImage("nuvem.png");
    gameOverImagem = loadImage("gameOver.png");


    c1 = loadImage("obstaculo1.png");
    c2 = loadImage("obstaculo2.png");
    c3 = loadImage("obstaculo3.png");
    c4 = loadImage("obstaculo4.png");
    c5 = loadImage("obstaculo5.png");
    c6 = loadImage("obstaculo6.png");



    trex_correndo = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    trex_colidido = loadAnimation("trex_colidido.png");

    //é aqui que carrega os sons
    somPulo = loadSound("pulo.mp3");


}

function setup() {
    createCanvas(600, 200);
    //trex
    trex = createSprite(50, 180, 50, 50);
    trex.addAnimation("correndo", trex_correndo);
    trex.addAnimation("colidido", trex_colidido);
    trex.scale = 0.5;
    trex.setCollider("circle",0,0,50);
    trex.debug = true;


    //solo
    solo = createSprite(300, 190, 600, 20);
    solo.addImage(soloImagem);
    solo.velocityX = -3;

    soloInvisivel = createSprite(300, 199, 600, 2);
    soloInvisivel.visible = false;

    //é aqui que cria as sprites de gameOver e restart
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImagem);
    gameOver.visible = false;

    //os grupos são criados aqui
    grupoCacto = new Group();
    grupoNuvem = new Group();
}

function draw() {
    background("white"); 
  
    textSize(20);
    text("Pontos: ",20,20);
    text(pontos, 100,20)

    if(estadoJogo == JOGAR){
        
        pontos = Math.round(frameCount/30);
        //é aqui que define a velocidade do solo 

        solo.velocityX = -3;
        if (solo.x < 0){
            solo.x = solo.width / 1.99;
        }
        
        gerarNuvens();
        gerarCacto();
        
        if (keyDown("space") && trex.y > 140) {
            trex.velocityY = -10;
            somPulo.play();
        }
        
        if(trex.isTouching(grupoCacto)){
           estadoJogo = FIM;
        }
   
     }

    if(estadoJogo == FIM){
        solo.velocityX = 0;
        grupoCacto.setVelocityXEach(0);     
        grupoNuvem.setVelocityXEach(0);
        gameOver.visible = true;
        trex.changeAnimation("colidido");
        grupoCacto.setLifetimeEach(-1);
        grupoNuvem.setLifetimeEach(-1);
    }

    trex.velocityY += 0.8;
    trex.collide(soloInvisivel);
    drawSprites();

}

function gerarNuvens() {

    if (frameCount % 60 == 0) {
        var y = Math.round(random(1, 100));
        var nuvem = createSprite(600, y, 50, 20);
        nuvem.addImage(nuvemImagem);
        nuvem.scale = 0.5;
        nuvem.velocityX = -3;
        trex.depth = nuvem.depth + 1;
        nuvem.lifetime = 225;
        grupoNuvem.add(nuvem);

    }

}


function gerarCacto() {

    if (frameCount % 100 == 0) {
        var cacto = createSprite(600, 175, 20, 40);
        var a = Math.round(random(1, 6));
        switch (a) {
            case 1:
                cacto.addImage(c1);
                break;
            case 2:
                cacto.addImage(c2);
                break;
            case 3:
                cacto.addImage(c3);
                break;
            case 4:
                cacto.addImage(c4);
                break;
            case 5:
                cacto.addImage(c5);
                break;
            case 6:
                cacto.addImage(c6);
                break;
        }
        //é aqui que define a velocidade dos cactos
        cacto.velocityX = -3;
        cacto.scale = 0.5;
        cacto.lifetime = 200;
        grupoCacto.add(cacto);
    }

}