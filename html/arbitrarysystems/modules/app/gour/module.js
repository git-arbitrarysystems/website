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
            <a style="color:#ccc;font-size:0.8em;" target="_blank" href="https://en.wikipedia.org/wiki/Royal_Game_of_Ur">rules on wikipedia</a>
            <div style="margin-top:2em; font-size:0.8em; color:#ccc;">click to play</div>
        `
       

        var target = options.target || document.getElementsByTagName('body')[0];
        target.appendChild( node );

        // const gour = new Main(target)
        // gour.start.call(gour)
        // window.gour = gour
        




    }



    return Gour;

});