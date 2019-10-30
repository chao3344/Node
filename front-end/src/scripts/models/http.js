import store from 'store'

export default{
    get({url, type='GET',data={}}){
        // let token = store.get('token')
    
        return $.ajax({
            url,
            type,
            data,
            dataType: 'json',
            // headers : {
            //     'X-Access-Token' : token
            // },
            success: (result,textStatus,jqXHR) =>{
                // let token = jqXHR.getResponseHeader('x-access-token')
                // if( token ){
                //     store.set('token',token)
                // }
                return result
            }
        })
    },

    update({
        url,
        data={},
        type='post'
    }) {
        return $.ajax({
            url,
            data,
            type,
            success(result){
                return result
            }
        })
    }
}
