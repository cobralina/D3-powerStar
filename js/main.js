var global =
    {
        id: null,
        source: null,
        origin: null
    };


var App = {
    Context: {
        Configuration: {
            Scale: 1,
            Colors: [
                '#FA7D19','#FFFFFF','#E8E8E8','#D4D5D5','#96999C','#5C6166','#34393F','#25292E', '#279965'
            ] ,
            SvgHeight: 580,
            SvgWidth: 450,
            RangeScale: 10,
        },
        Constants: {

        },
        Cache: {

        },
        Templates: {
            documentation: null
        },
        Elements: {

        }
    },
    Data: {
    },
    Service: {
    }
};



//----- Internet Explorer Abfrage -------------------------------------------------------------------------//

function getInternetExplorerVersion()
{
    var rV = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer' || navigator.appName == 'Netscape') {
        var uA = navigator.userAgent;
        var rE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

        if (rE.exec(uA) != null) {
            rV = parseFloat(RegExp.$1);
        }
        /*check for IE 11*/
        else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            rV = 11;
        }
    }
    return rV;
}

//--- JSON laden ------------------------------------------------------------------------------------------- //

function loadJSON(file,callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}



//--- Arrow-Buttons ------------------------------------------------------------------------------------------ //

function svgButtons (_arrYear, _arrBk, _arrSk, _arrKe, _arrEg, _arrMo, _arrSo, _arrWik, _arrWak, _arrBm, _arrPv, _eePercent) {


    var event = 'click';


    var btnForward = document.getElementById('btn-forward');
    var btnBack = document.getElementById('btn-back');
    var assetLength = _arrYear.length;

    var i = 0;
    var pages = 1;

    if ('ontouchstart' in window) {
        event = 'touchstart';

        generatePages(pages,8);

        btnForward.addEventListener(event, function() {


                if (pages < 8)
                {pages = pages +1;}

                if (i > 24){
                    i = i+1;
                }
                else {
                    i = i+5;
                }


                if (i > (assetLength-1) ) {
                    i = 0;
                }

                else
                {

                    generatePages(pages,8);
                    renderStar(_arrYear[i], _arrBk[i], _arrSk[i], _arrKe[i], _arrEg[i], _arrMo[i], _arrSo[i], _arrWik[i], _arrWak[i], _arrBm[i], _arrPv[i], _eePercent[i]);
                    TweenMax.staggerTo(".starRay", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1);
                    TweenMax.staggerTo(".starText", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1); }

            },
            false);


        btnBack.addEventListener(event, function() {


                if (pages > 1) {
                    pages = pages -1;
                }

                if (i > 25){
                    i = i-1;
                }
                else {
                    i = i-5;
                }


                if (i < 0 ) {
                    i = 0;
                }
                else {

                    renderStar(_arrYear[i], _arrBk[i], _arrSk[i], _arrKe[i], _arrEg[i], _arrMo[i], _arrSo[i], _arrWik[i], _arrWak[i], _arrBm[i], _arrPv[i], _eePercent[i]);
                    TweenMax.staggerTo(".starRay", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1);
                    TweenMax.staggerTo(".starText", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1);
                    generatePages(pages,8);

                }
            },
            false);
    }

    else {
        generatePages(pages,28);

        btnForward.addEventListener(event, function() {

                var slider = document.getElementById("myRange");
                slider.value = pages;



                if (pages < 28)
                {pages = pages +1;}



                i = i+1;



                if (i > (assetLength-1) ) {
                    i = 0;
                }

                else
                {

                    generatePages(pages,28);
                    renderStar(_arrYear[i], _arrBk[i], _arrSk[i], _arrKe[i], _arrEg[i], _arrMo[i], _arrSo[i], _arrWik[i], _arrWak[i], _arrBm[i], _arrPv[i], _eePercent[i]);
                    TweenMax.staggerTo(".starRay", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1);
                    TweenMax.staggerTo(".starText", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1); }

            },
            false);


        btnBack.addEventListener(event, function() {


                if (pages > 1) {
                    pages = pages -1;
                }

                var slider = document.getElementById("myRange");
                slider.value = pages-1;


                    i = i-1;

                if (i < 0 ) {
                    i = 0;
                }
                else {

                    renderStar(_arrYear[i], _arrBk[i], _arrSk[i], _arrKe[i], _arrEg[i], _arrMo[i], _arrSo[i], _arrWik[i], _arrWak[i], _arrBm[i], _arrPv[i], _eePercent[i]);
                    TweenMax.staggerTo(".starRay", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1);
                    TweenMax.staggerTo(".starText", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1);
                    generatePages(pages,28);

                }
            },
            false);

    }




}


