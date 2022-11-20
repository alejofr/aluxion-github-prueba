const tokenGithub = ""; //token de acceso personal de GitHub

//configuracion de headers de la peticion request
const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + tokenGithub,
};

const github = async(topic) =>{
    try {
        const data = await postRequest(queryResq(topic))

        return {
            ok: true,
            data: data.data.search.nodes
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message
        }
    }
}

const postRequest = async(query) =>{
    //ejecutamos la consulta
    const fetchResult = await fetch("https://api.github.com/graphql", {
        headers,
        method: 'POST',
        body: JSON.stringify({"query": query}),
    });

    const result = await fetchResult.json();

    if (fetchResult.ok) {
        // si ok es true, se retorna la data
        return result;
    }
    
    //manejo de error
    const responseError = {
        type: 'Error',
        message: result.message || 'ocurrio un error en la comunicacion, por favor intenta mas tarde',
        data: result.data || '',
        code: result.code || '',
    };
  
    let error = new Error();
    error = { ...error, ...responseError };
    throw (error);

}

//formato query graphql
const queryResq = (topic = 'javascript') => {return "query{viewer{login},search(first: 100, type: REPOSITORY, query: \"topic:"+topic+"\"){repositoryCount,__typename,nodes{__typename,... on Repository{forkCount,stargazerCount,nameWithOwner,homepageUrl,url,languages(first:10){nodes{name, color}}}}}}";}

export { github };
