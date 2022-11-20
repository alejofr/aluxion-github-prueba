const filterData = (data = [], umbral = 1000) => {
    let languages = [];
    let nodes = [];

    data.map((item) => {
        const { stargazerCount, homepageUrl, url, languages } = item;

        if( stargazerCount >= umbral  && nodes.length < 10 ){
            nodes.push({stargazerCount, homepageUrl, url, languages: languages.nodes});
        }
    })

    //si el tamaño de nodes es menor a 10, entonces guardamos los datos que sean menor a el umbral, y os ordenamos de manera descensiente 
    if( nodes.length < 10 ){
        let down = data.filter((item) => item.stargazerCount < umbral);
        down = bubble(down);

        let length_nodes = 10 - nodes.length;
        for (let i = 0; i < down.length; i++) {
            //cuando i sea menor a el restante del tamaño de nodes, guardamos
            if( i < length_nodes ){
                const { stargazerCount, homepageUrl, url, languages } = down[i];
                nodes.push({stargazerCount, homepageUrl, url, languages: languages.nodes});
            }
        }
    }

    //ordenamos el los datos de manera descendiente
    nodes = bubble(nodes);

    //lenguajes
    nodes.map((node) => {
        for (let i = 0; i <node.languages.length; i++) {
            languages.push(node.languages[i]);
        }
    });

    languages = data_lenguajes(languages);

    return { languages, nodes }
}


//metodo burbuja para ordenar numero mayor a menor
const bubble = (data = []) => data.sort((a, b) => {return b.stargazerCount - a.stargazerCount});


//metodo para lenguajes y calculo de cuanta veces se repite el lengauje y el porcentaje en uso aplicado en los 10 mejores repositorio
const data_lenguajes = (languages = []) => {
    let new_languages = [];

    languages.map((item, index) => {
        const {name, color} = item;
        if(index === 0){
            new_languages.push({name, color, count: 1});
        }else{
            if( checkLanguage(new_languages, name) ){
                for (let i = 0; i < new_languages.length; i++) {
                    if( new_languages[i].name === name ){
                        new_languages[i].count = new_languages[i].count + 1;
                        break;
                    }
                }
            }else{
                new_languages.push({name, color, count: 1});
            }
        }
    });

    //ordenamos lo mayores utilizafos
    new_languages = new_languages.sort((a, b) => {return b.count - a.count});

    let data_languages = [];

    //y seleccionamos los mejores 10 stack
    for (let i = 0; i < new_languages.length; i++) {
        if( i < 10 ){
            data_languages.push(new_languages[i]);
        }

        if( i === 9){
            break;
        }
    }

    return data_languages;
}

//comprobar si existe el nombre de lenguaje en el arreglo de languages
const checkLanguage = (data = [], name) => {
    for (let i = 0; i < data.length; i++) {
        if( data[i].name === name ) return true;
    }

    return false;
}



export { filterData };