//--- Slider-Navi--------------------------------------------------------------------------------------------- // 

function svgSlider(_arrYear, _arrBk, _arrSk, _arrKe, _arrEg, _arrMo, _arrSo, _arrWik, _arrWak, _arrBm, _arrPv, _eePercent){

    var i = 0;

    var slider = document.getElementById("myRange");

    slider.oninput = function() {
        
        i= slider.value;
        renderStar(_arrYear[i], _arrBk[i], _arrSk[i], _arrKe[i], _arrEg[i], _arrMo[i], _arrSo[i], _arrWik[i], _arrWak[i], _arrBm[i], _arrPv[i], _eePercent[i]);
        TweenMax.staggerTo(".starRay", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1);
        TweenMax.staggerTo(".starText", 0.01, {opacity:1, ease:Back.easeOut, delay:0.4}, 0.1);

    }
}

//--- SVG generieren mit d3-----------------------------------------------------------------------------------   //

//--- Einzelner Sternenstrahl --------------------------------------------------------------------------------   //

function renderRay(_year, _id, _text, _value, _starX, _starY, _color, _rotation) {

    var rotateX = _starX -28;
    var rotateY = _starY+10;

    var value = _value;

    if (_value == "k.A."){
        value = 0;
    }

    var group = d3.select('#powerstar'+_year).append('g')
        .attr('id', _id);

  

    var rayID = group.append('rect')
        .attr('id', _id+'Ray')
        .attr('class', 'starRay')
        .attr('fill',App.Context.Configuration.Colors[_color])
        .attr('x', _starX)
        .attr('y', _starY)
        .attr('width', value)
        .attr('height', 20)
        .attr ('transform', 'rotate('+_rotation+','+rotateX+','+rotateY+')')
        .attr('opacity', 0);



    var valX = parseInt(value) + _starX + 10;

    if (_value != "k.A."){
        var valText = _value.replace('.', ',');
    }
    else {
        var valText = _value;
    }


    if (_value > 100) {

        var rayTxt = group.append('text')
            .attr('class', 'starText')
            .attr('opacity', 0)
            .attr('id', _id+'Txt')
            .attr('x', _starX+20)
            .attr('y', _starY+15)
            .text(_text)
            .attr ('transform', 'rotate('+_rotation+','+rotateX+','+rotateY+')')
            .attr ('fill', '#ffffff');

        var rayVal = group.append('text')
            .attr('class', 'starText')
            .attr('opacity', 0)
            .attr('id', _id+'Val')
            .attr('x', valX)
            .attr('y', _starY+15)
            .text(valText)
            .attr ('transform', 'rotate('+_rotation+','+rotateX+','+rotateY+')')
            .attr('fill',App.Context.Configuration.Colors[_color]);
    }

    else {

        var isIE = getInternetExplorerVersion();



        if (isIE == -1) {


            if (_id == 'mineraloel'){

                var txtVal = parseInt(_value.replace('.',','));


                var rayTxt = group.append('text')
                    .attr('class', 'starText')
                    .attr('opacity', 0)
                    .attr('id', _id+'Txt')
                    .attr('x', _starX-txtVal-65)
                    .attr('y', _starY+15)
                    .attr('text-anchor', 'end')
                    .html(valText+' '+_text)
                    .attr ('fill', App.Context.Configuration.Colors[_color]);

            }

            else {

                var rayTxt = group.append('text')
                    .attr('class', 'starText')
                    .attr('opacity', 0)
                    .attr('id', _id+'Txt')
                    .attr('x', valX)
                    .attr('y', _starY+15)
                    .html(_text +'  '+valText)
                    .attr ('transform', 'rotate('+_rotation+','+rotateX+','+rotateY+')')
                    .attr ('fill', App.Context.Configuration.Colors[_color]);
            }
        }

         else {
            var rayTxt = group.append('text')
                .attr('class', 'starText')
                .attr('opacity', 0)
                .attr('id', _id+'Txt')
                .attr('x', valX)
                .attr('y', _starY+15)
                .text(_text +'  '+valText)
                .attr ('transform', 'rotate('+_rotation+','+rotateX+','+rotateY+')')
                .attr ('fill', App.Context.Configuration.Colors[_color]);
        }
    }
    

}

