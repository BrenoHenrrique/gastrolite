package restaurante

class UrlMappings {

    static mappings = {
        get "/api/$controller(.$format)?"(action:"index")
        post "/api/$controller(.$format)?"(action:"save")
        put "/api/$controller/$id(.$format)?"(action:"update")
        patch "/api/$controller/$id(.$format)?"(action:"patch")
        delete "/api/$controller/$id(.$format)?"(action:"delete")

        get "/api/$controller/$action?"()
        post "/api/$controller/$action?/"()
        put "/api/$controller/$action?/$id?"()
        patch "/api/$controller/$action?/$id?"()
        delete "/api/$controller/$action?/$id?"()

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
