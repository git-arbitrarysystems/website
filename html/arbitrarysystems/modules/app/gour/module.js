Module.export({requires:[
]},function(){

    'use strict'

    function Gour(options){

        console.log('Gour', options)
        


       
        var node = document.createElement('a');
        node.style.width = '100%';
        node.style.height = '100%';
        node.style.display = 'block'
        node.style.backgroundImage = `url(/modules/app/gour/preview.png)`

        node.target = '_blank'
        node.href = '/modules/app/gour/index.html'

       

        var target = options.target || document.getElementsByTagName('body')[0];
        target.appendChild( node );

        // const gour = new Main(target)
        // gour.start.call(gour)
        // window.gour = gour
        




    }



    return Gour;

});