//--- Stern für ein Jahr zusammensetzen------------------------------------------------------------------------   //

function renderStar( _year, _bkValue, _skValue, _keValue, _egValue, _moValue, _soValue, _wikValue, _wakValue, _bmValue, _pvValue, _eePercent ){

    var svgHeight = App.Context.Configuration.SvgHeight;
    var svgWidth = App.Context.Configuration.SvgWidth;

    var starX =  App.Context.Configuration.SvgWidth / 2 + 15;
    var starY = (App.Context.Configuration.SvgHeight / 2) - 30;

    if (screen.width > 800) {
        svgWidth = 1000;
        svgHeight = 580;
        starX = 500;
        starY = 220;
    }

    var svgCont = d3.select('#d3-content');
    svgCont.html('');

    var svg = d3.select('#d3-content').append('svg')
        .attr('viewBox', "0 0 "+svgWidth+" "+svgHeight)
        .attr('id', 'powerstar'+_year);
    
        svg.html('');

   

    var yearGroup = svg.append('g')
        .attr('id', _year);


    renderRay(_year, 'braunkohle', 'Braunkohle', _bkValue, starX, starY, 5, 36);
    renderRay(_year, 'steinkohle', 'Steinkohle', _skValue, starX, starY, 5, 72);
    renderRay(_year, 'kernenergie', 'Kernenergie', _keValue, starX, starY, 5, 108);
    renderRay(_year, 'erdgas', 'Erdgas', _egValue, starX, starY, 5, 144);
    renderRay(_year, 'mineraloel', 'Mineralöl', _moValue, starX, starY, 5, 180);
    renderRay(_year, 'sonstige', 'Sonstige', _soValue, starX, starY, 5, 216);
    renderRay(_year, 'windkraft', 'Windkraft', _wikValue, starX, starY, 8, 252);
    renderRay(_year, 'wasserkraft', 'Wasserkraft', _wakValue, starX, starY, 8, 288);
    renderRay(_year, 'biomasse', 'Biomasse', _bmValue, starX, starY, 8, 324);
    renderRay(_year, 'photovoltaik', 'Photovoltaik', _pvValue, starX, starY, 8, 360);


    var jahreszahl = yearGroup.append('text')
        .attr('id', 'yearTxt')
        .attr('x', starX)
        .attr('y', starY + 300)
        .attr('font-size', '2em')
        .attr('text-anchor', 'middle')
        .attr('fill',App.Context.Configuration.Colors[6])
        .text(_year) ;

    var percentGroup = svg.append('g')
        .attr('id', _year+'ee-percent');

    if (screen.width > 800) {

      

        var eePercent = percentGroup.append('text')
            .attr('id', 'percentTxt')
            .attr('class', 'percents')
            .attr('x', starX + 122)
            .attr('y', starY - 150)
            .attr('font-size', '2em')
            .attr('text-align', 'center')
            .attr('fill', App.Context.Configuration.Colors[8])
            .text(_eePercent + ' %');

        var line1 = percentGroup.append('line')
            .attr('id', 'line1')
            .attr('class', 'percents')
            .attr('stroke', App.Context.Configuration.Colors[8])
            .attr('fill', 'none')
            .attr('x1', starX + 120)
            .attr('y1', starY - 140)
            .attr('x2', starX + 270)
            .attr('y2', starY - 140)
            .attr('stroke-width', 1);

        var line2 = percentGroup.append('line')
            .attr('id', 'line2')
            .attr('class', 'percents')
            .attr('stroke', App.Context.Configuration.Colors[8])
            .attr('fill', 'none')
            .attr('x1', starX + 120)
            .attr('y1', starY - 140)
            .attr('x2', starX + 30)
            .attr('y2', starY - 60)
            .attr('stroke-width', 1);

        var eeText = percentGroup.append('text')
            .attr('id', 'percentTxt2')
            .attr('class', 'percents')
            .attr('x', starX + 122)
            .attr('y', starY - 120)
            .attr('font-size', '1em')
            .attr('text-align', 'left')
            .attr('fill', App.Context.Configuration.Colors[8])
            .text('Erneuerbare Energien');

    }  else {
        var eePercent = percentGroup.append('text')
            .attr('id', 'percentTxt')
            .attr('class', 'percents')
            .attr('x', starX + 82)
            .attr('y', starY - 180)
            .attr('font-size', '2em')
            .attr('text-align', 'center')
            .attr('fill', App.Context.Configuration.Colors[8])
            .text(_eePercent + ' %');

        var line1 = percentGroup.append('line')
            .attr('id', 'line1')
            .attr('stroke', App.Context.Configuration.Colors[8])
            .attr('fill', 'none')
            .attr('class', 'percents')
            .attr('x1', starX + 80)
            .attr('y1', starY - 170)
            .attr('x2', starX + 180)
            .attr('y2', starY - 170)
            .attr('stroke-width', 1);

        var line2 = percentGroup.append('line')
            .attr('id', 'line2')
            .attr('class', 'percents')
            .attr('stroke', App.Context.Configuration.Colors[8])
            .attr('fill', 'none')
            .attr('x1', starX + 80)
            .attr('y1', starY - 170)
            .attr('x2', starX + 40)
            .attr('y2', starY - 90)
            .attr('stroke-width', 1);

        var eeText = percentGroup.append('text')
            .attr('id', 'percentTxt2')
            .attr('class', 'percents')
            .attr('x', starX + 82)
            .attr('y', starY - 150)
            .attr('font-size', '1em')
            .attr('text-align', 'left')
            .attr('fill', App.Context.Configuration.Colors[8])
            .text('Erneuerbare');

        var eeText2 = percentGroup.append('text')
            .attr('id', 'percentTxt3')
            .attr('class', 'percents')
            .attr('x', starX + 82)
            .attr('y', starY - 133)
            .attr('font-size', '1em')
            .attr('text-align', 'left')
            .attr('fill', App.Context.Configuration.Colors[8])
            .text('Energien');
    }


    TweenMax.to(".percents", 2, {opacity:1, ease:Back.easeOut, delay:1.5}, 2);

}

