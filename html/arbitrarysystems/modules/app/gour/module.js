Module.export({requires:[
]},function(){

    'use strict'

    function Gour(options){

        console.log('Gour', options)
        


       
        var node = document.createElement('a');
        node.style.width = '100%';
        node.style.height = '100%';
        node.style.display = 'block';
        node.style.color = 'white';
        node.style.padding = '1em';
        node.style.backgroundImage = `url(/modules/app/gour/preview.png)`
        node.style.backgroundPosition = 'center'

        //node.target = '_blank'
        node.href = '/modules/app/gour/index.html'
        node.innerHTML = `
            The royal game of Ur<br/>
            <div style="margin-bottom:2em; font-size:0.8em; color:#ccc;">
            A game for two players, click to play.
           
            <br/><br/>
            <a style="color:inherit;" target="_blank" href="https://en.wikipedia.org/wiki/Royal_Game_of_Ur">rules on wikipedia</a>
            </div>
            
        `
       

        var target = options.target || document.getElementsByTagName('body')[0];
        target.appendChild( node );

        // const gour = new Main(target)
        // gour.start.call(gour)
        // window.gour = gour
        




    }



    return Gour;

});