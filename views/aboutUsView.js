module.exports = () => {
    "use strict";
    const themeColor = "#84BD3A";
    let aboutUsView = new tabris.Page({
        title: `A propos de nous`,
        background: `#fafafa`,
        elevation: 2
    });

    let scrollView = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(aboutUsView);

    let imageView = new tabris.ImageView({
        layoutData: {
            centerX: 0,
            width: 200,
            height: 100,
            top: 20,
        },
        image: {
            src: "img/logo.png"
        },
        scaleMode: "fit"
    }).appendTo(scrollView);

    let markupText = `UPA - Université Populaire Africaine est une Association de droit Camerounais qui voit le jour en 23 Mai 2016. Son siège est situé dans le premier immeuble à Droite,  à 100 mètres après Pont Emana ( zone d'OKOLO Nord) 
        Dans ses objectifs,
        elle se veut de promouvoir le numérique au service de l 'éducation et de la formation au Cameroun et en Afrique par extension.  Elle vise également à contribuer à son sens, à la vulgarisation de l’économie numérique ou du "village numérique dans un Cameroun en plein essor d'
        émergence.
        UPA dans cette optique dispense des formations dans plusieurs compartiments de la vie sociale et professionnelle: dans des domaines tels que d 'une part : -
        la bureautique;
        l 'infographie; -
        le développement web; -
        le développement des applications; -
        le web design; -
        la programmation dans les langages les plus actuels;
        et d 'autre part, dans les domaines de l'
        Architecture avec des formations à l 'utilisation et la Maîtrise de la pluralité des logiciels de conception Mécanique Industrielle 3D ( Dessins 3D) sur les logiciels de pointe: -
        Autocad, -Solidworks et bien d 'autres
        UPA est également en partenariat avec plusieurs Entreprises et Sociétés professionnelles privées camerounaises permettant aux jeunes qu 'ils forment de mieux s'
        appliquer en se frottant aux réalités du terrain.

        Adresse
        <strong>BP: 12256 Yaoundé
        Email: contact @education.cm
        site: www.education.cm</strong>

        Situation: <strong>Le premier immeuble à droite,
            à 100 mètres après Pont Emana(zone d 'OKOLO Nord)</strong>

                Direction Générale <strong>Tel: 690718116 / 674933118</strong>

                Service de Renseignement <strong>Tel: 696029686 / 670110905</strong>`

    let aboutUsText = new tabris.TextView({
        markupEnabled: true,
        left: 15,
        top: ["prev()", 50],
        right: 15,
        text: markupText,
        font: "18px roboto, noto",
        textColor: "#616161",
    }).appendTo(scrollView);

    return aboutUsView;
}