// Daten laden und rendern--------------------------------------------------------------------------------------- //
function generateAssets() {




    loadJSON('json/assets.json', function (text) {

        var allItems = JSON.parse(text);
        var arrYear = [];
        var arrBk = [];
        var arrKe = [];
        var arrSk = [];
        var arrEg = [];
        var arrMo = [];
        var arrSo = [];
        var arrWik = [];
        var arrWak = [];
        var arrBm = [];
        var arrPv = [];
        var arrAll = [];
        var arrEe = [];


        var arrLength = allItems.assetList.length;

        for (var i = 0; i < allItems.assetList.length; i++) {

            var singleAsset = allItems.assetList[i];
            var AssetYear = singleAsset.Jahr;
            var AssetBk = singleAsset.Braunkohle.replace(',', '.');
            var AssetKe = singleAsset.Kernenergie.replace(',', '.');
            var AssetSk = singleAsset.Steinkohle.replace(',', '.');
            var AssetEg = singleAsset.Erdgas.replace(',', '.');
            var AssetMo = singleAsset.Mineraloelprodukte.replace(',', '.');
            var AssetSo = singleAsset.Uebrige.replace(',', '.');
            var AssetWik = singleAsset.Windkraft.replace(',', '.');
            var AssetWak = singleAsset.Wasserkraft.replace(',', '.');
            var AssetBm = singleAsset.Biomasse.replace(',', '.');
            var AssetPv = singleAsset.Photovoltaik.replace(',', '.');
            var AssetAll = singleAsset.Gesamterzeugung.replace(',', '.');
            var AssetEe = singleAsset.ErneuerbareEnergien.replace(',','.');
            var AssetEePercent = ((100/ AssetAll) * AssetEe).toFixed(2);
            var AssetEe = AssetEePercent.replace('.', ',');

            arrYear.push(AssetYear);
            arrBk.push(AssetBk);
            arrKe.push(AssetKe);
            arrSk.push(AssetSk);
            arrEg.push(AssetEg);
            arrMo.push(AssetMo);
            arrSo.push(AssetSo);
            arrWik.push(AssetWik);
            arrWak.push(AssetWak);
            arrBm.push(AssetBm);
            arrPv.push(AssetPv);
            arrAll.push(AssetAll);
            arrEe.push(AssetEe);



        }


        renderStar(arrYear[0], arrBk[0], arrSk[0], arrKe[0], arrEg[0], arrMo[0], arrSo[0], arrWik[0], arrWak[0], arrBm[0], arrPv[0], arrEe[0]);
        svgButtons(arrYear, arrBk, arrKe, arrSk, arrEg, arrMo, arrSo, arrWik, arrWak, arrBm, arrPv, arrEe);
        svgSlider(arrYear, arrBk, arrKe, arrSk, arrEg, arrMo, arrSo, arrWik, arrWak, arrBm, arrPv, arrEe);
        TweenMax.staggerTo(".starRay", 0.01, {opacity:1, ease:Back.easeOut}, 0.1);
        TweenMax.staggerTo(".starText", 0.01, {opacity:1, ease:Back.easeOut}, 0.1);

    });


}

