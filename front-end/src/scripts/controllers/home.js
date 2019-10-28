import homeView from '../view/home.art'

export const home = (req,res,next)=>{
    res.render(homeView())
}