//--- Textlayer befüllen ------------------------------------------------------------------------------------ //

function generatePages( _slideNum, _allSlides ) {


    $('#slide-num').empty();
    $('#slide-num').append('(' + _slideNum + '/' + _allSlides + ')');



}

function generateStartLayer() {


    renderStar(arrYear[0], arrBk[0], arrSk[0], arrKe[0], arrEg[0], arrMo[0], arrSo[0], arrWik[0], arrWak[0], arrBm[0], arrPv[0]);

    var layerTopPos = (document.getElementById("d3-content").offsetHeight / 2);


    TweenMax.to(".ctn-asset", 0.1, {top:0, opacity:0, ease:Back.easeOut}, 0.1);

    $('#img-asset').empty();
    $('#litre-asset').empty();
    $('#txt-asset').empty();
    $('#slide-num').empty();

    $('#txt-asset').append('Die Entwicklung des Stroms von 1991 bis 2016 <br> <br> Erneuerbare Energien sind auf dem Vormarsch! ');
    $('#litre-asset').append('<span style="font-size:0.5em; line-height:1.4em">Der Strommix in Deutschland</span>');



    TweenMax.to(".ctn-asset", 1, {top:layerTopPos, height: 200, opacity:1, delay:1, ease:Back.easeOut}, 0.1);
                                                                                                                                                                                                                                                     

}


//--- Document Ready ----------------------------------------------------------------------------------------   //

$(document).ready( function()  {

    generateAssets();

} );
    
  




    



